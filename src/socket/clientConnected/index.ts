import { CustomSocket } from "interface";
import SocketServer from "../../socket";
import prisma from "../../prisma";
// import onLogIn from "./onLogIn";
import Utils from "../../utiles/utile";

const onClientConnected = (_socket: CustomSocket) => {
  try {
    let socketServer = SocketServer.instance;

    if (!_socket.authorization) {
      _socket.disconnect();
    }

    _socket.on("login", async () => {
      let sendData = Utils.netMessage(false, "");
      if (!_socket.userEmail) {
        sendData.error = true;
        sendData.message = "잘못된 접근입니다.";
      } else {
        let rsfriendInfo: any = [];
        _socket.room = _socket.userEmail;
        socketServer.sockets[_socket.userEmail] = _socket;
        _socket.join(_socket.userEmail);

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

          rsfriendInfo = await prisma.$queryRaw`
          SELECT u.email as email, u.nickName , d.latitude, d.longitude, d.battery,d.speed , p.filePath  FROM User as u INNER JOIN DeviceInfo as d ON u.id = d.userId JOIN Profile as p ON u.id = p.userId WHERE u.id IN (${inUserId}) ;`;

          if (rsfriendInfo) {
            for (const key in rsfriendInfo) {
              _socket.join(rsfriendInfo[key].email);
            }
          }
        }
        sendData.data = {
          friendList: rsfriendInfo,
        };
        //친구 정보 및 디바이스 데이터를 리턴 시켜줘야 듯..??
      }
      _socket.emit("login", sendData);
    });

    // 클라이언트로부터 위치 정보를 받는 핸들러
    _socket.on("sendLocation", async (data) => {
      let sendData = Utils.netMessage(false, "");
      // console.log(`새로운 위치 정보: ${data.location}`);
      // 현재 소켓이 속한 방에 있는 클라이언트들에게 위치 정보를 전송

      if (!data.longitude || !data.latitude || !data.battery || !data.speed) {
        sendData.error = true;
        sendData.message = "잘못된 접근입니다.";
      } else {
        await prisma.deviceInfo.update({
          where: {
            userId: _socket.userId,
          },
          data: {
            longitude: data.longitude,
            latitude: data.latitude,
            battery: data.battery,
            speed: data.speed,
          },
        });
        data.email = _socket.userEmail;
        _socket.broadcast.to(_socket.room).emit("updateLocation", data);
      }
      _socket.emit("sendLocation", sendData);
    });

    //친구수락 핸들러
    _socket.on("setRequest", async (data) => {
      let sendData = Utils.netMessage(false, "");
      if (!data.email) {
        sendData.error = true;
        sendData.message = "잘못된 접근입니다.";
      } else {
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
          sendData.error = true;
          sendData.message = "존재하지 않는유저입니다.";
        } else {
          if (_socket.requestFriends.indexOf(friend.id) === -1) {
            sendData.error = true;
            sendData.message = "존재하지 않는유저입니다.";
          } else {
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

              if (socketServer.sockets[data.email]) {
                _socket.join(data.email);
                let friendSocket = socketServer.sockets[data.email];
                friendSocket.join(_socket.userEmail);
              }
              const rsfriendInfo = await prisma.$queryRaw`
              SELECT u.email as email, u.nickName , d.latitude, d.longitude, d.battery,d.speed , p.filePath  FROM User as u INNER JOIN DeviceInfo as d ON u.id = d.userId JOIN Profile as p ON u.id = p.userId WHERE u.id = ${friend.id} ;`;

              sendData.data = rsfriendInfo;
            } else {
              await prisma.friendInfo.update({
                where: { userId: _socket.userId },
                data: {
                  pendingList: JSON.stringify(_socket.requestFriends),
                },
              });
            }
          }
        }
      }
      _socket.emit("setRequest", sendData);
    });

    // 친구 삭제 핸들러
    _socket.on("deleteFriend", async (data) => {
      let sendData = Utils.netMessage(false, "");
      if (!data.email) {
        sendData.error = true;
        sendData.message = "잘못된 접근입니다";
      } else {
        const friend = await prisma.user.findUnique({
          where: {
            email: data.email,
          },
          select: {
            id: true,
          },
        });
        if (friend) {
          _socket.friends = _socket.friends.filter((value: number) => {
            return value != friend?.id;
          });

          let deleteFriend = socketServer.sockets[data.email];
          deleteFriend.friends = socketServer.sockets[
            data.email
          ].friends.filter((value: number) => {
            return value != _socket.userId;
          });

          //내정보에서 친구삭제
          await prisma.friendInfo.update({
            where: { userId: _socket.userId },
            data: {
              connectedList: JSON.stringify(_socket.friends),
            },
          });
          //친구정보에서 나삭제
          await prisma.friendInfo.update({
            where: {
              userId: deleteFriend.userId,
            },
            data: {
              connectedList: JSON.stringify(deleteFriend.friends),
            },
          });
          //친구룸에서 퇴장
          _socket.leave(deleteFriend.room);
          //내룸에서 퇴장
          deleteFriend.leave(_socket.room);
        } else {
          sendData.error = true;
          sendData.message = "잘못된 접근입니다";
        }
      }
      _socket.emit("deleteFriend", sendData);
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
