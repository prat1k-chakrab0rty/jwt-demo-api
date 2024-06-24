import express from "express";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js"

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/api/auth", authRoute);

app.use((err, req, res, next) => {
    res.status(err.status).json({ message: err.message });
});

app.listen(8800, () => { console.log("Backend is running!"); });