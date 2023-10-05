import { Response } from "express";
import Task from "../models/task";

import { MyRequestObject } from "middlewares";
import mongoose from "mongoose";
import Folder from "../models/folder";
import { changeFolderCompletedStatus } from "./folderController";

export const getAllTasks = async (req: MyRequestObject, res: Response) => {
  try {
    const userId = req.user;
    const tasks = await Task.find({ userId }).populate("folder");
    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getTodaysTasks = async (req: MyRequestObject, res: Response) => {
  try {
    const userId = req.user;

    const currentDate = new Date();
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + 1
    );

    const tasks = await Task.find({
      userId,
      dueDate: { $gte: startOfDay, $lt: endOfDay },
    }).populate("folder");

    return res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};
export const createTask = async (req: MyRequestObject, res: Response) => {
  try {
    const userId = req.user;
    const { title, folder, isCompleted, dueDate } = req.body;
    if (!title) {
      res.status(400).json({ message: "Name is required" });
    }

    const folderId = new mongoose.Types.ObjectId(folder);

    // const folderExist = await Folder.findOne({name});
    // if(folderExist) {
    //   return res.status(400).json({message:"Folder already exists with this name"});
    // }
    const newTask = await Task.create({
      title,
      userId,
      folder,
      isCompleted,
      priority: "High",
      dueDate,
    });
    const recentTask = await Task.findById({ _id: newTask._id }).populate(
      "folder"
    );
    const currentFolder = await Folder.findById({ _id: folderId }).populate(
      "tasks"
    );
    if (!currentFolder) {
      return res.status(404).json({ message: "Folder not found." });
    }
    currentFolder.tasks.push(newTask._id);
    await currentFolder.save();
    return res.status(201).json({ recentTask, currentFolder });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateTask = async (req: MyRequestObject, res: Response) => {
  try {
    const userId = req.user;
    const { id } = req.params;
    const { isCompleted } = req.body;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.isCompleted = isCompleted;
    if (task.isCompleted) {
      task.completedOn = new Date(Date.now());
    } else {
      task.completedOn = "";
    }
    const updatedTask = await task.save();

    if (updatedTask) {
      const modifiedFolder = await changeFolderCompletedStatus(
        updatedTask?.folder.toString()
      );
      return res.status(201).json({ updatedTask, modifiedFolder });
    }
    // if task update successfully
    // then get the folder id and find one folder with that id
    // if there is a folder check if tasks array is empty
    // if there are tasks get all tasks completed status
    // if all tasks are completed then set folder as completed
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req: MyRequestObject, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete({ _id: id });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(deletedTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const modifyTask = async (taskId: string) => {
  try {
    const id = new mongoose.Types.ObjectId(taskId);
    const task = await Task.findById(id);

    if (!task) {
      return;
    }
    task.isCompleted = true;
    await task.save();
    return "task completed";
  } catch (error) {
    console.log(error?.message);
  }
};
