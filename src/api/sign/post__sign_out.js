import prisma from "../../prisma.js";

const post__sign_out = async (req, res, next) => {
  try {
    const { refershToken } = req.body;

    await prisma.userExtra.update({
      where: { refershToken: refershToken },
      data: {
        refershToken: null,
      },
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.log(e);
  }
};

export default post__sign_out;
