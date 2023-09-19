import { NextFunction } from "express";

export const catchAsyncError =
  (passedFunction: any) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(passedFunction(req, res, next)).catch(next);
  };
