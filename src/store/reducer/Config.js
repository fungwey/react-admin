import { configUpdateStatus, configAddStatus } from "../Type";

// 全局配置
const config = {
  status: [
    {
      label: "全部",
      value: "",
    },
    {
      label: "禁用",
      value: false,
    },
    {
      label: "启用",
      value: true,
    },
  ],
  aa: "aa",
  bb: "bb",
};

// Reducer
const configReducer = function (state = config, action) {
  // switch (action.type) {
  //   case configAddStatus: {
  //     return {
  //       ...state,
  //       status: [...state.status, action.payload],
  //     };
  //   }

  //   default:
  //     return state;
  // }

  if (action.type === configAddStatus) {
    const stateData = JSON.parse(JSON.stringify(state));
    stateData.status.push(action.payload);
    return stateData;
  }

  if (action.type === configUpdateStatus) {
    const stateData = JSON.parse(JSON.stringify(state));
    const data = stateData.status.filter(
      (item) => item.value === action.payload.value
    );
    data[0].label = action.payload.label;
    return stateData;
  }
  return state;
};

export default configReducer;
