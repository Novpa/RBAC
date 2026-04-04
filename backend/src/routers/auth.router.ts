import { Request, Response, Router } from "express";
import { authentication, authorization } from "../middlewares/auth.middleware";

import {
  login,
  logout,
  refresh,
  resendOtp,
  signup,
  verifyOtp,
} from "../controllers/auth.controller";
import { signupSchema } from "../schemas/auth.schema";
import { validate } from "../middlewares/validation.middleware";

const router = Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh", refresh);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

//protected route
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
