import express from "express";
import jwt from "jsonwebtoken";
import { authentication, random } from "../helpers/index";
import Folder from "../models/folder";
import User from "../models/users";

export const register = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { name, email, password } = req.body;
    const pswdResetToken = "23unwieufnwe";

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const userExist = await User.findOne({ email: email });
    console.log(userExist);

    if (userExist) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const salt = random();
    const newUserInstance = new User({
      name,
      email,
      resetToken: "asdfasfd",
      salt,
      password: authentication(salt, password),
    });
    const newUser = await newUserInstance.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRES_IN,
    });
    return res
      .status(201)
      .json({
        newUser,
        token,
      })
      .end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const login = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select(
      "+authentication.salt +authentication.password"
    );
    if (!user) {
      return res.status(404).json({ message: "User doesnot exists" });
    }

    const expectedHash = authentication(user.salt, password);

    if (user.password !== expectedHash) {
      return res.status(403).json({ message: "Incorrect details" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return res.status(200).json(token).end();
  } catch (error) {
    console.log(error.response.data);
    return res.status(500).json({ message: error.response.data });
  }
};

export const forgotPassword = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { email } = req.body;
    if (email) {
      const user = await User.findOne(email);
      const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      user.resetToken = resetToken;
      const saved = await user.save();
      console.log(saved);
      if (!user) {
        res.status(400).json({ message: "Email not found" });
      }
    }
  } catch (error) {
    console.log(error?.response?.data);
    return res.status(500).json({ message: error?.response?.data });
  }
};
