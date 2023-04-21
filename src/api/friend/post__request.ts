import { Request, Response } from "express";
import prisma from "../../prisma";

const post__request = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    //emil 혹은 QR | Link인데 회를 해야될듯 일단 이메일로 임이로 둔다.
    const user = req.decodedUser;

    const rsFriendInfo = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        FriendInfo: true,
      },
    });

    if (rsFriendInfo) {
      //상대방에게 push 알림 전송 (친구 요청)
      if (rsFriendInfo.FriendInfo?.pendingList) {
        const pendingList = JSON.parse(rsFriendInfo.FriendInfo?.pendingList);
        pendingList.push(user.id);
        await prisma.friendInfo.update({
          where: {
            userId: rsFriendInfo.id,
          },
          data: {
            pendingList: JSON.stringify(pendingList),
          },
        });
      }
    } else {
      return res
        .status(400)
        .json({ error: true, message: "존재하지 않는 유저입니다." });
    }

    return res.status(200).json({
      error: false,
      message: "SUCCESS",
    });
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
};

export default post__request;
