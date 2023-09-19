import { TaskModel } from "../models/TaskModel.js";
import { Request, Response } from "express";

export const taskOperations = {
  async addTask(req: Request, res: Response) {
    const taskObj = req.body;
    if (taskObj) {
      try {
        const task = await TaskModel.create(taskObj);
        res.status(201).json({
          mes: "Task Added Successfully",
          data: task,
        });
      } catch (err) {
        res.status(500).json({
          mes: "Error occurs",
        });
      }
    } else {
      res.json({
        mes: "Invalid user details",
      });
    }
  },
  async deleteTask(req: Request, res: Response) {
    const objId: string = req.params.deleteId;
    const deletedTask = await TaskModel.deleteOne({ id: objId });
    res.status(200).json({
      mes: "Task Deleted Successfully",
      data: deletedTask,
    });
  },
  async editTask(req: Request, res: Response) {
    const editData = req.body;
    const updatedData = await TaskModel.updateOne(
      { id: editData.id },
      editData
    );
    if (updatedData) {
      res.status(201).json({
        mes: "Task updated Successfully",
        data: updatedData,
      });
    } else {
      res.status(501).json({
        mes: "Cannot update user",
      });
    }
  },
  async getTasks(req: Request, res: Response) {
    const AllTasks = await TaskModel.find({
      userId: req.userId,
    }).populate("userId");
    res.status(200).json({
      mes: "successfully get Data",
      data: AllTasks,
    });
  },
};
