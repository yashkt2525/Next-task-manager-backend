import jwt, { JwtPayload } from "jsonwebtoken";
import { userModel } from "../modules/users/models/userCollection.js";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string | null;
    }
  }
}

export const AuthMiddleWare = {
  async isAuthenticated(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    console.log("token is ", token);

    if (!token) return res.status(403).json({ mes: "Not logged In" });

    try {
      const decoded: string | JwtPayload = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as {
        user: string;
      };

      req.userId = await userModel.findById(decoded, decoded.user);
      next();
    } catch (e) {
      res.status(403).json({ mes: "invalid token" });
    }
  },
};
