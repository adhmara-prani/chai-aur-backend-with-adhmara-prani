import { Router } from "express";
import {registerUser} from "../controllers/user.controller.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCnt: 1
        },
        {
            name: "coverImg",
            maxCnt: 1
        }
    ]), // how to send images when we get details from user
    registerUser);

export default router