import { JwtPayload } from "jsonwebtoken";
import prisma from "../../prisma";
import {
  paresJwt,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utiles/jwt";
import dayjs from "dayjs";
import { Request, Response } from "express";

const put__refreshToken = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const accessToken = req.headers.authorization?.split("Bearer ")[1];

    if (!accessToken) {
      return res
        .status(400)
        .json({ error: true, message: "로그인되어있지 않습니다." });
    }

    const decodedAccessToken = paresJwt(accessToken);
    if (!decodedAccessToken) {
      return res
        .status(400)
        .json({ error: true, message: "토큰이 올바르지 않습니다." });
    }

    const newAccessToken: string = generateAccessToken(
      decodedAccessToken.data.email,
      decodedAccessToken.data.id
    );
    const decodedRefreshToken = verifyRefreshToken(refreshToken) as JwtPayload;
    if (!decodedRefreshToken || !decodedAccessToken.exp) {
      return res.status(500).json({
        error: true,
        message: "서버 오류",
      });
    }
    if (decodedRefreshToken.exp! * 1000 < new Date().getTime()) {
      return res
        .status(400)
        .json({ error: true, message: "토큰이 만료되었습니다." });
    } else if (
      dayjs(decodedRefreshToken.exp! * 1000).diff(dayjs(), "weeks") < 2
    ) {
      const newRefreshToken = generateRefreshToken(
        decodedAccessToken.data.email,
        decodedAccessToken.data.id
      );

      await prisma.userExtra.update({
        where: {
          refreshToken: refreshToken,
        },
        data: {
          refreshToken: newRefreshToken,
        },
      });

      return res.status(200).json({
        error: false,
        data: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
      });
    }

    return res.status(200).json({
      error: false,
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
};

export default put__refreshToken;
