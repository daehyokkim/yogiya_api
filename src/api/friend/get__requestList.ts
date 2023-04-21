import prisma from "../../prisma";
import { Request, Response } from "express";

const get__requestList = async (req: Request, res: Response) => {
  try {
    const user = req.decodedUser;

    const rsFriends = await prisma.friendInfo.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        pendingList: true,
      },
    });
    if (rsFriends) {
      const userIdList = JSON.parse(rsFriends.pendingList);
      const friendsId = userIdList.join(",");
      const rspedingEmails =
        await prisma.$queryRaw`SELECT email,nickname FROM User WHERE id IN (${friendsId})`;

      return res.status(200).json({
        error: false,
        data: {
          requestList: rspedingEmails,
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

export default get__requestList;
