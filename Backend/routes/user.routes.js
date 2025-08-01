import express from "express"
import { login, logout, register, updateProfile } from "../controller/user.controller.js"
import { isAuthenticated } from "../middleware/isAuthenticated.js"
import { singleUpload } from "../middleware/multer.js"
import { getAllUsers } from "../controller/user.controller.js"
const router=express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/update").put(isAuthenticated,singleUpload,updateProfile)
router.get('/all-users', getAllUsers);
export default router