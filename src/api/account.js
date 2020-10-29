import service from "../utils/request";

/**
 * 获取验证码
 */
export function GetCode(data) {
  return service.request({
    url: "/getSms/",
    method: "post",
    data,
  });
}
/**
 * 登录接口
 */
export function Login(data) {
  return service.request({
    url: "/login/",
    method: "post",
    data,
  });
}

/**
 * 注册
 */
export function Register(data) {
  return service.request({
    url: "/register/",
    method: "post",
    data,
  });
}
