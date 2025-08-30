import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI,{
        dbName: process.env.DB_NAME
    });
    console.log("Connected to MongoDB!");
  } catch(e){
    console.error(e)
    throw e;
  }
}
