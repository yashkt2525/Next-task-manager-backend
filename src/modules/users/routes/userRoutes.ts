import { Router } from "express";
import { userController } from "../controllers/userControllers.js";

export const userRouter = Router();

userRouter.post("/", userController.userLogin);
userRouter.post("/signup", userController.userRegister);
