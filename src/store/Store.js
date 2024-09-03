import { combineReducers } from "redux";
import baseSlice from "./slice/Base";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
// import thunk from "redux-thunk";

const reducers = combineReducers({
  base: baseSlice,
});

// const composeEnhancers =
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__();

const persistConfig = {
  key: "root",
  storage,
  whiteList: ["base"],
};

const persistedReducer = persistReducer(
  persistConfig,
  reducers
  // composeEnhancers
);

const store = configureStore({
  reducer: persistedReducer,
  // middleware: [thunk],
});

export default store;
