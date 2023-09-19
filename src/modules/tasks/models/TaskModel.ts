import mongoose, { Model, Schema, SchemaTypes } from "mongoose";
import { TaskDocument } from "../../../interfaces/TaskDocumentInterface.js";

const taskSchema = new Schema<TaskDocument>({
  id: SchemaTypes.String,
  title: SchemaTypes.String,
  desc: SchemaTypes.String,
  date: SchemaTypes.String,
  priority: SchemaTypes.String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

export const TaskModel: Model<TaskDocument> = mongoose.model(
  "task",
  taskSchema
);
