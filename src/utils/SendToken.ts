import { Response } from "express";
type Message = { mes: string; data: any };
interface SendTokenDataType {
  res: Response;
  user: any;
  message: Message;
  statusCode: number;
}
export const sendToken = (
  res: any,
  user: any,
  message: any,
  statusCode = 200
) => {
  const token = user.getJWTToken();

  res.status(statusCode).json({
    success: true,
    message,
    user: { ...user._doc, accessToken: token },
  });
};
