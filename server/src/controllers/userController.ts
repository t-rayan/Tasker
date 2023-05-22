import {Request,Response} from 'express'
import { MyRequestObject } from 'middlewares'
import { UserModel } from '../models/user'

export const getProfile = async(req:MyRequestObject, res:Response) => {
  try {
    const user = await UserModel.findById(req.user);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).send(error.message);
  }

}