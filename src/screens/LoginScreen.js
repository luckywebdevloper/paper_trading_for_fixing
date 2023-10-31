import { View, Text, Alert } from "react-native";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Layout,
  Radio,
  Tab,
  Input,
  TabView,
  Button,
} from "@ui-kitten/components";
import { Register } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slice/AuthSlice";
import storageItems, {
  Get_User_Token,
  Store_User_Token,
} from "../utils/storageItems";

export default function LoginScreen({ navigation }) {
  const { loginData, loginDataFailed, loading } = useSelector(
    (state) => state.auth
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const shouldLoadComponent = (index) => index === selectedIndex;
  const dispatch = useDispatch();

  const userLogin = () => {
    let data = {
      email: email,
      password: password,
    };
    if (!email) return Alert.alert("Error", "Invalid email");
    if (!password) return Alert.alert("Error", "Invalid Password");
    if (email && password) {
      dispatch(login(data));
    }
    // let a = storageItems.getUserToken();
    // console.log(a);
  };

  useEffect(() => {
    console.log(loginData, loginDataFailed, "data,failed");
    if (loginDataFailed) {
      Alert.alert("Error", loginDataFailed);
      return;
    }
    if (loginData) {
      if (!loginData.data.isProfileComplete) {
        navigation.navigate("RegisterPhone");
      } else {
        navigation.navigate("Profile");
      }
    }
  }, [loginData, loginDataFailed]);

  return (
    <View className=" h-full w-full bg-black flex  ">
      <StatusBar style=" light" />
      <View className=" h-1/4 mt-11 p-4">
        <Text className=" text-4xl leading-loose my-2  text-white  font-bold">
          Hi, Welcome to the Stockology
        </Text>
        <Text className=" text-xs text-gray-200 ">
          Lorem ipsum dolor sit amet consectetur. Quis platea id amet sit ornare
        </Text>
      </View>
      <View className=" bg-white p-4 h-full rounded-t-xl ">
        <TabView
          selectedIndex={selectedIndex}
          shouldLoadComponent={shouldLoadComponent}
          onSelect={(index) => setSelectedIndex(index)}
        >
          <Tab title="Login">
            <Layout style={styles.tabContainer}>
              <Input
                placeholder="Enter your email address"
                size="large"
                label="Email address"
                value={email}
                onChangeText={(nextValue) => setEmail(nextValue)}
              />
              <Input
                placeholder="Enter Password"
                size="large"
                label="Password"
                value={password}
                onChangeText={(nextValue) => setPassword(nextValue)}
              />

              <View className="flex flex-row justify-between">
                <Radio
                  checked={checked}
                  onChange={(nextChecked) => setChecked(nextChecked)}
                  style={{ width: "60%" }}
                >
                  Remember me
                </Radio>
                <Text className="text-green-500">Forget Password</Text>
              </View>
              <Button
                style={styles.button}
                appearance="filled"
                onPress={userLogin}
              >
                Login
              </Button>
            </Layout>
          </Tab>
          <Tab title="Register">
            <Layout style={styles.tabContainer}>
              <Register navigation={navigation} />
            </Layout>
          </Tab>
        </TabView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  tabContainer: {
    height: "85%",
    display: "flex",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 2,
    width: "100%",
    borderRadius: 100,
  },
});
