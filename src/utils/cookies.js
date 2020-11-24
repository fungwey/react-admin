import cookies from "react-cookies";

/**
 * 存储token
 */
const tokenAdmin = "adminToken";
export function SETTOKEN(value) {
  cookies.save(tokenAdmin, value);
}
export function GETTOKEN() {
  console.log("从COOKIES中获取token");
  return cookies.load(tokenAdmin);
}

/**
 * 存储用户名
 */
const UserName = "username";
export function SETUSERNAME(value) {
  cookies.save(UserName, value);
}
export function GETUSERNAME() {
  console.log("从COOKIES中获取username");
  return cookies.load(UserName);
}
