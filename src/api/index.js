import { Router } from "express";
import sign from "./sign/sgin.contoller.js";
import auth from "./auth/auth.controller.js";
const router = Router();

router.use("/sign", sign);
router.use("/auth", auth);
router.get("/", (_, res) => {
  try {
    console.log("test");

    return res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
});

export default router;
