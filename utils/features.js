import jwt from "jsonwebtoken";

export const sendCookie = async (res, user, statusCode, message) => {
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY)
    console.log(token)
    return res.status(statusCode).cookie("token", token, {
        httpOnly: true,
        expire: new Date(Date.now() + 60 * 1000),
        sameSite: process.env.NODE_ENV === "Developement" ? "lex" : "none",
        secure: process.env.NODE_ENV === "Developement" ? false : true,
    }).json({ success: true, message })
}