import mongoose , {Schema} from "mongoose"; 
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema = new Schema(
    {
    username : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true //increasee the speed of searching but it is quite expensive
    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    fullname : {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar :{
        type: String, //cloudinary url its just like AWS
        required: true,
    },
    coverimage:{
        type: String, //cloudinary url
    },
    watchHistory :[
        {
           type : Schema.Types.ObjectId,
           ref:"Video" 
        }
    ],
    password:{
        type:String, //it is string due to encryption
        required: [true,"Password is required"]
    },
    refreshToken :{
        type:String
    }
},
{
    timestamps : true //gives two values: crated at, updated at

});
userSchema.pre("save",async function(next){ //just before saving data(there are other functonalities as well)
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
}) //we used async function becuase this process may take time and we also have to use next variable everytime we use a middleware

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
};
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
};
export const User = mongoose.model("User",userSchema);
