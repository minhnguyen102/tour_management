import { v2 as cloudinary } from "cloudinary"
import streamifier from "streamifier"
import dotenv from "dotenv"
import { Request, Response, NextFunction } from "express";
import { buffer } from "stream/consumers";
import Stream from "stream";
dotenv.config();

// Kết nối tới cloud
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET 
});


const streamUpload = (buffer : any) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
        (error, result) => {
            if (result) {
            resolve(result);
            } else {
            reject(error);
            }
        }
        );

    streamifier.createReadStream(buffer).pipe(stream);
    });
};
  
const uploadToCloudinary = async (buffer: any) => {
    const result = await streamUpload(buffer);
    // console.log("Cloudinary result:", result); 
    return result["url"]
} 

export const uploadSingle = async (req: Request, res : Response, next : NextFunction) => {
    try {
        const result = await uploadToCloudinary(req["file"].buffer);
        req.body[req["file"].fieldname] = result
    } catch (error) {
        console.log(error)
    }
    next();
}

export const uploadFields = async (req: Request, res : Response, next : NextFunction) => { 
  // console.log('FILES in uploadFields:', req["files"]);
  for (const key in req["files"]) {
    req.body[key] = [];

    const array = req["files"][key];
    for (const item of array) {
      try {
        const result = await uploadToCloudinary(item.buffer);
        req.body[key].push(result);
      } catch (error) {
        console.log(error)
      }
    }
  }
  next();
}
