import { Router } from "express";
import { blogController } from "../controllers/blog.controller";
import { authentication, authorization } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/new",
  authentication,
  authorization("AUTHOR"),
  blogController.createBlog,
);
router.patch("/:blogId", blogController.updateBlog);
router.get("/:blogId", blogController.getBlogById);
router.get("/", blogController.getAllBlog);
router.delete("/delete/:blogId", blogController.deleteBlog);

export default router;
