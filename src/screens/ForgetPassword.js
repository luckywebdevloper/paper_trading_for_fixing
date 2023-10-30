import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Separator } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../contants";
import { display } from "../utils";

const ForgetPassword = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={Colors.Default_GREEN}
      />
      <Separator height={StatusBar.currentHeight} />

      <View style={styles.headerContainer}>
        <Ionicons
          name="arrow-back-circle-outline"
          size={30}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerText}>Forget Passwerd</Text>
      </View>
      <Text style={styles.title}>Forget Password</Text>
      <Text style={styles.content}>
        Enter your email to recover your password trading
      </Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Ionicons
            name="md-mail-open-outline"
            size={20}
            color="black"
            style={{ marginRight: 10 }}
          />
          <TextInput
            placeholder="Enter Your email"
            placeholderTextColor={Colors.Default_GREY}
            selectionColor={Colors.Default_GREY}
            style={styles.InputText}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.signinButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.signinButtonText}>Resend OTP</Text>
      </TouchableOpacity>
      <Separator height={15} />
    </View>
  );
};

export default ForgetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Default_WHITE,
  },

  headerContainer: {
    alignItems: "center",
    // justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  content: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    borderWidth: 0.5,
    borderColor: Colors.Default_GREY,
    justifyContent: "center",
  },
  inputSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  InputText: {
    fontSize: 15,
    textAlignVertical: "center",
    padding: 0,
    height: display.setHeight(6),
    color: Colors.Default_Black,
    flex: 1,
  },
  signinButton: {
    backgroundColor: Colors.Default_GREEN,
    borderRadius: 8,
    marginHorizontal: 20,
    height: display.setHeight(6),

    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signinButtonText: {
    color: Colors.Default_WHITE,
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    lineHeight: 18 * 1.4,
  },
});
