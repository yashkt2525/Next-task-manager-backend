var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TaskModel } from "../models/TaskModel.js";
export const taskOperations = {
    addTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const taskObj = req.body;
            if (taskObj) {
                try {
                    const task = yield TaskModel.create(taskObj);
                    res.status(201).json({
                        mes: "Task Added Successfully",
                        data: task,
                    });
                }
                catch (err) {
                    res.status(500).json({
                        mes: "Error occurs",
                    });
                }
            }
            else {
                res.json({
                    mes: "Invalid user details",
                });
            }
        });
    },
    deleteTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const objId = req.params.deleteId;
            const deletedTask = yield TaskModel.deleteOne({ id: objId });
            res.status(200).json({
                mes: "Task Deleted Successfully",
                data: deletedTask,
            });
        });
    },
    editTask(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const editData = req.body;
            const updatedData = yield TaskModel.updateOne({ id: editData.id }, editData);
            if (updatedData) {
                res.status(201).json({
                    mes: "Task updated Successfully",
                    data: updatedData,
                });
            }
            else {
                res.status(501).json({
                    mes: "Cannot update user",
                });
            }
        });
    },
    getTasks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const AllTasks = yield TaskModel.find({
                userId: req.userId,
            }).populate("userId");
            res.status(200).json({
                mes: "successfully get Data",
                data: AllTasks,
            });
        });
    },
};
