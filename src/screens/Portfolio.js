import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Separator } from "../components";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Colors } from "../contants";
import { display } from "../utils";
import { useSelector } from "react-redux";

const Portfolio = ({ navigation }) => {
  const { userProfileData } = useSelector((state) => state.auth);
  const TodayProfitandlossAmount = 10;
  const PastProfitAndLossAmount = 330;
  function formatPercentage(value) {
    // Convert the decimal to a percentage
    const pastProfitAndLossAmount = value * 100;

    // Determine the color based on the sign of the percentage
    const color = pastProfitAndLossAmount < 0 ? "red" : "green";

    return {
      pastProfitAndLossAmount: "₹" + PastProfitAndLossAmount.toFixed(2),
      color: color,
    };
  }
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={Colors.Default_GREEN}
      />
      <Separator height={StatusBar.currentHeight} />
      <View style={styles.headerContainer}>
        {/* <Ionicons
          name="arrow-back-circle-outline"
          size={30}
          color="black"
          onPress={() => navigation.goBack()}
        /> */}
        <Text style={styles.headerText}>Portfolio</Text>
        <Entypo name="dots-three-vertical" size={20} color="black" />
      </View>
      {/* Wallet amount  */}
      <View style={styles.walletBox}>
        {/* Current Wallte fund */}
        <Text style={styles.walletAmountText}>
          ₹ {userProfileData?.data?.wallet.toFixed(2)}
        </Text>
        <Text style={styles.walletStaticText}>Available Fund</Text>
      </View>
      <View style={styles.AvailableMarginBox}>
        <View style={styles.AvailableMarginLeft}>
          {/* available Margin */}
          <Text style={styles.AvailableMarginAmountText}>
            {/* {userProfileData?.data?.wallet.toFixed(2)} */}
            200000
          </Text>
          <Text style={styles.AvailableMarginStaticText}>Available Margin</Text>
        </View>
        <View style={styles.InvestedAmountLeft}>
          {/* invested amount  */}
          <Text style={styles.InvestedAmountText}>₹9989</Text>
          <Text style={styles.InvestedAmountStaticText}>Invested Amount</Text>
        </View>
      </View>
      <View style={styles.ProftAndLossBox}>
        {/* Profit and  Loss */}
        {/* past Profit and loss  Box */}
        <View style={styles.PastProfitAndLossBox}>
          <Text style={styles.ProfitAndLossStatictext}>Past P&L</Text>
          {/* condition add if in loss show in red else green */}
          <Text
            style={{
              color: formatPercentage(PastProfitAndLossAmount).color,
              fontSize: 15,
              fontWeight: "600",
            }}
          >
            ₹{PastProfitAndLossAmount}
          </Text>
        </View>
        {/* Today Profit and loss  Box */}
        <View style={styles.PastProfitAndLossBox}>
          <Text style={styles.ProfitAndLossStatictext}>Today P&L</Text>
          {/* condition add if in loss show in red else green */}
          {TodayProfitandlossAmount ? (
            <Text
              style={{
                color: formatPercentage(TodayProfitandlossAmount).color,
                fontSize: 15,
                fontWeight: "600",
              }}
            >
              ₹{TodayProfitandlossAmount}
            </Text>
          ) : (
            <Text
              style={{
                color: Colors.Default_GREY,
                fontSize: 15,
                fontWeight: "600",
              }}
            >
              ₹00.0
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default Portfolio;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: Colors.Default_WHITE,
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 10,
    marginBottom: 10,
    // paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Inter-Black",
    lineHeight: 20 * 1.4,
    // width: display.setWidth(0),
    textAlign: "center",
  },
  walletBox: {
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: Colors.Default_GREY,
    alignItems: "center",
    gap: 7,
    paddingVertical: 30,
  },
  walletAmountText: {
    fontSize: 25,
    fontWeight: "700",
  },
  walletStaticText: {
    fontSize: 18,
    color: Colors.Default_GREY,
    marginVertical: 5,
  },
  AvailableMarginBox: {
    // gap: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  AvailableMarginLeft: {
    backgroundColor: Colors.Default_GREEN,
    width: "48%",
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: "center",
    gap: 8,
  },
  AvailableMarginAmountText: {
    fontSize: 18,
    color: Colors.Default_WHITE,
    fontWeight: "800",
  },
  AvailableMarginStaticText: {
    fontSize: 15,
    fontWeight: "400",
    color: Colors.Default_WHITE,
  },
  InvestedAmountLeft: {
    backgroundColor: Colors.TEXT_BLUE,
    width: "48%",
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: "center",
    gap: 8,
  },
  InvestedAmountText: {
    fontSize: 18,
    color: Colors.Default_WHITE,
    fontWeight: "800",
  },
  InvestedAmountStaticText: {
    fontWeight: "400",
    fontSize: 15,
    color: Colors.Default_WHITE,
  },
  ProftAndLossBox: {
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: Colors.Default_GREY,

    alignItems: "center",
    gap: 7,
    paddingVertical: 10,
  },
  PastProfitAndLossBox: {
    justifyContent: "space-between",
    // alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  ProfitAndLossStatictext: {
    fontWeight: "500",
    fontSize: 16,
  },
});
