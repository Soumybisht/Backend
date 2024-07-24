import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,    //basically allowing data from only those sources which are allowed by cors(controls data flow)
    credentials: true
}));

app.use(express.json({limit:"16Kb"})) //allows data in json form from middlewares
app.use(express.urlencoded({extended: true,limit:"16Kb"}));//allow data from URL(url data is in encoded form) 
app.use(express.static("public")) //for storing public data like images favicon which can be accessed by all

app.use(cookieParser())

export default app;