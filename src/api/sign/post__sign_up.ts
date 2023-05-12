import bcrypt from "bcrypt";
// import createHttpError from "http-errors";
import { Request, Response } from "express";
import prisma from "../../prisma";
import { CustomSession } from "../../../interface";
const post__sign_up = async (req: Request, res: Response) => {
  const { email, password, nickname = "test", googleFlag = false } = req.body;
  let session: CustomSession = req.session;

  try {
    if (!email || !password || !nickname) {
      return res.status(400).json({
        error: true,
        message: "INVALID PARAMS",
      });
    }
    //오류처리
    if (
      !session.verifyEmail ||
      session.verifyEmail.email !== email ||
      !session.verifyEmail.verified
    ) {
      return res.status(400).json({
        error: true,
        message: "VERIFY_EMAIL_FIRST",
      });
    }

    //password hash
    const hash = bcrypt.hashSync(password, 7);

    //db저장
    await prisma.user.create({
      data: {
        email: email,
        password: hash,
        nickname: nickname,
        googleflag: googleFlag,
      },
    });

    return res.status(200).json({
      error: false,
      message: "SUCCESS SIGN_UP",
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: true,
      message: "SERVER ERROR",
    });
  }
};

export default post__sign_up;
