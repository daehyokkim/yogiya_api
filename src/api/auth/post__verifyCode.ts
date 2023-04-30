import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { CustomSession } from "../../../interface";
const post__verifyCode = async (req: Request, res: Response) => {
  const { verifyCode } = req.body;

  if (!verifyCode) {
    return res.status(400).json({
      error: true,
      message: "INVALID PARAMS",
    });
  }

  let session: CustomSession = req.session;
  try {
    if (!session.verifyEmail?.otp) {
      return res.status(400).json({
        error: true,
        message: "TO_LATE_CODE",
      });
    }
    //오류 처리해야뎀
    if (session.verifyEmail.count === 5) {
      return res.status(200).json({
        error: true,
        message: "TOO_MANY_REQUEST",
      });
    }
    if (bcrypt.compareSync(verifyCode, session.verifyEmail.otp)) {
      session.verifyEmail.verified = true;
      return res.status(200).json({
        error: false,
        message: "VERIFY_SUCCESS",
      });
    } else {
      if (!session.verifyEmail.count) {
        session.verifyEmail.count = 1;
      } else {
        session.verifyEmail.count++;
      }
      return res.status(500).json({
        error: true,
        message: "WRONG_CODE",
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500);
  }
};

export default post__verifyCode;
