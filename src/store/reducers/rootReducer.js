import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import adminReducer from "./adminReducer";
import appReducer from "./appReducer";
import userReducer from "./userReducer";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import staffReducer from "./staffReducer"
import cusReducer from "./cusReducer"
const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
  ...persistCommonConfig,
  key: "user",
  whitelist: ["isLoggedIn", "userInfo"],
};
const staffPersistConfig = {
  ...persistCommonConfig,
  key: "staff",
  whitelist: ["isLoggedStaff", "staffInfo"],
};
const cusPersistConfig = {
  ...persistCommonConfig,
  key: "cus",
  whitelist: ["isLoggedCus", "cusInfo"],
};
const appPersistConfig = {
  ...persistCommonConfig,
  key: "app",
  whitelist: ["language"],
};

// Gộp tất cả reducer ---> state.app or state.admin//
export default (history) =>
  combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    staff: persistReducer(staffPersistConfig, staffReducer),
    cus: persistReducer(cusPersistConfig, cusReducer),
    app: persistReducer(appPersistConfig, appReducer),
    admin: adminReducer,
  });
