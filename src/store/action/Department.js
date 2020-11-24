import { configAddDepartmentList } from "../Type";

export function addDepartmentList(params) {
  return {
    type: configAddDepartmentList,
    data: params.data,
  };
}
