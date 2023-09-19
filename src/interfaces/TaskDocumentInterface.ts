import { Document } from "mongoose";
import { UserDocument } from "./UserDocumentInterface.js";

export interface TaskDocument extends Document {
  id: string;
  title: string;
  desc: string;
  date: string;
  priority: string;
  userId: UserDocument["_id"];
}
