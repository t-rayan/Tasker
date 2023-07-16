import express from "express";

import { forgotPassword, login, register } from "../controllers/authController";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/forget-password", forgotPassword);
};
