import { NextFunction, Request, Response } from "express";
import { userModel } from "../models/userCollection.js";

import { comparePassword } from "../../../services/passwordHash.js";
import ErrorHandler from "../../../utils/ErrorHandler.js";
import { sendToken } from "../../../utils/SendToken.js";
import { catchAsyncError } from "../../../middlewares/catchAsyncError.js";

export const userController = {
  async userLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter All Fields", 400));
    }
    const user = await userModel.findOne({ email }).exec();

    if (!user) return res.status(404).json({ mes: "Invalid user" });

    const hashPassword = user.password;
    const isMatch = comparePassword(password, hashPassword);
    if (!isMatch) return res.status(404).json({ mes: "Invalid user" });
    sendToken(res, user, `Welcome back ${user.name}`, 200);
  },
  async userRegister(req: Request, res: Response, next: NextFunction) {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return next(new ErrorHandler("Please Enter All Fields", 400));

    let user = await userModel.findOne({ email: email }).exec();
    if (user) return res.status(401).json({ mes: "User Already Exists" });

    user = await userModel.create({
      name,
      email,
      password,
    });

    sendToken(res, user, "Registered Successfully", 200);
  },
};
export const getMyProfile = catchAsyncError(
  async (req: any, res: any, next: any) => {
    const user = await userModel.findById(req.user._id);
    res.status(200).json({
      success: true,
      user,
    });
  }
);
