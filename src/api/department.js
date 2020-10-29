import service from "../utils/request";

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
 * 部门列表
 */
export function DepartmentList(data) {
  return service.request({
    url: "/department/list/",
    method: "post",
    data,
  });
}
