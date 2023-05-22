import express from 'express';

import { login, register } from '../controllers/authController';
import { isAuthenticated } from '../middlewares/index';
import { getProfile } from '../controllers/userController';

export default (router:express.Router) => {
  router.get('/user/profile', isAuthenticated,getProfile );
}

