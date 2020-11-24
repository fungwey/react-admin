// 部门 Reducer
import { configAddDepartmentList } from "../Type";
const stateData = {
  departmentList: [],
};

const departmentReducer = function (state = stateData, action) {
  switch (action.type) {
    case configAddDepartmentList:
      return {
        ...state,
        departmentList: action.data,
      };
    default:
      return state;
  }
};

export default departmentReducer;
