import { UserModel } from "../models/user";

const migration = async () => {
  try {
    const users = await UserModel.find();
    users.forEach(async (user) => {
      user.refreshToken = null;
      user.refreshTokenExpiresIn = null;

      await user.save();
      console.log("done");
    });
  } catch (error) {
    console.log(error);
  }
};
