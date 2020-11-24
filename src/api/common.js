import service from "@/utils/request";
/**
 * 列表
 */
export function TableList(params) {
  return service.request({
    url: params.url,
    method: params.method || "post",
    data: params.data,
  });
}

/**
 * 删除
 * @param {*} data
 */
export function TableDelete(params) {
  return service.request({
    url: params.url,
    method: params.method || "post",
    data: params.data,
  });
}

/**
 * 公用API
 * @param {*} params
 */
export function requestData(params) {
  return service.request({
    url: params.url,
    method: params.method || "post",
    data: params.data,
  });
}
