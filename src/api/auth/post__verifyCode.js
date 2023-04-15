import bcrypt from "bcrypt";

const post__verifyCode = async (req, res) => {
  const { verifyCode } = req.body;
  try {
    if (!req.session.verifyEmail?.otp) {
      return res.status(400).json({
        error: true,
        message: "TO_LATE_CODE",
      });
    }
    //오류 처리해야뎀
    if (req.session.verifyEmail.count === 5) {
      return res.status(200).json({
        error: true,
        message: "TOO_MANY_REQUEST",
      });
    }
    if (bcrypt.compareSync(verifyCode, req.session.verifyEmail.otp)) {
      req.session.verifyEmail.verified = true;
      return res.status(200).json({
        error: false,
        message: "VERIFY_SUCCESS",
      });
    } else {
      if (!req.session.verifyEmail.count) {
        req.session.verifyEmail.count = 1;
      } else {
        req.session.verifyEmail.count++;
      }
      return res.status(500).json({
        error: true,
        message: "WRONG_CODE",
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export default post__verifyCode;
