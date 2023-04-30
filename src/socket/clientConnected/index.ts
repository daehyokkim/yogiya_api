import { CustomSocket } from "interface";
import SocketServer from "../../socket";
import prisma from "../../prisma";
// import onLogIn from "./onLogIn";

const onClientConnected = (_socket: CustomSocket) => {
  try {
    let socketServer = SocketServer.instance;

    if (!_socket.authorization && process.env.NODE_ENV !== "test") {
      _socket.emit("/error", {
        message: "accessToken 만료.. 다시 로그인 해주세요",
      });
      _socket.disconnect();
    }

    _socket.on("login", async (data) => {
      console.log("login");
      if (process.env.NODE_ENV === "test") {
        _socket.userEmail = data.email;
      }

      if (!_socket.userEmail) {
        console.log("잘못된 접근입니다!");
      } else {
        _socket.room = _socket.userEmail;
        socketServer.sockets[_socket.userEmail] = _socket;
        _socket.join(_socket.userEmail);
        console.log("내방 생성!");

        const friendInfo = await prisma.friendInfo.findUnique({
          where: {
            userId: _socket.userId,
          },
          select: {
            connectedList: true,
            pendingList: true,
          },
        });

        if (friendInfo) {
          _socket.friends = JSON.parse(friendInfo.connectedList);
          _socket.requestFriends = JSON.parse(friendInfo.pendingList);
          const inUserId = _socket.friends.join(",");

          const rsFriends: any =
            await prisma.$queryRaw`SELECT * FROM User WHERE id IN (${inUserId})`;
          if (rsFriends) {
            for (const key in rsFriends) {
              _socket.join(rsFriends[key].email);
            }
          }
        }

        console.log("room");
        console.log(socketServer.io.sockets.adapter.rooms);

        //return data
        //친구 정보 및 디바이스 데이터를 리턴 시켜줘야 듯..??
      }
    });

    // 클라이언트로부터 위치 정보를 받는 핸들러
    _socket.on("sendLocation", async () => {
      // console.log(`새로운 위치 정보: ${data.location}`);
      // 현재 소켓이 속한 방에 있는 클라이언트들에게 위치 정보를 전송
      await prisma.deviceInfo.update({
        where: {
          userId: _socket.userId,
        },
        data: {
          longitude: 1,
          latitude: 2,
          battery: 10,
        },
      });
      _socket.broadcast.to(_socket.room).emit("updateLocation", 1);
    });

    //친구수락 핸들러
    _socket.on("setRequest", async (data) => {
      const friend = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
        select: {
          id: true,
          FriendInfo: {
            select: {
              connectedList: true,
            },
          },
        },
      });

      if (!friend) {
        console.log("not user info");
      }
      _socket.requestFriends = _socket.requestFriends.filter(
        (value: number) => {
          return value != friend?.id;
        }
      );
      if (data.answer) {
        _socket.friends.push(friend?.id);

        await prisma.friendInfo.update({
          where: { userId: _socket.userId },
          data: {
            pendingList: JSON.stringify(_socket.requestFriends),
            connectedList: JSON.stringify(_socket.friends),
          },
        });
        let tempMyFriend = friend?.FriendInfo
          ? JSON.parse(friend?.FriendInfo?.connectedList)
          : [];
        tempMyFriend.push(_socket.userId);
        if (socketServer.sockets[data.email]) {
          socketServer.sockets[data.email].friend = tempMyFriend;
        }

        await prisma.friendInfo.update({
          where: {
            userId: friend?.id,
          },
          data: {
            connectedList: JSON.stringify(tempMyFriend),
          },
        });

        //수락한 친구에게 push알림 전송 해야됨

        console.log(`방 입장: ${data.email}`);
        if (socketServer.sockets[data.email]) {
          _socket.join(data.email);
          let friendSocket = socketServer.sockets[data.email];
          friendSocket.join(_socket.userEmail);
          console.log("내방에 친구 입장");
        } else {
          console.log("존재하지안은 방입니다.");
        }
      } else {
        await prisma.friendInfo.update({
          where: { userId: _socket.userId },
          data: {
            pendingList: JSON.stringify(_socket.requestFriends),
          },
        });

        console.log("친구 거절 완료");
      }
    });

    // 친구 삭제 핸들러
    _socket.on("deleteFriend", async (data) => {
      const friend = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
        select: {
          id: true,
        },
      });
      if (friend) {
        console.log(_socket.friends);
        _socket.friends = _socket.friends.filter((value: number) => {
          return value != friend?.id;
        });
        socketServer.sockets[data.email].friends = socketServer.sockets[
          data.email
        ].friends.filter((value: number) => {
          return value != _socket.userId;
        });
        await prisma.friendInfo.update({
          where: { userId: _socket.userId },
          data: {
            connectedList: JSON.stringify(_socket.friends),
          },
        });
        await prisma.friendInfo.update({
          where: {
            userId: socketServer.sockets[data.email].userId,
          },
          data: {
            connectedList: JSON.stringify(
              socketServer.sockets[data.email].friends
            ),
          },
        });

        //mySocket leave
        console.log("친구 룸에서 퇴장");
        socketServer.sockets[data.email].leave(_socket.room);
        console.log("내룸에서 친구 퇴장");
      } else {
        console.log("not user info");
      }
    });

    // 클라이언트와의 연결이 끊어졌을 때 핸들러
    _socket.on("logOut", async () => {
      const io = SocketServer.instance.io;
      if (!_socket.userEmail) {
        console.log("not socket UserEmail");
      } else {
        await prisma.userExtra.update({
          where: {
            userId: _socket.userId,
          },
          data: {
            refreshToken: null,
          },
        });
        delete io.sockets.adapter.rooms[_socket.userEmail];
        delete socketServer.sockets[_socket.userEmail];
        _socket.disconnect();
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export default onClientConnected;
