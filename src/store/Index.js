import { createStore, combineReducers } from "redux";

// Reducer
import department from "./reducer/Department";
import job from "./reducer/Job";
import config from "./reducer/Config";
import app from "./reducer/App";

// 创建reducer对象
const allReducer = {
  department,
  job,
  config,
  app,
};

const rootReducer = combineReducers(allReducer);

const store = createStore(rootReducer);

export default store;
