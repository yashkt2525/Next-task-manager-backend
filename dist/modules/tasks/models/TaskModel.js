import mongoose, { Schema, SchemaTypes } from "mongoose";
const taskSchema = new Schema({
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
export const TaskModel = mongoose.model("task", taskSchema);
