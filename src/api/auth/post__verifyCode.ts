import bcrypt from "bcrypt";
import { Request, Response } from "express";
import Session from "../../session";
const post__verifyCode = async (req: Request, res: Response) => {
  const { verifyCode, email } = req.body;

  if (
    !verifyCode ||
    typeof verifyCode !== "string" ||
    !email ||
    typeof email !== "string"
  ) {
    return res.status(400).json({
      error: true,
      message: "INVALID PARAMS",
    });
  }

  try {
    let verifyEmail = Session.instance.session[email];
    if (!verifyEmail) {
      return res.status(400).json({
        error: true,
        message: "TO_LATE_CODE",
      });
    }
    if (verifyEmail.count == 5) {
      return res.status(429).json({
        error: true,
        message: "TOO_MANY_REQUEST",
      });
    }

    if (bcrypt.compareSync(verifyCode, verifyEmail.otp)) {
      verifyEmail.verified = true;
      return res.status(200).json({
        error: false,
        message: "VERIFY_SUCCESS",
      });
    } else {
      if (!verifyEmail.count) {
        verifyEmail.count = 1;
      } else {
        verifyEmail.count++;
      }
      return res.status(401).json({
        error: true,
        message: "WRONG_CODE",
        falseCount: verifyEmail.count,
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      error: true,
      message: "SERVER ERROR",
    });
  }
};

export default post__verifyCode;
