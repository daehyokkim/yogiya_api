import jwt from "jsonwebtoken";

//access token을 secret key 기반으로 생성
export const generateAccessToken = (email) => {
  return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

//refersh token을 secret key 기반으로 생성
export const generateRefershToken = (email) => {
  return jwt.sign({ email }, process.env.REFERSH_TOKEN_SECRET, {
    expiresIn: "180 days",
  });
};

//access token verify checking
export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

//refersh token verify checking
export const verifyrefershToken = (token) => {
  return jwt.verify(token, process.env.REFERSH_TOKEN_SECRET);
};
