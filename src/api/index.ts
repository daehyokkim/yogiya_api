import { Router } from "express";
import sign from "./sign/sgin.contoller";
import auth from "./auth/auth.controller";
import friendList from "./friend/friend.controller";
import myPage from "./myPage/myPage.controller";
import authMiddleware from "../middleware/auth";
import socket from "./socket/socket.controller";
const router = Router();

router.use("/v1/sign", sign);
router.use("/v1/auth", auth);
router.use("/v1/friends", authMiddleware, friendList);
router.use("/v1/my-page", authMiddleware, myPage);
router.use("/socket", socket);

export default router;
