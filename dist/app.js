import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./modules/users/routes/userRoutes.js";
const app = express();
import connection from "./shared/db/mongoConnection.js";
import { taskRouter } from "./modules/tasks/routes/TaskRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use("/", userRouter);
app.use("/", taskRouter);
const server = app.listen(process.env.PORT, () => {
    console.log("Server Started at port number", process.env.PORT);
    connection();
});
