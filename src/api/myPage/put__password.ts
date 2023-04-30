import { Request, Response } from "express";
import prisma from "../../prisma";
import bcrypt from "bcrypt";

const put__passwrod = async (req: Request, res: Response) => {
  const { newPasswrod } = req.body;
  const user = req.decodedUser;
  try {
    if (!newPasswrod || typeof newPasswrod !== "string") {
      return res.status(400).json({
        error: true,
        message: "INVALID PARAMS",
      });
    }
    const hash = bcrypt.hashSync(newPasswrod, 7);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hash,
      },
    });

    return res.status(200).json({
      error: true,
      message: "SUCCESS",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: true,
      message: "SERVER ERRORR",
    });
  }
};

export default put__passwrod;
