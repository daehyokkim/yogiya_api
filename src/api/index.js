import { Router } from "express";
import sign from "./sign/sgin.contoller.js";
import auth from "./auth/auth.controller.js";
import friendList from "./friendList/friend.controller.js";
import myPage from "./myPage/myPage.controller.js";

const router = Router();

router.use("/v1/sign", sign);
router.use("/v1/auth", auth);
router.use("/v1/friends", friendList);
router.use("/v1/my-page", myPage);
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
