import bcrypt from "bcrypt";
import createHttpError from "http-errors";

import prisma from "../../prisma.js";
const post__sign_up = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    console.log(req.session.verifyEmail);
    //오류처리
    if (
      req.session.verifyEmail?.email !== email ||
      !req.session.verifyEmail?.verified
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
        nickname: "test",
      },
    });

    return res.status(200).json({
      error: false,
      message: "SUCCESS SIGN_UP",
    });
  } catch (e) {
    console.log(e);
  }
};

export default post__sign_up;
