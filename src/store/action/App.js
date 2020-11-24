import { setUsernameKey, setTokenKey } from "../Type";

// 方法
import { SETTOKEN, SETUSERNAME } from "../../utils/cookies";
export function setTokenAction(data) {
  console.log("setTokenAction", data);
  SETTOKEN(data);
  return {
    type: setTokenKey,
    value: data,
  };
}
export function setUsernameAction(data) {
  console.log("setUsernameAction", data);
  SETUSERNAME(data);
  return {
    type: setUsernameKey,
    value: data,
  };
}
