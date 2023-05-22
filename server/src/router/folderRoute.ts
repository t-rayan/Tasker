import { isAuthenticated } from '../middlewares/index';
import { createFolder, getAllFolders } from '../controllers/folderController';
import express from 'express';

export default (router:express.Router) => {
  router.get('/folders', isAuthenticated, getAllFolders);
  router.post('/folders', isAuthenticated, createFolder);
}

