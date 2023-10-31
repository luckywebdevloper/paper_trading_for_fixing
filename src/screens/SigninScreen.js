import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { Separator, ToggleButton } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Colors, Images } from "../contants";
import { display } from "../utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slice/AuthSlice";
import { Get_User_Token } from "../utils/storageItems";
export default function SigninScreen({ navigation }) {
  const [isPasswordShow, setPasswordShow] = useState(false);
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
  async function GET() {
    try {
      let Token = await Get_User_Token();
    } catch (e) {}
  }

  const checkTokenAndNavigate = async () => {
    const userToken = await Get_User_Token();

    if (userToken) {
      // Token is available, navigate to the Market Screen
      navigation.navigate("Main"); // Replace 'Market' with the name of your Market Screen
    } else {
      // Token is not available, handle other navigation logic here
      if (loginDataFailed) {
        Alert.alert("Error", loginDataFailed);
      } else if (loginData) {
        if (!loginData.data.isProfileComplete) {
          navigation.navigate("RegisterPhone");
        } else {
          navigation.navigate("Main");
        }
      }
    }
  };

  useEffect(() => {
    checkTokenAndNavigate();
    // if (loginDataFailed) {
    //   Alert.alert("Somthing went wong");
    // }
  }, [loginData, loginDataFailed, navigation]);

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
        <Text style={styles.headerText}>Sing In</Text>
      </View>
      <Text style={styles.title}>WelCome</Text>
      <Text style={styles.content}>
        Enter your usename and password, and enjoy paper trading like a real
        trading
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
            style={styles.InputText}
            value={password}
            onChangeText={(nextValue) => setPassword(nextValue)}
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
      <Text></Text>
      <View style={styles.forgetPasswordcontainer}>
        <View style={styles.toggleContainer}>
          <ToggleButton size={0.5} />
          <Text style={styles.rememberText}>Remember me </Text>
        </View>
        <Text
          onPress={() => navigation.navigate("ForgetPassword")}
          style={styles.forgetPasswordText}
        >
          Forgot Password
        </Text>
      </View>
      <TouchableOpacity
        style={styles.signinButton}
        // onPress={() => navigation.navigate("RegisterPhone")}
        onPress={() => userLogin()}
      >
        <Text style={styles.signinButtonText}>Sign</Text>
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.accountText}>Don't have an account?</Text>
        <Text
          style={styles.signupText}
          onPress={() => navigation.navigate("Signup")}
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
