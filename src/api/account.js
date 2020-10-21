import service from "../utils/request";

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
 * 登录接口
 */

export function GetCode(data) {
  return service.request({
    url: "/getSms/",
    method: "post",
    data,
  });
}
