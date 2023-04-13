import { Router } from "express";
import sign from "./sign/index.js";

const router = Router();

router.use("/sign", sign);

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
