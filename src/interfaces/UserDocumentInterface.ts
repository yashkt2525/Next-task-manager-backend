import { Document } from "mongoose";

export interface UserDocument extends Document {
  name: string;
  password: string;
  email: string;
}
