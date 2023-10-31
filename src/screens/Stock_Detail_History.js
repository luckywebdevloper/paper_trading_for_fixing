import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Separator } from "../components";
import { StatusBar } from "react-native-web";
import { Ionicons } from "@expo/vector-icons";
import { display } from "../utils";
import { Colors } from "../contants";
import { MENU_ICON } from "../assets/icons/Icon";
import { formatDate } from "../components/Utils";

const Stock_Detail_History = ({ navigation, route }) => {
  const { Stock_Detail, userProfileData } = route.params;
  console.log(Stock_Detail, "History");
  const data = [];
  return (
    <View>
      <View style={styles.container}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={Colors.Default_GREEN}
        />
        <Separator height={StatusBar.currentHeight} />
        <View style={styles.GAP_20}>
          <View style={styles.headerContainer}>
            <Ionicons
              name="arrow-back-circle-outline"
              size={30}
              color="black"
              onPress={() => navigation.goBack()}
            />
          </View>
          <View style={styles.MainCont}>
            <View style={styles.Name}>
              <View style={styles.Start}>
                <Image
                  style={styles.ProfileImage}
                  // source={require("../assets/images/Spalsh_Icon.png")}
                  source={
                    userProfileData?.data?.userPicture
                      ? { uri: userProfileData?.data?.userPicture }
                      : require("../assets/images/Spalsh_Icon.png")
                  }
                />
                <View>
                  <Text style={styles.Hd}>
                    {userProfileData?.data?.fullName}
                  </Text>
                  <Text style={styles.Rp}>Reputation</Text>
                </View>
              </View>

              <View>
                <MENU_ICON size={20} color={"black"} bg={"transparent"} />
              </View>
            </View>
          </View>
          <View style={styles.DetailCont}>
            <View style={styles.Row}>
              <Text style={styles.title}>Type</Text>
              <Text style={styles.TBL}>{Stock_Detail?.status}</Text>
            </View>
            <View style={styles.Row}>
              <Text style={styles.title}>Instrument</Text>
              <Text style={styles.TBL}>{Stock_Detail?.stockName}</Text>
            </View>
            <View style={styles.Row}>
              <Text style={styles.title}>Entry Price</Text>
              <Text style={styles.TBL}></Text>
            </View>
            <View style={styles.Row}>
              <Text style={styles.title}>Price@Trade</Text>
              <Text style={styles.TBL}>{Stock_Detail?.stockPrice}</Text>
            </View>
            <View style={styles.Row}>
              <Text style={styles.title}>Target Price</Text>
              <Text style={styles.TBL}>{Stock_Detail?.targetPrice}</Text>
            </View>
            <View style={styles.Row}>
              <Text style={styles.title}>Stop Loss</Text>
              <Text style={styles.TBL}>{Stock_Detail?.stopLoss}</Text>
            </View>
            <View style={styles.Row}>
              <Text style={styles.title}>Valid Till</Text>
              <Text style={styles.TBL}>
                {formatDate(Stock_Detail?.squareOffDate)}
              </Text>
            </View>
            <View style={styles.Row}>
              <Text style={styles.title}>Margin</Text>
              <Text style={styles.TBL}>
                {Stock_Detail?.netProfitAndLoss.toFixed(2)} for{" "}
                {Stock_Detail?.quantity}
              </Text>
            </View>
            <View style={styles.BrUpDown}>
              <View style={styles.Row}>
                <Text style={styles.title}>Status</Text>
                <Text style={styles.TBL}>
                  {Stock_Detail?.executed ? "Expired" : ""}
                </Text>
              </View>
              <View style={styles.Row}>
                <Text style={styles.title}>Net P&L</Text>
                <Text style={styles.TBL}>
                  {Stock_Detail?.netProfitAndLoss.toFixed(2)}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.BlTxt}>#{Stock_Detail?.stockName}</Text>
            </View>
          </View>
          <View style={styles.LCont}>
            <View>
              <Text style={styles.title}>
                {formatDate(Stock_Detail?.squareOffDate)}
              </Text>
            </View>
            <View>
              <Text style={styles.title}>
                {Stock_Detail?.stockName} Price when Posted:
              </Text>
            </View>
            <View>
              <Text style={styles.BlTxt}>{Stock_Detail?.stockPrice}</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Stock_Detail_History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
  },

  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  MainCont: {
    paddingHorizontal: "3%",
    gap: "8%",
    borderWidth: 1,
    borderColor: "#CCCED0",
    borderRadius: 10,
  },
  LCont: {
    paddingHorizontal: "3%",
    paddingVertical: 20,
    gap: 8,

    borderWidth: 1,
    borderColor: "#CCCED0",
    borderRadius: 10,
  },
  DetailCont: {
    paddingHorizontal: "3%",
    gap: "15%",
    borderWidth: 1,
    borderColor: "#CCCED0",
    borderRadius: 10,
    paddingVertical: "4%",
  },
  FlxRow: {
    justifyContent: "flex-start",
    gap: 20,
    flexDirection: "row",
  },
  JustRow: {
    justifyContent: "space-between",
    gap: 20,
    flexDirection: "row",
    width: "45%",
  },
  BlTxt: {
    color: Colors.TEXT_BLUE,
    fontWeight: 800,
    fontSize: 18,
  },
  COL: {
    width: "45%",
    gap: 20,
  },
  JustRw: {
    justifyContent: "space-between",
    gap: 20,
    flexDirection: "row",
  },
  CONT: {
    gap: 15,
  },
  Row: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  Progress: {
    flexDirection: "row",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 25,
  },
  headerText: {
    fontSize: 8,
    fontFamily: "Inter-Black",
    width: display.setWidth(80),

    lineHeight: 20 * 1.4,

    textAlign: "center",
  },
  BrUpDown: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.Default_GREY,
    paddingVertical: 10,
    gap: 20,
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  // title: {
  //   fontSize: 20,
  //   fontFamily: "Poppins-Regular",
  //   lineHeight: 20 * 1.4,
  //   marginTop: 50,
  //   marginBottom: 10,
  //   marginHorizontal: 20,
  // },
  container: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    color: Colors.Default_GREY,

    fontSize: 15,
    fontWeight: "500",
  },
  TBL: {
    color: Colors.Default_Black,

    fontSize: 15,
    fontWeight: "500",
  },
  ProfileImage: {
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: Colors.Default_GREY,
    width: 50,
    height: 50,
  },
  Name: {
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    flexDirection: "row",
    // marginHorizontal: "5%",
    paddingVertical: 20,
    alignItems: "center",
  },
  Icon_Cont: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  GR: {
    color: Colors.Default_GREEN,
    fontSize: 14,
    fontWeight: "600",
  },

  GAP_20: {
    gap: 20,
  },
  Start: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: "20px",
    alignItems: "center",
  },
  HISTOR_CARD: {
    // display: "flex",
    // borderWidth: 1,
    // borderColor: "#CCCED0",
  },
  Rp: {
    color: "#84878C",
    fontSize: 12,
    fontWeight: "400",
  },
  Hd: {
    fontSize: 14,
    fontWeight: "600",
  },
  BRDCARD: {
    borderWidth: 1,
    borderColor: "#CCCED0",
    paddingBottom: 50,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
