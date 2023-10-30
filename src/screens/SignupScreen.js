import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { Separator, ToggleButton } from "../components";
import { Ionicons } from "@expo/vector-icons";

import { Entypo } from "@expo/vector-icons";
import { Colors, Images } from "../contants";
import { display } from "../utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/slice/AuthSlice";
export default function SignupScreen({ navigation }) {
  const [isPasswordShow, setPasswordShow] = useState(false);

  const { registerData, registerDataFailed, loading } = useSelector(
    (state) => state.auth
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const dispatch = useDispatch();

  function handle_Register() {
    if (!fullName) return Alert.alert("Error", "Invalid User Name");
    if (!email) return Alert.alert("Error", "Invalid email");
    if (password.length < 6)
      return Alert.alert(
        "Error",
        "Secure your account with a password of at least 6 characters.."
      );
    let data = { fullName, email, password };

    if (fullName && email && password.length > 6) {
      dispatch(register(data));
      // console.log(data);
    }
  }

  useEffect(() => {
    if (registerDataFailed) {
      Alert.alert("Error", registerDataFailed);
      return;
    }
    if (registerData) {
      if (registerData.data) {
        navigation.navigate("RegisterPhone");
      } else {
        //  navigation.navigate("Profile");
      }
    }
  }, [registerData, registerDataFailed]);
  return (
    <ScrollView style={styles.container}>
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
        <Text style={styles.headerText}>Sign Up </Text>
      </View>
      <Text style={styles.title}>Create New Account</Text>
      <Text style={styles.content}>
        Enter your email , choose a username and password trading
      </Text>
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Ionicons
            name="person-outline"
            size={20}
            color="black"
            style={{ marginRight: 10 }}
          />
          <TextInput
            placeholder="Enter Your UserName"
            placeholderTextColor={Colors.Default_GREY}
            selectionColor={Colors.Default_GREY}
            style={styles.InputText}
            value={fullName}
            onChangeText={(nextValue) => setFullName(nextValue)}
          />
        </View>
      </View>
      <Separator height={15} />
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Ionicons
            name="md-mail-open-outline"
            size={20}
            color="black"
            style={{ marginRight: 10 }}
          />
          <TextInput
            placeholder="Enter Your Email"
            placeholderTextColor={Colors.Default_GREY}
            selectionColor={Colors.Default_GREY}
            style={styles.InputText}
            value={email}
            onChangeText={(nextValue) => setEmail(nextValue)}
          />
        </View>
      </View>
      <Separator height={15} />
      <View style={styles.inputContainer}>
        <View style={styles.inputSubContainer}>
          <Ionicons
            name="ios-lock-closed-outline"
            size={20}
            color="black"
            style={{ marginRight: 10 }}
          />
          <TextInput
            secureTextEntry={isPasswordShow ? false : true}
            placeholder="Enter Your Password"
            placeholderTextColor={Colors.Default_GREY}
            selectionColor={Colors.Default_GREY}
            value={password}
            onChangeText={(nextValue) => setPassword(nextValue)}
            style={styles.InputText}
          />
          <Ionicons
            name={isPasswordShow ? "md-eye-outline" : "eye-off-outline"}
            size={20}
            color="black"
            style={{ marginRight: 10 }}
            onPress={() => setPasswordShow(!isPasswordShow)}
          />
        </View>
      </View>
      <TouchableOpacity
        style={styles.signinButton}
        // onPress={() => navigation.navigate("Profile")}
        onPress={() => handle_Register()}
      >
        <Text style={styles.signinButtonText}>Create Account</Text>
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.accountText}>Already have an account?</Text>
        <Text
          style={styles.signupText}
          onPress={() => navigation.navigate("Signin")}
        >
          Sign Up
        </Text>
      </View>
      <Text style={styles.orText}>OR</Text>
      <TouchableOpacity style={styles.googleButton}>
        <View style={styles.socialButtonsContainer}>
          <View style={styles.signinButtonLogoContainer}>
            <Image source={Images.GOOGLE_PNG} style={styles.signinButtonLogo} />
          </View>
          <Text style={styles.socialButtonsText}>Connect with Google</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.facebookButton}>
        <View style={styles.socialButtonsContainer}>
          <View style={styles.signinButtonLogoContainer}>
            <Image
              source={Images.FACEBOOK_PNG}
              style={styles.signinButtonLogo}
            />
          </View>
          <Text style={styles.socialButtonsText}>Connect with Facebook</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

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
  headerText: {
    fontSize: 20,
    fontFamily: "Inter-Black",
    lineHeight: 20 * 1.4,
    width: display.setWidth(80),
    textAlign: "center",
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
  forgetPasswordcontainer: {
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rememberText: {
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: "Poppins-Regular",
    color: Colors.Default_GREY,
  },
  forgetPasswordText: {
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 12 * 1.4,
    fontFamily: "Poppins-Regular",
    color: Colors.Default_GREEN,
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
  signupContainer: {
    marginHorizontal: 20,
    justifyContent: "center",
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  accountText: {
    color: Colors.Default_Black,
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    lineHeight: 13 * 1.4,
  },
  signupText: {
    color: Colors.Default_GREEN,
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    lineHeight: 13 * 1.4,
    marginLeft: 5,
  },
  orText: {
    color: Colors.Default_Black,
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    lineHeight: 13 * 1.4,
    marginLeft: 5,
    alignSelf: "center",
  },
  facebookButton: {
    backgroundColor: Colors.FACEBOOK_BLUE,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  googleButton: {
    backgroundColor: Colors.GOOGLE_BLUE,
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  signinButtonLogo: {
    height: 18,
    width: 18,
  },
  signinButtonLogoContainer: {
    backgroundColor: Colors.Default_WHITE,
    alignItems: "center",
    padding: 2,
    borderRadius: 3,

    position: "absolute",
    left: 25,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  socialButtonsText: {
    color: Colors.Default_WHITE,
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    lineHeight: 13 * 1.4,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
