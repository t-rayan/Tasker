import { isAuthenticated } from "../middlewares/index";
import {
  createFolder,
  getAllFolders,
  deleteFolder,
  getSingleFolder,
  searchFolderOrTask,
  updateFolder,
  markFolderAsComplete,
} from "../controllers/folderController";
import express from "express";

export default (router: express.Router) => {
  router.get("/folders", isAuthenticated, getAllFolders);
  router.get("/folders/search", isAuthenticated, searchFolderOrTask);

  router.get("/folders/:id", isAuthenticated, getSingleFolder);

  router.post("/folders", isAuthenticated, createFolder);
  router.put("/folders/:id", isAuthenticated, updateFolder);
  router.put("/folders/complete/:id", isAuthenticated, markFolderAsComplete);

  router.delete("/folders/:id", isAuthenticated, deleteFolder);
};
