import dotenv from "dotenv";
dotenv.config();
import api from "./api/index.js";

import compression from "compression";
import cors from "cors";

//test_library
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./doc_v1.json" assert { type: "json" };

import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false })); //querystring 모듈을 사용하여 쿼리스트링 해석
app.use(compression());
app.use(
  cors({
    origin: ["http://yohiya.com"],
  })
);

if (process.env.NODE_ENV == "test")
  app.use("/doc", swaggerUi.server, swaggerUi.setup(swaggerFile));

app.use("/api", api);

const port = 3000;
app.listen(port, "0.0.0.0", () => {
  console.log("yogiya test api server");
});
