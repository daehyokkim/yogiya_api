import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "1.0.0",
    title: "My API",
    description:
      "요기야 관련한 API 명세서를 작성했습니다. 부족한점이나 피드백 내용이 있으면 알려주세요~ ",
  },
  host: "localhost:3000",
  schemes: ["https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/api/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
