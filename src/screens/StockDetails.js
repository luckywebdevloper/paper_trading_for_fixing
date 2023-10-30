import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../contants";
import { Ionicons } from "@expo/vector-icons";
import { Separator } from "../components";
import { display } from "../utils";
import { NseIndia } from "stock-nse-india";
import { TabView } from "@ui-kitten/components";
const nseIndia = new NseIndia();
const StockDetails = ({ navigation, route }) => {
  const [stockdetails, setStockdetails] = useState([]);
  nseIndia.getEquityDetails(route.params.symbol).then((details) => {
    const updatedStockDetails = [];
    updatedStockDetails.push(details);
    setStockdetails(updatedStockDetails);
    // console.log(stockdetails, "updated");
  });
  function formatPercentage(value) {
    const percentage = value * 100;

    const color = percentage < 0 ? "red" : "green";

    return {
      percentage: percentage.toFixed(2) + "%",
      color: color,
    };
  }

  return (
    <View style={styles.container} key={route.params.symbol}>
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
        <Text style={styles.headerText}>{route.params.symbol}</Text>
      </View>
      {stockdetails?.map((StockDetail) => (
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",

              justifyContent: "center",
            }}
          >
            {/* <Text>{StockDetail.info.symbol}</Text> */}
            <Text style={{ color: Colors.Default_GREY }}>
              NSE( {StockDetail.info.activeSeries})
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontFamily: "Inter-Black", fontSize: 15 }}>
              {StockDetail.priceInfo.lastPrice}
            </Text>
            <Text
              style={{
                color: formatPercentage(StockDetail.priceInfo.pChange).color,
                fontWeight: "600",
              }}
            >
              {StockDetail.priceInfo.change.toFixed(2)}(
              {StockDetail.priceInfo.pChange.toFixed(2) + "%"})
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default StockDetails;

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
    fontSize: 15,
    fontFamily: "Inter-Black",
    width: display.setWidth(80),

    lineHeight: 20 * 1.4,

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
});
