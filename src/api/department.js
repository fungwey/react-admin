import service from "@/utils/request";

/**
 * 新增部门
 */
export function DepartmentAdd(data) {
  return service.request({
    url: "/department/add/",
    method: "post",
    data,
  });
}

/**
 * 新增部门
 */
export function DepartmentEdit(data) {
  return service.request({
    url: "/department/edit/",
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
    url: "/department/status/",
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
    url: "/department/detailed/",
    method: "post",
    data,
  });
}
