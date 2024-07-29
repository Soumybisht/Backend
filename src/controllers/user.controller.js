import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async (req,res)=>{
    
    //logic or steps to follow for this controller is written in notes

    const {fullName,email,username,password}=req.body
    console.log("email: ",email);

    if([fullName,email,username,password].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"All fields are required");
    }

   const existedUser =  User.findOne({
        $or: [{username} , {email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with email or username already exits");
    }

   const avatarLocalPath = req.files?.avatar[0]?.path;     //multer gives access to req.files and express access to req.body
   const coverImageLocalPath = req.files?.coverImage[0]?.path;

   if(!avatarLocalPath){
    throw new ApiError(400,"Avatar File required");
   }

    const  avatar =  await uploadOnCloudinary(avatarLocalPath)  //will take time and its imp to upload here so we use await to wait until file is uploaded
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar File required");
    }


   const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

   const createdUser =  await User.findById(user._id).select(  //find user by id
    "-password -refreshToken"   //used to remove these two fields from entry
   )

   if(!createdUser){
    throw new ApiError("Something went wrong while registering the user")
   }
   return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered successfully")
   )

} )



export {registerUser}