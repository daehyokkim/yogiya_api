import {
  generateAccessToken,
  generateRefershToken,
  verifyrefershToken,
} from "../../utiles/jwt.js";
import { replaceHash } from "../../utiles/replaceHash.js";
import prisma from "../../prisma.js";
import bcrypt from "bcrypt";

const post_sign_up = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
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

    const rhash = replaceHash(user.password);
    if (!bcrypt.compareSync(password, rhash)) {
      return res.status(200).json({
        error: true,
        message: "비밀번호 또는 이메일이 올바르지 않습니다.",
      });
    }

    const accessToken = generateAccessToken(email);
    const refershToken = generateRefershToken(email);
    const verifiedRefershToken = verifyrefershToken(refershToken);

    if (!verifiedRefershToken || !verifiedRefershToken.exp) {
      return res
        .status(500)
        .json({ error: true, message: "Internal Server Error" });
    }

    await prisma.userExtra.update({
      where: { userId: user.id },
      data: {
        refeshToken: refershToken,
      },
    });

    return res.status(200).json({
      error: false,
      data: {
        accessToken: accessToken,
        refeshToken: refershToken,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

export default post_sign_up;
