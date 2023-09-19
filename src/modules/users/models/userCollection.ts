import { Model, Schema, SchemaType, SchemaTypes } from "mongoose";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { UserDocument } from "../../../interfaces/UserDocumentInterface.js";
const userSchema = new Schema<UserDocument>({
  email: SchemaTypes.String,
  password: SchemaTypes.String,
  name: SchemaTypes.String,
});
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET as string, {
    expiresIn: "1m",
  });
};
userSchema.methods.comparePassword = async function (password: any) {
  console.log(this.password);
  return await bcrypt.compare(password, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
userSchema.methods.getResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)

    .digest("hex");
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};
export const userModel: Model<UserDocument> = mongoose.model(
  "users",
  userSchema
);
