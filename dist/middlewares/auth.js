var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import { userModel } from "../modules/users/models/userCollection.js";
export const AuthMiddleWare = {
    isAuthenticated(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers.authorization;
            console.log("token is ", token);
            if (!token)
                return res.status(403).json({ mes: "Not logged In" });
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.userId = yield userModel.findById(decoded, decoded.user);
                next();
            }
            catch (e) {
                res.status(403).json({ mes: "invalid token" });
            }
        });
    },
};
