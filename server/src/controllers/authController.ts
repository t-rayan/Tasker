import express from "express";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import { authentication, random } from "../helpers/index";
import Folder from "../models/folder";
import User from "../models/users";

export const register = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { name, email, password } = req.body;

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

// controller to handle forgot password

export const forgotPassword = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { email } = req.body;

    if (email) {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(404).json({ message: "Email not found." });
      }
      if (user) {
        // const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, {
        //   expiresIn: "1m",
        // });
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiry = Date.now() + 900000;
        user.resetToken = resetToken;
        user.resetTokenExpiry = resetTokenExpiry;
        await user.save();

        const encodedResetToken = encodeURIComponent(resetToken);
        console.log(resetToken);
        // send email if user exists
        let config = {
          service: "gmail",
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          },
        };
        let transporter = nodemailer.createTransport(config);
        let mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Reset password",
          html: `<p>You are receiving this email because you have requested the reset of your password. Please click the following link to reset your password: 
          <a href="http://localhost:5173/auth/reset-password/${encodedResetToken}">Reset Password</a></p>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ error: "Error sending email" });
          }
          res.status(200).json({
            info: info,
            message: "Password reset link sent successfully",
          });
        });
      }
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error?.response?.data });
  }
};

export const resetPassword = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // if user
    // hash and save the password
    const salt = random();
    const hashedPassword = authentication(salt, password);
    user.salt = salt;
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    const updatedUser = await user.save();
    return res
      .status(200)
      .json({ updatedUser, message: "Password updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: error?.response?.data });
  }
};
