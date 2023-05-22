import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name : {
    type: String,
    required: true
  },
  email:{
    type:String,
    required:true
  },
  authentication: {
    password:{type:String, required:true,select:false},
    salt:{type:String, select:false},
    sessionToken:{type:String,select:false},
  }
})

export const UserModel = mongoose.model('User', userSchema)