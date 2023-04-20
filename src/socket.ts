import { NextFunction } from "express";
import { Server } from "socket.io";
import http from "http";
import { CustomSocket } from "../interface";

export default class SocketServer {
  io: any;
  static instance: any;
  server: http.Server;
  sockets: any = {};

  constructor(_server: any) {
    this.io = null;
    this.server = _server;
  }

  connect() {
    try {
      if (SocketServer.instance) {
        return SocketServer.instance;
      }
      SocketServer.instance = this;

      this.io = new Server(this.server, {
        path: "/yogiya",
      });
      this.io.use((socket: CustomSocket, next: NextFunction) => {
        console.log(socket.handshake);
        const token = socket.handshake.headers.authorization;

        if (token) {
          // console.log(socket);
          // socket.jwt = token;
          // console.log(socket.jwt);
        }
        next();
      });

      this.io.on("connection", this.onClientConnected);

      this.server.listen(3000, () => {
        console.log("서버가 시작되었습니다.");
      });
    } catch (e) {
      console.log(e);
    }
  }

  onClientConnected(_socket: CustomSocket) {
    try {
      console.log(_socket.id);
      // console.log(_socket);
      // 클라이언트로부터 위치 정보를 받는 핸들러
      _socket.on("sendLocation", (data) => {
        console.log(`새로운 위치 정보: ${data.location}`);
        // 현재 소켓이 속한 방에 있는 클라이언트들에게 위치 정보를 전송
        console.log(_socket.room);
        _socket.broadcast.to(_socket.room).emit("updateLocation", location);
      });
      //프로필 변경
      _socket.on("uploadProfile", (formData) => {
        console.log(`새로운 프로필 URL ${formData}`);
        console.log("저장완료");
        _socket.broadcast.to(_socket.room).emit("updateProfile", "URL");
      });

      //친구수락 핸들러
      _socket.on("joinRoom", (data) => {
        console.log(`방 입장: ${data.email}`);
        if (this.sockets[data.email]) {
          _socket.join(this.sockets[data.email]);
        } else {
          console.log("존재하지안은 방입니다.");
        }
      });

      //로그인시 사용자 위치를 전송할 룸 만들기
      _socket.on("myRoom", (data) => {
        if (_socket.userEmail && !this.sockets[_socket.userEmail]) {
          _socket.userEmail = data.email;
          _socket.room = _socket.id;

          this.sockets[data.email] = _socket.id;

          _socket.join(_socket.id);
          console.log(_socket.userEmail);
          console.log("내방 생성!");
        } else {
          console.log("이미 존재하는 방입니다.");
        }
      });

      // 방 퇴장 핸들러
      _socket.on("leaveRoom", (data) => {
        _socket.leave(this.sockets[data.email]);
        console.log("퇴장");
      });

      // 클라이언트와의 연결이 끊어졌을 때 핸들러
      _socket.on("disconnect", () => {
        const io = SocketServer.instance.io;
        if (!_socket.userEmail) {
          console.log("not socket UserEmail");
        } else {
          delete io.sockets.adapter.rooms[_socket.userEmail];
          delete this.sockets[_socket.userEmail];
          console.log("클라이언트 연결이 끊어졌음");
          console.log(this.sockets);
          console.log(io.sockets.adapter.rooms);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}
