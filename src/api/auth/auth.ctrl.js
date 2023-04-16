import post__sendCode from "./post__sendcode.js";
import post__verifyCode from "./post__verifyCode.js";
import put__refreshToken from "./put_refreshToken.js";
export default {
  post: {
    sendCode: post__sendCode,
    verifyCode: post__verifyCode,
  },
  get: {},
  put: { refreshToken: put__refreshToken },
  delete: {},
  patch: {},
};
