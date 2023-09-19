export const sendToken = (res, user, message, statusCode = 200) => {
    const token = user.getJWTToken();
    res.status(statusCode).json({
        success: true,
        message,
        user: Object.assign(Object.assign({}, user._doc), { accessToken: token }),
    });
};
