// In App.js in a new project

import React from "react";
import { Platform } from "react-native";
import { LogBox } from "react-native";
import Navigators from "./src/navigators";
import store from "./redux/store";
import { Provider } from "react-redux";
if (Platform.OS === "android") {
  // Ignore SSL certificate-related warnings
  LogBox.ignoreLogs(["Possible Unhandled Promise Rejection"]);
}
export default () => (
  <Provider store={store}>
    <Navigators />
  </Provider>
);
