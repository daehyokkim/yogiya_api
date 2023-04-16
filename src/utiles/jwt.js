import jwt from "jsonwebtoken";

//access token을 secret key 기반으로 생성
export const generateAccessToken = (email) => {
  return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

//refresh token을 secret key 기반으로 생성
export const generateRefreshToken = (email) => {
  return jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "180 days",
  });
};

//access token verify checking
export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

//refresh token verify checking
export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

// JWT토큰을 디코딩해 payload부븐을 추출하는 매소드 JWT구조는
// header(알고리즘+토큰 유형).payload(클라이언트와 서버간의 주고받는 정보).signature(토큰이변조되지 않은지 판단하는 요소)
export const paresJwt = (token) => {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
};
