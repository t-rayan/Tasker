import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const {DB_URL} = process.env

const dbConnect = async() => {
  try {
    await mongoose.connect(DB_URL)
  } catch (error) {
    console.log(error)
  }
}

export default dbConnect