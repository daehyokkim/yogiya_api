import { Router } from "express";
import signCtrl from "./sign.ctrl.js";
const router = Router();

router.post("/sendCode", signCtrl.post.sendCode);
router.post("/verifyCode", signCtrl.post.verifyCode);
router.post("/signUp", signCtrl.post.sign_up);
export default router;
