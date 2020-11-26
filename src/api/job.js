import service from "@/utils/request";

/**
 * 新增职位
 */
export function JobAdd(data) {
  return service.request({
    url: "/job/add/",
    method: "post",
    data,
  });
}

/**
 * 新增职位
 */
export function JobEdit(data) {
  return service.request({
    url: "/job/edit/",
    method: "post",
    data,
  });
}

/**
 * 禁启用
 * @param {*} data
 */
export function Status(data) {
  return service.request({
    url: "/job/status/",
    method: "post",
    data,
  });
}

/**
 * 详情
 * @param {*} data
 */
export function Detail(data) {
  return service.request({
    url: "/job/detailed/",
    method: "post",
    data,
  });
}
