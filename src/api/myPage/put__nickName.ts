import { Request, Response } from "express";
import prisma from "../../prisma";
import SocketServer from "../../socket";
const put__nickName = async (req: Request, res: Response) => {
  try {
    const { newNickName } = req.body;
    const user = req.decodedUser;
    if (!newNickName || typeof newNickName !== "string") {
      return res.status(400).json({
        error: true,
        message: "INVALID PARAMS",
      });
    }
    const socketServer = SocketServer.instance;
    const mySocket = socketServer.sockets[user.email];
    if (!mySocket) {
      return res.status(400).json({
        error: true,
        message: "SOCKET ERROR",
      });
    }

    mySocket.broadcast.to(mySocket.room).email("updateNickName", {
      email: user.email,
      newNickName: newNickName,
    });

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        nickname: newNickName,
      },
    });

    return res.status(200).json({
      error: false,
      message: "SUCCESS",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: true,
      message: "SERVER ERROR",
    });
  }
};

export default put__nickName;
