import { Request, Response } from "express";
import prisma from "../../prisma";

const get__friendList = async (req: Request, res: Response) => {
  try {
    const user = req.decodedUser;

    const rsFriends = await prisma.friendInfo.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        connectedList: true,
      },
    });
    if (rsFriends) {
      const userIdList = JSON.parse(rsFriends.connectedList);
      const friendsId = userIdList.join(",");
      const rsConnectedEmails =
        await prisma.$queryRaw`SELECT email,nickname FROM User WHERE id IN (${friendsId})`;

      return res.status(200).json({
        error: false,
        data: {
          friendList: rsConnectedEmails,
        },
      });
    } else {
      return res.status(400);
    }
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
};

export default get__friendList;
