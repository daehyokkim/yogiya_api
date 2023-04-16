import dotenv from "dotenv";
dotenv.config();
import api from "./api/index.js";

import compression from "compression";
import cors from "cors";

//test_library
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../doc/swagger-output.json" assert { type: "json" };

import express from "express";
import session, { MemoryStore, Store } from "express-session";

import http from "http";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //querystring 모듈을 사용하여 쿼리스트링 해석
app.use(compression());
app.use(
  cors({
    origin: ["http://yohiya.com"],
  })
);

const maxAge = 60 * 1000;
app.use(
  session({
    secret: "sol1357@$^",
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({ checkPeriod: maxAge }),
    cookie: {
      maxAge: maxAge,
    },
  })
);
var options = {
  explorer: true,
};
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile, options));

app.use("/api", api);

const server = http.createServer(app);
const io = new Server(server, {
  path: "/yogiya",
});

io.on("connection", (socket) => {
  console.log("new connect");
  console.log(socket.id);
  // 클라이언트로부터 위치 정보를 받는 핸들러
  socket.on("sendLocation", (location) => {
    console.log(`새로운 위치 정보: ${location}`);

    // 현재 소켓이 속한 방에 있는 클라이언트들에게 위치 정보를 전송
    socket.broadcast.to(socket.room).emit("updateLocation", location);
  });

  // 방 입장 핸들러
  socket.on("joinRoom", (room) => {
    console.log(`방 입장: ${room}`);
    socket.room = room;
    socket.join(room);
    console.log(room);
    console.log(socket.room);
  });

  // 방 퇴장 핸들러
  socket.on("leaveRoom", () => {
    console.log(`방 퇴장: ${socket.room}`);
    socket.leave(socket.room);
  });

  // 클라이언트와의 연결이 끊어졌을 때 핸들러
  socket.on("disconnect", () => {
    console.log("클라이언트 연결이 끊어졌음");
  });
});

server.listen(3000, () => {
  console.log("서버가 시작되었습니다.");
});
