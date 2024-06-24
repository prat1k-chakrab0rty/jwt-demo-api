import jwt from "jsonwebtoken";
import { createError } from "../error.js";


const users = [
    { name: "pratik", password: "123456" },
    { name: "gaurav", password: "123456" },
    { name: "sharuk", password: "123456" },
];

export const register = (req, res, next) => {
    try {
        const { name } = req.body;
        //if any of the fields are empty
        if (!(name && req.body.password)) {
            return next(createError("Both fields are required!", 400));
        }
        const existingUser = users.find(u => (u.name === name));
        //user exists
        if (existingUser) {
            return next(createError("User already registered!", 401));
        }
        // valid user
        else {
            const user = { name, password: req.body.password };
            users.push(user);
            const accessToken = jwt.sign({ name }, "pratik_the_developer");
            const { password, ...userRes } = user;
            res.cookie("accessToken", accessToken, { httpOnly: true }).status(201).json(userRes);
        }
    } catch (err) {
        next(createError(err, 500));
    }
}

export const login = (req, res, next) => {
    try {
        const { name } = req.body;
        //if any of the fields are empty
        if (!(name && req.body.password)) {
            return next(createError("Both fields are required!", 400));
        }
        const existingUser = users.find(u => (u.name === name));
        //user exists
        if (existingUser) {
            //password mismatch
            if (existingUser.password !== req.body.password) {
                return next(createError("Incorrect Credentials!", 401));
            }
            //password match
            else {
                const accessToken = jwt.sign({ name }, "pratik_the_developer");
                const { password, ...userRes } = existingUser;
                res.cookie("accessToken", accessToken, { httpOnly: true }).status(200).json(userRes);
            }
        }
        // user doesn't exist
        else {
            return next(createError("User not found!", 404));
        }
    } catch (err) {
        next(createError(err, 500));
    }
}

export const logout = (req, res, next) => {
    try {
        res.clearCookie("accessToken");
        res.status(200).json("Logged out successfully!");
    } catch (error) {
        next(createError(error, 500));
    }

}