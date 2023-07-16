import express, { Request } from "express";
import jwt from "jsonwebtoken";

import User from "../models/users";

export interface MyRequestObject extends Request {
  user?: any;
}

interface JwtPayload {
  userId: string;
}

export const isAuthenticated = async (
  req: MyRequestObject,
  res: express.Response,
  next: express.NextFunction
): Promise<any> => {
  try {
    const authToken: string = req.headers.authorization?.replace("Bearer ", "");
    if (!authToken) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET) as JwtPayload;

    req.user = decoded?.userId;

    const user = await User.findById(req.user);
    if (!user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    return next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
