import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utiles/jwt";
import { replaceHash } from "../../utiles/replaceHash";
import prisma from "../../prisma";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
const post_sign_up = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: "INVALID PARAMS",
      });
    }

    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        email: true,
        password: true,
        nickname: true,
      },
    });
    console.log(user);
    if (!user) {
      return res.status(200).json({
        error: true,
        message: "not found user info. pleas dublechecking..",
      });
    }

    const rhash: any = replaceHash(user.password);
    if (!bcrypt.compareSync(password, rhash)) {
      return res.status(200).json({
        error: true,
        message: "비밀번호 또는 이메일이 올바르지 않습니다.",
      });
    }

    const accessToken = generateAccessToken(user.email, user.id);
    const refreshToken = generateRefreshToken(user.email, user.id);
    const verifiedRefreshToken = verifyRefreshToken(refreshToken) as JwtPayload;
    console.log(verifiedRefreshToken);
    if (!verifiedRefreshToken || !verifiedRefreshToken.exp) {
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    }

    await prisma.userExtra.update({
      where: { userId: user.id },
      data: {
        refreshToken: refreshToken,
      },
    });

    return res.status(200).json({
      error: false,
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
};

export default post_sign_up;
