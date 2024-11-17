import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware/error.middleware.js"
import cookieParser from "cookie-parser";
import userRouter from "./routes/users.routes.js";

const app = express();

//Middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

//Routes
import healthcheckRouter from "./routes/healthcheck.routes.js";

//Route
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRouter);

app.use(errorHandler)

export { app };