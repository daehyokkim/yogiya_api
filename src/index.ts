import dotenv from "dotenv";
dotenv.config();
import api from "./api/index";

import compression from "compression";
import cors from "cors";

//test_library
import swaggerUi from "swagger-ui-express";
import swaggerFile from "../doc/swagger-output.json";

import express from "express";
import session from "express-session";

import http from "http";
import SocketServer from "./socket";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //querystring 모듈을 사용하여 쿼리스트링 해석
app.use(compression());
app.use(
  cors({
    origin: ["http://yohiya.com"],
  })
);

const maxAge: number = 60 * 1000;
app.use(
  session({
    secret: "sol1357@$^",
    resave: false,
    saveUninitialized: true,
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

const newSocket = new SocketServer(server);
newSocket.connect();
