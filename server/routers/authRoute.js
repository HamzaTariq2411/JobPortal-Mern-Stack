import express from "express";
import signupController from "../controllers/user/signupController.js";
import loginController from "../controllers/user/loginController.js";
import logoutController from "../controllers/user/logoutController.js";
import getUserController from "../controllers/user/getUser.js";
import { isAuthorize } from "../middlewares/auth.js";

const router = express.Router();

router.route("/login").post(loginController);
router.route("/signup").post(signupController);
router.route("/logout").get(logoutController);
router.route("/getuser").get(isAuthorize  ,getUserController);


export default router;
