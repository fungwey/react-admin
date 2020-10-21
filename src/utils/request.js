import axios from "axios";

// 1. 创建实例
const service = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 5000,
});

// 2. 请求拦截
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
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
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default service;
