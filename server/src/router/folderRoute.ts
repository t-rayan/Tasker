import { isAuthenticated } from '../middlewares/index';
import { createFolder, getAllFolders,deleteFolder,getSingleFolder, searchFolderOrTask } from '../controllers/folderController';
import express from 'express';

export default (router:express.Router) => {
  router.get('/folders', isAuthenticated, getAllFolders);
  router.get('/folders/search', isAuthenticated, searchFolderOrTask);

  router.get('/folders/:id', isAuthenticated, getSingleFolder );

  router.post('/folders', isAuthenticated, createFolder);
  router.delete('/folders/:id', isAuthenticated, deleteFolder );
}

