import { Router } from "express";
import { taskOperations } from "../controllers/TaskController.js";
import { AuthMiddleWare } from "../../../middlewares/auth.js";
export const taskRouter = Router();
taskRouter.get(
  "/task/get-task",
  AuthMiddleWare.isAuthenticated,
  taskOperations.getTasks
);
taskRouter.post(
  "/task/add-task",
  AuthMiddleWare.isAuthenticated,
  taskOperations.addTask
);
taskRouter.delete(
  "/task/delete-task/:deleteId",
  AuthMiddleWare.isAuthenticated,
  taskOperations.deleteTask
);
taskRouter.put(
  "/task/edit-task",
  AuthMiddleWare.isAuthenticated,
  taskOperations.editTask
);
