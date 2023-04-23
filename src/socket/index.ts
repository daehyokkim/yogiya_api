import { Server } from "socket.io";
import http from "http";
import { CustomSocket } from "../../interface";
import { verifyAccessToken } from "../utiles/jwt";
import { NextFunction } from "express";
import onClientConnected from "./clientConnected";
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

      if (process.env.NODE_ENV !== "test") {
        this.io.use((socket: CustomSocket, next: NextFunction) => {
          const token =
            socket.handshake.headers.authorization?.split("Bearer ")[1];

          if (token) {
            const data = verifyAccessToken(token);
            if (data) {
              socket.userEmail = data.email;
              socket.userId = data.id;
              socket.authorization = true;
            } else {
              socket.authorization = false;
              console.log("accessToken 만료");
            }
          } else {
            console.log("잘못된 접근입니다.");
          }
          this.sockets[socket.id] = socket;
          next();
        });
      }

      this.io.on("connection", onClientConnected);
      this.server.listen(3000, () => {
        console.log("서버가 시작되었습니다.");
      });
    } catch (e) {
      console.log(e);
    }
  }
}
