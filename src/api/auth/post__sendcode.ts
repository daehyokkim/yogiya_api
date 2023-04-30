import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { Request, Response } from "express";
import { CustomSession } from "../../../interface";
import prisma from "../../prisma";
const post__sendCode = async (req: Request, res: Response) => {
  const { type = "resetPassword" } = req.query;
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({
        error: true,
        message: "INVALID PARAMS",
      });
    }

    if (type === "sign_up") {
      //이미 회원가입을 한 유저인지 확인

      const rsUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (rsUser) {
        return res.status(200).json({
          error: true,
          message: "A user who exists.",
        });
      }
    }

    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE,
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    const verifyCode = Math.floor(Math.random() * (1000000 - 100000) + 100000);

    const hash = bcrypt.hashSync(`${verifyCode}`, 8);
    let session: CustomSession = req.session;
    //express.session에 verifyEmail{email,otp:hash저장}
    session.verifyEmail = {
      email,
      otp: hash,
    };
    console.log(session.verifyEmail);
    const VERIFY_MESSAGE = `<div id="readFrame">
    <table
      style="text-align: center; border: 5px solid #eee"
      border="0"
      width="500"
      cellspacing="0"
      cellpadding="0"
      align="center"
    >
      <tbody>
        <tr>
          <td
            style="
              color: wheat;
              font-weight: 800;
              font-size: 40px;
              letter-spacing: -4px;
            "
            align="center"
            bgcolor="#F7EBE1"
            height="60"
          >
            <span style="color: #342622">YOGIYA</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px">
            <table width="100%" cellspacing="0" cellpadding="0">
              <tbody>
                <tr>
                  <td>
                    <table
                      style="font-weight: bold"
                      width="100%"
                      cellspacing="0"
                      cellpadding="0"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="font-size: 24px; padding-bottom: 8px"
                            valign="top"
                          >
                            Verification Mail
                          </td>
                        </tr>
                        <tr>
                          <td
                            style="
                              border-bottom: 1px solid #eee;
                              line-height: 20px;
                            "
                            valign="top"
                            height="65"
                          >
                            Please verify your email address using the code below
                            to continue!
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 0; border-bottom: 1px solid #eee">
                    <p style="color: #e09538; font-size: 16px; font-weight: bold">
                      VERIFY CODE
                    </p>
                    ${verifyCode}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  `;
    if (process.env.NODE_ENV === "main") {
      const mailOption = {
        from: process.env.MAIL_ID,
        to: email,
        subject: "email validation",
        html: VERIFY_MESSAGE,
        tesx: "인증메일입니다.",
      };
      const info = await transporter.sendMail(mailOption);
      console.log(info);
    } else {
      console.log(verifyCode);
    }

    setTimeout(() => {
      console.log(`delete Session ${session.verifyEmail}`);
      delete session.verifyEmail?.otp;
      console.log(`after delete Session ${session.verifyEmail}`);
    }, 1000 * 60 * 10);
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
export default post__sendCode;
