import { StatusBar, StyleSheet, Image, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../contants";
import { Separator, TradeHistory } from "../components";
import { Ionicons } from "@expo/vector-icons";
import { display } from "../utils";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Divider } from "@ui-kitten/components";
import { useDispatch, useSelector } from "react-redux";
import { get_Stock_History, userProfile } from "../../redux/slice/AuthSlice";
import LogoutModal from "../components/Modal.Logout";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  function handle_WatchList() {}
  const { userProfileData, userProfileDataFailed, loading, StockHistoryData } =
    useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(userProfile());
    dispatch(get_Stock_History());
  }, []);

  // console.log(userProfileData, "dslksjd");
  return (
    <View style={styles.container}>
      <LogoutModal
        handle_WatchList={handle_WatchList}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        toggleModal={toggleModal}
        navigation={navigation}
      />
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
        <Text style={styles.headerText}>Profile</Text>
        <TouchableOpacity onPress={() => toggleModal()}>
          <Entypo name="dots-three-vertical" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.ProfileContainer}>
        {/* user Profile */}
        <Image
          style={styles.ProfileImage}
          // source={require("../assets/images/Spalsh_Icon.png")}
          source={
            userProfileData?.data?.userPicture
              ? { uri: userProfileData?.data?.userPicture }
              : require("../assets/images/Spalsh_Icon.png")
          }
        />
        {/* user name */}
        <Text style={styles.ProfileName}>
          {userProfileData?.data?.fullName}
        </Text>
        <View style={styles.UserStatecontainer}>
          {/* user name */}
          <Text style={styles.ProfileName2}>
            {` ${userProfileData?.data?.fullName} Joined | ${userProfileData?.data?.joinedOn}`}
          </Text>
          {/* performance badge */}
          <View style={styles.performanceBadgeContainer}>
            <View style={styles.performanceBadge}>
              <Text style={styles.performanceBadgeText}>0.04% Performance</Text>
            </View>
            <View style={styles.performanceStateBadge}>
              <FontAwesome name="star-half-empty" size={24} color="black" />
              <Text style={styles.performanceStateText}>
                {userProfileData?.data?.profileStatus}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Divider />
      <TradeHistory
        navigation={navigation}
        StockHistoryData={StockHistoryData?.data}
        userProfileData={userProfileData}
      />
    </View>
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
  ProfileContainer: {
    justifyContent: "center",
    marginVertical: 10,
    alignItems: "center",
    gap: 10,
  },
  ProfileImage: {
    borderRadius: 200,
    // borderStyle: "solid",
    borderWidth: 2,
    borderColor: Colors.Default_GREY,
    width: 150,
    height: 150,
  },

  ProfileName: {
    fontSize: 30,
    // fontFamily: "Poppins-Regular",
    fontWeight: "900",
  },
  ProfileName2: {
    borderColor: Colors.Default_GREY,
    paddingHorizontal: 2,
    color: Colors.Default_GREY,
  },
  performanceBadgeContainer: {
    flexDirection: "row",
    gap: 10,
  },
  performanceBadge: {
    backgroundColor: Colors.Badge_BG,
    borderRadius: 30,
    paddingHorizontal: 5,

    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 160,
  },
  performanceStateBadge: {
    backgroundColor: Colors.LIGHT_BLUE,
    borderRadius: 30,
    paddingHorizontal: 5,
    flexDirection: "row",
    gap: 5,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 160,
  },
  performanceBadgeText: {
    color: Colors.TEXT_RED,
    fontWeight: "600",
  },
  performanceStateText: {
    color: Colors.TEXT_BLUE,
    fontWeight: "600",
  },
  UserStatecontainer: {
    gap: 10,

    alignItems: "center",
  },
});
