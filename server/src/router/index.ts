import express from 'express';
import authentication from './authRouter';
import user from './userRoter';
import folder from './folderRoute';
import task from './taskRouter'

const router = express.Router();

export default ():express.Router => {

  authentication(router);
  user(router);
  folder(router);
  task(router)



  return router;
}