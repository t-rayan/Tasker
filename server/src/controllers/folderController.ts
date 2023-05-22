import {Response} from 'express';
import Folder from '../models/folder';

import { MyRequestObject } from "middlewares"


export const getAllFolders = async(req:MyRequestObject, res:Response) => {
  try {
    const folders = await Folder.find();
    return res.status(200).json(folders)
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

export const createFolder = async(req:MyRequestObject, res:Response) => {
  try {
    const userId = req.user;
    const {name} = req.body;
    if(!name) {
      res.status(400).json({message:'Name is required'});
    }
    const folderExist = await Folder.findOne({name});
    if(folderExist) {
      return res.status(400).json({message:"Folder already exists with this name"});
    }
    const newFolder = await Folder.create({
      name,
      userId
    })
    return res.status(200).json({newFolder})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}