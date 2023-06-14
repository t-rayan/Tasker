import {Response} from 'express';
import Folder from '../models/folder';

import { MyRequestObject } from "middlewares"
import Task from '../models/task';


export const getAllFolders = async(req:MyRequestObject, res:Response) => {
  try {
    const userId = req.user;

    const folders = await Folder.find({userId}).populate('tasks');
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
    return res.status(201).json({newFolder})
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}


export const deleteFolder = async(req:MyRequestObject, res:Response) => {
  try {
    const {id} = req.params;
    const deletedFolder = await Folder.findByIdAndDelete({_id:id});
    
    if(!deletedFolder) {
      return res.status(404).json({message:'Task not found'})
    }
    return res.status(200).json(deletedFolder);
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}

export const getSingleFolder = async(req:MyRequestObject, res:Response) => {
  try {
    const {id} = req.params;
    const currentFolder = await Folder.findById({_id:id}).populate('tasks');
    
    if(!currentFolder) {
      return res.status(404).json({message:'Task not found'})
    }
    return res.status(200).json(currentFolder);
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}


export const searchFolderOrTask = async(req:MyRequestObject, res:Response) => {
  try {
    const searchText = req.query.q;

    if(searchText) {
      const folders = await Folder.find({
        $or: [
          { name: { $regex: searchText, $options: "i" } },
          // { description: { $regex: searchText, $options: "i" } },
        ],
      }).populate('tasks');

      const tasks = await Task.find({
        $or: [
          { title: { $regex: searchText, $options: "i" } },
          // { description: { $regex: searchText, $options: "i" } },
        ],
      }).populate('folder');

      const results = {
        folders,
        tasks
      }

      return res.status(200).json(results)
    }
    
   
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
}
