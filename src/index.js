//require('dotenv').config({path:'./env'}) //used to make environment variable available for all files
import connectDB from "./db/index.js";
import dotenv from "dotenv"

dotenv.config({
    path: './env'
})
/*
import express from "express";

const app = express();

 (async () => {
    try{
        await  mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("errr",error);
        })
        app.listen(process.env.PORT,()=>{
            console.log(`server is listening on ${PORT}`);
        })
    }
    catch(error){
        console.log("Error",error)
        throw err
    }
 })() //it is a efee which is basically execuitng the function immediately after its definiton

 this  is one of the approach to connect to DB.
 */

 connectDB()
 .then(()=>{
    app.on("error",(err)=>{
        console.log("error",err);
    })
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running at port: ${process.env.PORT}`);
    })
 })
 .catch((err)=>{
    console.log("MONGODB connection failed !!",err);
 })