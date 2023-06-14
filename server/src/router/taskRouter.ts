import { isAuthenticated } from '../middlewares/index';
import { createFolder, deleteFolder, getAllFolders, getSingleFolder } from '../controllers/folderController';
import express from 'express';
import { createTask, deleteTask, getAllTasks, getTodaysTasks, updateTask } from '../controllers/taskController'

export default (router:express.Router) => {
  router.get('/tasks', isAuthenticated, getAllTasks);
  router.post('/tasks', isAuthenticated, createTask);
  router.get('/tasks/due-today', isAuthenticated, getTodaysTasks);

  router.put('/tasks/:id', isAuthenticated, updateTask);
  router.delete('/tasks/:id', isAuthenticated, deleteTask);



}
