import "dotenv/config";
import express, { Express, NextFunction, Request, Response } from "express";
import authRouter from "./routers/auth.router";
import blogRouter from "./routers/blog.router";
import { globalErrorHandler } from "./middlewares/errorMiddleware";
import blogAuthRouter from "./routers/blogAuth.router";
import cookieParser from "cookie-parser";

const app: Express = express();

const PORT = 8000;

// json middleware
app.use(express.json());

// cookie-parser middleware
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/blog", blogRouter);

// protected routes
app.use("/api/auth", blogAuthRouter);

// error middleware
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`🦄 Server is running in port ${PORT}`);
});
