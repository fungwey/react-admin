import axios from "axios";

import { message } from "antd";

// 引入公共方法
import { GETTOKEN, GETUSERNAME } from "./cookies";

// 1. 创建实例
const service = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 5000,
});

// 2. 请求拦截
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    config.headers["Token"] = GETTOKEN();
    config.headers["Username"] = GETUSERNAME();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 3. 相应拦截
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const data = response.data;
    if (data.resCode === 0) {
      return response;
    } else {
      // 全局的错误拦截
      message.info(response.data.message);
      return Promise.reject(response);
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default service;
