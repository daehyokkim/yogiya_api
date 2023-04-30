import { Request, Response } from "express";
import prisma from "../../prisma";

const delete__user = async (req: Request, res: Response) => {
  const user = req.decodedUser;

  try {
    await prisma.user.delete({
      where: {
        id: user.id,
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
export default delete__user;
