import "dotenv/config";
import express, { Express, NextFunction, Request, Response } from "express";
import authRouter from "./routers/auth.router";
import blogRouter from "./routers/blog.router";
import { globalErrorHandler } from "./middlewares/errorMiddleware";
import cookieParser from "cookie-parser";
import cors from "cors";

const app: Express = express();

const PORT = 8000;

// json middleware
app.use(express.json());

// cookie-parser middleware
app.use(cookieParser());

//cors middleware
// app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/blog", blogRouter);

// error middleware
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`🦄 Server is running in port ${PORT}`);
});
