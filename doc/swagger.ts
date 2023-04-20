import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "1.0.0",
    title: "My API",
    description:
      "요기야 관련한 API 명세서를 작성했습니다. 부족한점이나 피드백 내용이 있으면 알려주세요~ <br/> 어떻게 적어야될지 몰라서 여기다 기록할게요 ㅠㅠ <br/> JWT토큰일 발급되면 이 후 모든 AP사용시 headers에 authorization에 'Beare JWT토큰'을 함꼐 보내주기",
  },
  host: "localhost:3000",
  schemes: ["https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/api/index.ts"];

swaggerAutogen(outputFile, endpointsFiles, doc);
