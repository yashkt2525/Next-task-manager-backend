var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { userModel } from "../models/userCollection.js";
import { comparePassword } from "../../../services/passwordHash.js";
import ErrorHandler from "../../../utils/ErrorHandler.js";
import { sendToken } from "../../../utils/SendToken.js";
import { catchAsyncError } from "../../../middlewares/catchAsyncError.js";
export const userController = {
    userLogin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!email || !password) {
                return next(new ErrorHandler("Please Enter All Fields", 400));
            }
            const user = yield userModel.findOne({ email }).exec();
            if (!user)
                return res.status(404).json({ mes: "Invalid user" });
            const hashPassword = user.password;
            const isMatch = comparePassword(password, hashPassword);
            if (!isMatch)
                return res.status(404).json({ mes: "Invalid user" });
            sendToken(res, user, `Welcome back ${user.name}`, 200);
        });
    },
    userRegister(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body;
            if (!name || !email || !password)
                return next(new ErrorHandler("Please Enter All Fields", 400));
            let user = yield userModel.findOne({ email: email }).exec();
            if (user)
                return res.status(401).json({ mes: "User Already Exists" });
            user = yield userModel.create({
                name,
                email,
                password,
            });
            sendToken(res, user, "Registered Successfully", 200);
        });
    },
};
export const getMyProfile = catchAsyncError((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel.findById(req.user._id);
    res.status(200).json({
        success: true,
        user,
    });
}));
