import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { Colors } from "../contants";
import {
  CHAT,
  MENU_ICON,
  UPLOAD_ICON,
  UPLOAD_RIGHT,
  WHATS_APP,
} from "../assets/icons/Icon";
import { formatDate } from "./Utils";

const TradeHistory = ({ navigation, StockHistoryData, userProfileData }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>History</Text>
      {/* Trade History */}

      <View style={styles.GAP_20}>
        {StockHistoryData?.map((data, index) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("StockDetailHistory", {
                Stock_Detail: data,
                userProfileData,
              })
            }
            style={styles.HISTOR_CARD}
            key={index}
          >
            <View style={styles.BRDCARD}>
              <View style={styles.Name}>
                <View style={styles.Start}>
                  <Image
                    style={styles.ProfileImage}
                    // source={require("../assets/images/Spalsh_Icon.png")}
                    source={
                      "userP" == "s"
                        ? { uri: userProfileData?.data?.userPicture }
                        : require("../assets/images/Spalsh_Icon.png")
                    }
                  />
                  <View>
                    <Text style={styles.Hd}>{data?.symbol}</Text>
                    <Text style={styles.Rp}>
                      {formatDate(data?.squareOffDate)}
                    </Text>
                  </View>
                </View>

                <View>
                  <MENU_ICON size={20} color={"black"} bg={"transparent"} />
                </View>
              </View>
              <View style={styles.Name}>
                <View>
                  <Text style={styles.Hd}>{data?.stockName}</Text>
                  <Text style={styles.Rp}>{`Qty:${data?.quantity}`}</Text>
                </View>
                <View>
                  <Text style={styles.GR}>{data?.stockPrice}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default TradeHistory;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    color: Colors.Default_GREY,

    fontSize: 20,
    fontWeight: "500",
    marginVertical: 20,
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
    borderBottomWidth: 1,
    borderColor: "#CCCED0",
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
