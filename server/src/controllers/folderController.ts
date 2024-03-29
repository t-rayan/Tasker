import { Response } from "express";
import Folder, { IFolder } from "../models/folder";

import { MyRequestObject } from "middlewares";
import Task from "../models/task";
import { modifyTask } from "./taskController";
import mongoose from "mongoose";

export const getAllFolders = async (req: MyRequestObject, res: Response) => {
  try {
    const userId = req.user;

    const folders = await Folder.find({ userId }).populate("tasks");
    return res.status(200).json(folders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createFolder = async (req: MyRequestObject, res: Response) => {
  try {
    const userId = req.user;
    const { name, color } = req.body;
    console.log(color);
    if (!name) {
      res.status(400).json({ message: "Name is required" });
    }
    const folderExist = await Folder.findOne({
      name: name,
      userId: userId,
    });
    if (folderExist) {
      return res
        .status(400)
        .json({ message: "Folder already exists with this name" });
    }
    const newFolder = await Folder.create({
      name,
      userId,
      color,
    });
    return res.status(201).json({ newFolder });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteFolder = async (req: MyRequestObject, res: Response) => {
  try {
    const { id } = req.params;
    const deletedFolder = await Folder.findByIdAndDelete({ _id: id });

    if (!deletedFolder) {
      return res.status(404).json({ message: "Task not found" });
    }
    const tasks = await Task.find({ folder: id });
    if (tasks.length > 0) {
      const taskIds = tasks.map((task) => task._id);
      await Task.deleteMany({ _id: { $in: taskIds }, folder: id });
      return;
    }
    return res.status(200).json(deletedFolder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSingleFolder = async (req: MyRequestObject, res: Response) => {
  try {
    const { id } = req.params;
    const currentFolder = await Folder.findById({ _id: id }).populate("tasks");

    if (!currentFolder) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(currentFolder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const updateFolder = async (req: MyRequestObject, res: Response) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;

    const updatedFolder: IFolder | null = await Folder.findByIdAndUpdate(
      id,
      { name: name, color: color },
      { new: true }
    );
    if (!updatedFolder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    return res.status(200).json(updatedFolder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const markFolderAsComplete = async (
  req: MyRequestObject,
  res: Response
) => {
  const { id } = req.params;

  try {
    const folderExist = await Folder.findById(id).populate("tasks");
    if (folderExist) {
      const tasks = folderExist.tasks;

      if (tasks.length > 0) {
        const taskIds = tasks.map((task) => task._id.toString());

        for (let taskId of taskIds) {
          await modifyTask(taskId);
        }
        folderExist.isComplete = true;
        const completed = await folderExist.save();
        return res.status(200).json(completed);
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const searchFolderOrTask = async (
  req: MyRequestObject,
  res: Response
) => {
  try {
    const searchText = req.query.q;
    const userId = req?.user;

    if (searchText) {
      const folders = await Folder.find({
        userId: userId,
        $or: [
          { name: { $regex: searchText, $options: "i" } },
          // { description: { $regex: searchText, $options: "i" } },
        ],
      }).populate("tasks");

      const tasks = await Task.find({
        userId: userId,
        $or: [
          { title: { $regex: searchText, $options: "i" } },
          // { description: { $regex: searchText, $options: "i" } },
        ],
      }).populate("folder");

      const results = {
        folders,
        tasks,
      };

      return res.status(200).json(results);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const changeFolderCompletedStatus = async (folderId: string) => {
  const id = new mongoose.Types.ObjectId(folderId);
  if (id) {
    try {
      const folderExist = await Folder.findById(id).populate("tasks");
      if (folderExist && folderExist?.tasks.length > 0) {
        const taskStatus = folderExist?.tasks.map(
          (task: any) => task?.isCompleted
        );
        let checker = taskStatus.every((v) => v === true);

        folderExist.isComplete = checker ? true : false;
        const saved = await folderExist.save();
        return saved;
      }
    } catch (error) {
      console.log(error);
    }
  }
  return;
};
