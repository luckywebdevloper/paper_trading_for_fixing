import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";

import {
  Layout,
  Radio,
  Tab,
  Input,
  TabView,
  Button,
} from "@ui-kitten/components";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slice/AuthSlice";
export default function Register({ navigation }) {
  const { registerData, registerDataFailed, loading } = useSelector(
    (state) => state.auth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const dispatch = useDispatch();

  function handle_Register() {
    if (!fullName) return Alert.alert("Error", "Invalid Full Name");
    if (!email) return Alert.alert("Error", "Invalid email");
    if (!number) return Alert.alert("Error", "Invalid number");
    if (password.length < 6)
      return Alert.alert(
        "Error",
        "Secure your account with a password of at least 6 characters.."
      );
    let data = { fullName, email, password };

    if (fullName && email && (password.length > 6) & number) {
      dispatch(register(data));
    }
  }

  useEffect(() => {
    if (registerDataFailed) {
      Alert.alert("Error", registerDataFailed);
      return;
    }
    if (registerData) {
      if (!registerData.data) {
        navigation.navigate("RegisterPhone");
      } else {
        //  navigation.navigate("Profile");
      }
    }
  }, [registerData, registerDataFailed]);
  return (
    <>
      <Input
        placeholder="Enter your full name"
        size="large"
        label="Full name"
        value={fullName}
        onChangeText={(nextValue) => setFullName(nextValue)}
      />
      <Input
        placeholder="Enter your email address"
        size="large"
        label="Email address"
        value={email}
        onChangeText={(nextValue) => setEmail(nextValue)}
      />
      <Input
        placeholder="Enter Your phone number"
        size="large"
        label="Phone"
        value={number}
        onChangeText={(nextValue) => setNumber(nextValue)}
      />
      <Input
        placeholder="Enter Password"
        size="large"
        label="Password"
        value={password}
        onChangeText={(nextValue) => setPassword(nextValue)}
      />
      <Button
        style={styles.button}
        appearance="filled"
        // onPress={() => navigation.navigate("Market")}
        onPress={handle_Register}
      >
        Register
      </Button>
    </>
  );
}
const styles = StyleSheet.create({
  button: {
    margin: 2,
    width: "100%",
    borderRadius: 100,
  },
});
