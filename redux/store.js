import { configureStore } from "@reduxjs/toolkit";
import stockDataReducer from "./slice/stockDataSlice";
import AuthSlice from "./slice/AuthSlice";

const store = configureStore({
  reducer: {
    stockData: stockDataReducer,
    auth: AuthSlice,
  },
});

export default store;
