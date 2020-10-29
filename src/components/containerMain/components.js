/**
 * 自动化工程
 * 第一个参数：目录
 * 第二个参数：是否查找子级目录
 * 第三个参数：指定查找文件
 */
// 声明组件对象
const Components = [];
// 建立上下文件关系
const files = require.context("../../views/", true, /\.js$/);
// 循环文件
files.keys().map((key) => {
  // 过滤 index login
  if (key.includes("./index/") || key.includes("./login/")) return false;
  //   分割字符串
  const splitFilesName = key.split(".");
  //   获取路径
  const path = `/index${splitFilesName[1].toLowerCase()}`;
  //   获取组件
  const component = files(key).default;
  Components.push({
    path: path,
    component: component,
  });
  return true;
});

export default Components;
