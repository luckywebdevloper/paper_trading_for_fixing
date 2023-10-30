import {
  StyleSheet,
  TextInput,
  Text,
  View,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { Colors, CountryCode } from "../contants";
import { display } from "../utils";
import { StatusBar } from "react-native";
import { FlagItem, Separator } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { sendOTP } from "../../redux/slice/AuthSlice";

import { StaticImageService } from "../services";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Get_User_Token } from "../utils/storageItems";

const getDropdownStyle = (y) => ({ ...styles.CountryDropdown, top: y + 60 });
const RegisterPhone = ({ navigation }) => {
  const [selectCountry, setSelectedCountry] = useState(
    CountryCode.find((country) => country.name === "India")
  );
  const dispatch = useDispatch();

  const [inputsContainerY, setinputContainerY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownLayout, setDropdownLayout] = useState({});

  const [phoneNumber, setPhoneNumber] = useState("");
  const [onlyNo, setOnlyNo] = useState("");
  const { otpData, otpDataFailed, loading } = useSelector(
    (state) => state.auth
  );
  const closeDropdown = (pageX, pageY) => {
    if (isDropdownOpen) {
      if (
        pageX < dropdownLayout?.x ||
        pageX > dropdownLayout.x + dropdownLayout?.width ||
        pageY < dropdownLayout?.y ||
        pageY > dropdownLayout?.y + dropdownLayout?.height
      ) {
        setIsDropdownOpen(false);
      }
    }
  };

  function handl_Send_OTP() {
    if (!phoneNumber)
      return Alert.alert("Error", "Phone number should be 10 digit long.");
    else {
      // console.log(onlyNo, "--------------------------------");
      dispatch(sendOTP({ phoneNumber: onlyNo }));
    }
  }

  async function login() {
    let a = await Get_User_Token();
  }
  useEffect(() => {
    console.log(otpData, otpDataFailed);
    if (otpDataFailed) Alert.alert("Error", otpDataFailed);

    if (otpData) {
      // In the sending screen
      navigation.navigate("Verification", { phoneNumber: onlyNo });
    }
  }, [otpData, otpDataFailed]);
  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={({ nativeEvent: { pageX, pageY } }) =>
        closeDropdown(pageX, pageY)
      }
    >
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
        <Text style={styles.headerText}>Register Phone </Text>
      </View>
      <Text style={styles.title}>Register Phone</Text>
      <Text style={styles.content}>Enter your Register phone number</Text>
      <View
        style={styles.InputContainer}
        onLayout={({
          nativeEvent: {
            layout: { y },
          },
        }) => setinputContainerY(y)}
      >
        <TouchableOpacity
          style={styles.contryListContainer}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Image
            source={{ uri: StaticImageService.getFlagIcon(selectCountry.code) }}
            style={styles.flagIcon}
          />
          <Text style={styles.NumberCode}>{selectCountry.dial_code}</Text>
          <Entypo name="chevron-down" size={18} color="black" />
        </TouchableOpacity>
        <View style={styles.PhoneInputContainer}>
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor={Colors.Default_GREY}
            selectionColor={Colors.Default_GREY}
            keyboardType="number-pad"
            style={styles.inputText}
            onChangeText={(text) => {
              setPhoneNumber(selectCountry.dial_code + text);

              setOnlyNo(text);
            }}
          />
        </View>
      </View>
      {isDropdownOpen && (
        <View
          style={getDropdownStyle(inputsContainerY)}
          onLayout={({
            nativeEvent: {
              layout: { x, y, height, width },
            },
          }) => setDropdownLayout({ x, y, height, width })}
        >
          <FlatList
            data={CountryCode}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <FlagItem
                {...item}
                onPress={(country) => {
                  setSelectedCountry(country);
                  setIsDropdownOpen(false);
                }}
              />
            )}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.inButton}
        // onPress={() => navigation.navigate("Verification", { phoneNumber })}
        onPress={handl_Send_OTP}
      >
        <Text style={styles.continueButtonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterPhone;

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
  InputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,

    marginVertical: 50,
  },
  contryListContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    width: display.setWidth(22),
    marginRight: 10,
    borderRadius: 8,
    alignItems: "center",
    height: display.setHeight(6),
    justifyContent: "space-evenly",
    borderWidth: 0.1,
    borderColor: Colors.Default_GREY,
    flexDirection: "row",
  },
  PhoneInputContainer: {
    backgroundColor: Colors.LIGHT_GRAY,
    paddingHorizontal: 10,
    // paddingVertical: 1,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.LIGHT_GRAY,
    justifyContent: "center",
    flex: 1,
  },
  NumberCode: {
    fontWeight: "600",
    fontSize: 17,
  },
  flagIcon: {
    height: 20,
    width: 20,
  },
  inputText: {
    fontSize: 18,
    textAlignVertical: "center",
    height: display.setHeight(6),
    color: Colors.Default_Black,
  },
  CountryDropdown: {
    backgroundColor: Colors.LIGHT_GRAY,
    position: "absolute",
    width: display.setWidth(80),
    height: display.setHeight(50),
    marginLeft: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.Default_GREY,
    zIndex: 3,
  },
  inButton: {
    backgroundColor: Colors.Default_GREEN,
    borderRadius: 8,
    marginHorizontal: 20,
    height: display.setHeight(6),

    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  continueButtonText: {
    color: Colors.Default_WHITE,
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    lineHeight: 18 * 1.4,
  },
});
