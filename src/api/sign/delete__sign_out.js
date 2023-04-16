import prisma from "../../prisma.js";

const delete__sign_out = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    await prisma.userExtra.update({
      where: { refreshToken: refreshToken },
      data: {
        refreshToken: null,
      },
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.log(e);
  }
};

export default delete__sign_out;
