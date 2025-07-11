import express from "express"
import { createBlog } from "../controller/blog.controller.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { singleUpload } from "../middleware/multer.js"
import { updateBlog } from "../controller/blog.controller.js"
const router = express.Router()
router.route("/:blogId").put(isAuthenticated, singleUpload, updateBlog)
router.route("/").post(isAuthenticated, createBlog)
export default router;