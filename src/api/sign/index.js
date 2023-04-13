import { Router } from "express";
import signCtrl from "./sign.ctrl.js";
const router = Router();

router.post("/sendCode", signCtrl.post.sendconde);
export default router;
