import { Request, Response, Router } from "express";
import { authentication, authorization } from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/blog/new",
  authentication,
  authorization("AUTHOR"),
  (req: Request, res: Response) => {
    res.status(200).json({
      message: "create blog",
    });
  },
);

export default router;
