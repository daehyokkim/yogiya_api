import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
const post__sendCode = async (req, res, next) => {
  const { type = "resetPassword" } = req.query;
  const { email } = req.body;
  try {
    if (type === "sign_up") {
      //이미 회원가입을 한 유저인지 확인
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
    //express.session에 verifyEmail{email,otp:hash저장}

    const VERIFY_MESSAGE = `<html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
      </head>
      <body>
        <div id="readFrame">
          <table
            align="center"
            width="500"
            border="0"
            cellpadding="0"
            cellspacing="0"
            style="text-align: center; border: 5px solid #eee"
          >
            <tbody>
              <tr>
                <td
                  align="center"
                  height="60"
                  bgcolor="#2d261b"
                  style="
                    color: wheat;
                    font-weight: 800;
                    font-size: 42px;
                    letter-spacing: -4px;
                  "
                >
                  YOGIYA
                </td>
              </tr>
              <tr>
                <td style="padding: 20px">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tbody>
                      <tr>
                        <td>
                          <table
                            width="100%"
                            cellpadding="0"
                            cellspacing="0"
                            style="font-weight: bold"
                          >
                            <tbody>
                              <tr>
                                <td
                                  valign="top"
                                  style="font-size: 24px; padding-bottom: 8px"
                                >
                                  Verification Mail
                                </td>
                              </tr>
                              <tr>
                                <td
                                  valign="top"
                                  height="65"
                                  style="
                                    border-bottom: 1px solid #eee;
                                    line-height: 20px;
                                  "
                                >
                                  Please verify your email address using the code
                                  below to continue!
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 20px 0; border-bottom: 1px solid #eee">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <colgroup>
                              <col width="30%" />
                              <col width="70%" />
                            </colgroup>
                            <tbody height="25">
                              <tr
                                style="
                                  color: rgb(224, 149, 56);
                                  font-size: 16px;
                                  font-weight: bold;
                                "
                              >
                                <td>VERIFY CODE</td>
                              </tr>
                              <td
                                style="
                                  color: #2d261b;
                                  font-size: 48px;
                                  font-weight: bold;
                                  width: 100%;
                                "
                              >
                                ${verifyCode}
                              </td>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style="
                            color: #2d261b;
                            padding-top: 20px;
                            line-height: 20px;
                            font-size: 14px;
                            font-weight: bold;
                          "
                        >
                          Welcome YOGIYA!
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr>
                <td
                  align="center"
                  height="50"
                  bgcolor="#2d261b"
                  style="color: wheat"
                >
                    YOGIYA. All rights reserved.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </body>
    </html>
    `;
    const mailOption = {
      from: process.env.MAIL_ID,
      to: email,
      subject: "email validation",
      html: "test",
      tesx: "인증메일입니다.",
    };
    const info = await transporter.sendMail(mailOption);
    return res.status(200);
  } catch (e) {
    console.log(e);
  }
};
export default post__sendCode;
