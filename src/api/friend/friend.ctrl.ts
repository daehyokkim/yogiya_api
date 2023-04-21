import get__friendList from "./get__fiendList";
import get__requestList from "./get__requestList";
import post__request from "./post__request";
export default {
  get: {
    friendList: get__friendList,
    requestList: get__requestList,
  },
  post: { request: post__request },
  put: {},
  delete: {},
};
