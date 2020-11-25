import { setUsernameKey, setTokenKey } from "../Type";
// 方法
import { GETTOKEN, GETUSERNAME } from "../../utils/cookies";

// 全局配置
const app = {
  token: "" || GETTOKEN(),
  username: "" || GETUSERNAME,
};

// Reducer
const configReducer = function (state = app, action) {
  switch (action.type) {
    case setTokenKey:
      return {
        ...state,
        token: action.value,
      };

    case setUsernameKey:
      return {
        ...state,
        username: action.value,
      };

    default:
      return state;
  }
};

export default configReducer;
