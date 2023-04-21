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
          },
        });

        if (friendInfo) {
          const userIdList = JSON.parse(friendInfo.connectedList);
          const inUserId = userIdList.join(",");

          const rsFriends: any =
            await prisma.$queryRaw`SELECT * FROM User WHERE id IN (${inUserId})`;
          console.log(rsFriends);
          if (rsFriends) {
            for (const key in rsFriends) {
              console.log(rsFriends[key].email);
              _socket.join(rsFriends[key].email);
            }
          }
        }

        console.log("room");
        console.log(socketServer.io.sockets.adapter.rooms);

        //return data
        //친구 정보 및 디바이스 데이터를 리턴 시켜줘야 됄듯..??
      }
    });

    // 클라이언트로부터 위치 정보를 받는 핸들러
    _socket.on("sendLocation", async (data) => {
      console.log(`새로운 위치 정보: ${data.location}`);
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
      _socket.broadcast.to(_socket.room).emit("updateLocation", location);
    });

    // 친구 삭제 핸들러
    _socket.on("deleteFriend", (data) => {
      //mySocket leave
      _socket.leave(socketServer.sockets[data.email]);
      console.log("퇴장");
    });
    _socket.on("room", () => {
      const io = SocketServer.instance.io;
      console.log(io.sockets.adapter.rooms);
    });
    _socket.on("roomInfo", (data) => {
      let io = SocketServer.instance.io;
      console.log(io.sockets.adapter.rooms.get(data.email));
    });

    // 클라이언트와의 연결이 끊어졌을 때 핸들러
    _socket.on("disconnect", () => {
      const io = SocketServer.instance.io;
      if (!_socket.userEmail) {
        console.log("not socket UserEmail");
      } else {
        delete io.sockets.adapter.rooms[_socket.userEmail];
        delete socketServer.sockets[_socket.userEmail];
        console.log("클라이언트 연결이 끊어졌음");
        console.log(socketServer.sockets);
        console.log(io.sockets.adapter.rooms);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

export default onClientConnected;
