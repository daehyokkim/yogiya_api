import post__sendCode from "./post__sendcode";
import post__verifyCode from "./post__verifyCode";
import put__refreshToken from "./put_refreshToken";
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
