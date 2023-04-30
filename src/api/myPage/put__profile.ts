import { Request, Response } from "express";
import S3 from "aws-sdk/clients/s3";
import prisma from "../../prisma";
import SocketServer from "../../socket";
const put__profile = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    const user = req.decodedUser;
    const socketServer = SocketServer.instance;
    console.log(socketServer.sockets);
    const s3 = new S3({
      accessKeyId: process.env.S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.S3_SECRET_KEY,
      region: process.env.REGION,
    });
    const params = {
      Bucket: process.env.BUCKET_NAME,
      Key: `${user.id}/${file?.originalname}`,
      Body: file?.buffer,
      ACL: "public-read",
    };
    const mySocket = socketServer.sockets[user.email];
    if (!mySocket) {
      return res.status(400).json({
        error: true,
        message: "SOCKET ERROR",
      });
    }
    await s3.upload(params as any, async (err: any, uploadedData: any) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ ok: false, error: err });
      }
      console.log(user);
      await prisma.profile.update({
        where: {
          userId: user.id,
        },
        data: {
          filePath: uploadedData.Location,
        },
      });

      mySocket.broadcast.to(mySocket.room).emit("updateProfileUrl", {
        email: user.email,
        profileUrl: uploadedData.Location,
      });

      return res.status(200).json({
        error: false,
        updatedProfileUrl: uploadedData.Location,
      });
    });

    // const fileName = `test.png`;
    // const ContentType = "image/png";

    // const param = {
    //   Bucket: process.env.BUCKET_NAME,
    //   Key: fileName,
    //   ContentType: ContentType,
    //   ACL: process.env.S3_ACL,
    // };

    // const url = s3.getSignedUrl("putObject", param);
    // console.log(url);

    return;
  } catch (error) {
    console.log("sts");
    console.error(error);
    return res.status(500).json({
      error: false,
      message: "SERVER ERROR",
    });
  }
};

export default put__profile;
