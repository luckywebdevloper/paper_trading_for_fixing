import { storage } from "../components/storage";

import AsyncStorage from "@react-native-async-storage/async-storage";
const storeUserToken = (data) => {
  return storage.set("user_token", data);
};
const getUserToken = (data) => {
  return storage.getString("user_token");
};

const storageItems = {
  storeUserToken,
  getUserToken,
};

export default storageItems;

// Adnan's Code
export const Store_User_Token = async (data) => {
  try {
    await AsyncStorage.setItem("user_token", data);
  } catch (error) {
    console.error("Error storing user token:", error);
    // Handle the error appropriately, such as showing a user-friendly message or logging it
  }
};

export const Get_User_Token = async () => {
  try {
    const userToken = await AsyncStorage.getItem("user_token");
    return userToken;
  } catch (error) {
    console.error("Error getting user token:", error);
    // Handle the error appropriately
    return null; // or any default value based on your app's logic
  }
};
