import express from 'express';
import jwt from 'jsonwebtoken';
import { authentication, random } from '../helpers/index';
import { UserModel } from '../models/user';

export const register = async(req:express.Request, res:express.Response):Promise<any> => {

  try {
    const {name,email,password} = req.body;

    if(!name || !email || !password) {
      return res.status(400).json({message:'All fields are required.'})
    }
    const userExist = await UserModel.find({email});
    console.log(userExist);
    if(userExist.length !== 0) {
      return res.status(400).json({message: "Email already registered"})
    }

    const salt = random();
    const newUser = await UserModel.create({
      name,
      email,
      authentication: {
        salt,
        password: authentication(salt,password)
      }
    });
    const token = jwt.sign({userId:newUser._id}, process.env.JWT_SECRET, {expiresIn: process.env.EXPIRES_IN})
    return res.status(201).json({
      newUser,
      token
    }).end();
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg:"Internal server error"})
  }
}

export const login = async(req:express.Request, res:express.Response):Promise<any> => {
  try {
    const {email,password} = req.body;

    if(!email || !password) {
      return res.status(400).json({message:"All fields are required"})
    }

    const user = await UserModel.findOne({email}).select('+authentication.salt +authentication.password');
   if(!user) {
    return res.status(404).json({message: "User doesnot exists"})
   }

   const expectedHash = authentication(user.authentication.salt, password);

   if(user.authentication.password !== expectedHash) {
    return res.status(403).json({message:"Incorrect details"});
   }

   const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn: process.env.EXPIRES_IN})

   return res.status(200).json(token).end()

  } catch (error) {
    console.log(error.response.data)
    return res.status(500).json({message:error.response.data})
  }
}