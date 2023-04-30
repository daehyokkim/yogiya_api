import prisma from "../../prisma";
import { Request, Response } from "express";
const delete__sign_out = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({
        error: true,
        message: "INVALID PARAMS",
      });
    }

    await prisma.userExtra.update({
      where: { refreshToken: refreshToken },
      data: {
        refreshToken: null,
      },
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: true,
      message: "SERVER ERROR",
    });
  }
};

export default delete__sign_out;
