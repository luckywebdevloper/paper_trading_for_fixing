import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import { StaticImageService } from "../services";
import { useEffect } from "react";
import { NseIndia } from "stock-nse-india";
import { Colors } from "../contants";
const nseIndia = new NseIndia();
export default function MarketList({ watchList, navigation }) {
  const [stockDetails, setStockDetails] = useState();

  const fluctuatePrice = () => {
    // Make sure stockDetails exists and has the required structure
    if (stockDetails && stockDetails.length > 0 && stockDetails[0].priceInfo) {
      const randomChange = Math.floor(Math.random() * 9) + 1;
      const updatedStockDetails = stockDetails.map((detail) => ({
        ...detail,
        priceInfo: {
          ...detail.priceInfo,
          lastPrice: (
            parseFloat(detail.priceInfo.lastPrice) + randomChange
          ).toFixed(3),
        },
      }));
      setStockDetails(updatedStockDetails);
    }
  };

  const Fetch_Single_Symbol = async () => {
    try {
      const updatedStockDetails = [];

      for (let index = 0; index < watchList.length; index++) {
        const data = watchList[index];
        const details = await nseIndia.getEquityDetails(data);
        updatedStockDetails.push(details);
      }

      // console.log(updatedStockDetails);
      setStockDetails(updatedStockDetails);
      // setInterval(fluctuatePrice, 10000);
    } catch (error) {
      console.error("Error fetching equity details:", error);
    }
  };

  // useEffect(() => {
  //   const intervalId = setInterval(fluctuatePrice, 10000); // Run fluctuatePrice every 10 seconds

  //   return () => clearInterval(intervalId);
  // }, [stockDetails]);
  useEffect(() => {
    if (watchList) {
      Fetch_Single_Symbol();
    }
  }, [watchList]);

  function formatPercentage(value) {
    const percentage = value * 100;

    const color = percentage < 0 ? "red" : "green";

    return {
      percentage: percentage.toFixed(2) + "%",
      color: color,
    };
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.main}>
        <View>
          {stockDetails?.map((StockDetail) => (
            <TouchableOpacity
              key={StockDetail.priceInfo.pChange}
              onPress={
                () =>
                  navigation.navigate("Buy", {
                    Symbol: StockDetail.info.symbol,
                  })
                // navigation.navigate("Stockdetails", {
                //   symbol: StockDetail.info.symbol,
                // })

                // navigation("Stockdetails", {
                //   symbol: StockDetail.info.symbol,
                // })
              }
            >
              <View style={styles.IndexBox} key={StockDetail.priceInfo.pChange}>
                <View>
                  <Text
                    style={styles.IndexText}
                    key={StockDetail.priceInfo.pChange}
                  >
                    {StockDetail.info.symbol}
                  </Text>
                  <Text>NSE( {StockDetail.info.activeSeries})</Text>
                </View>
                <View style={styles.RightBox}>
                  <Text style={styles.RightBoxText}>
                    {StockDetail?.priceInfo?.lastPrice?.toFixed(3)}
                  </Text>
                  <Text
                    style={{
                      color: formatPercentage(StockDetail.priceInfo.pChange)
                        .color,
                      fontSize: 15,
                      fontWeight: "600",
                    }}
                  >
                    {" "}
                    {StockDetail.priceInfo.change.toFixed(2)}(
                    {StockDetail.priceInfo.pChange.toFixed(2) + "%"})
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  IndexBox: {
    borderRadius: 15,
    marginVertical: 6,
    marginHorizontal: 15,
    gap: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderColor: "#CCCED0",
    borderStyle: "solid",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  name: {
    width: 100,
  },
  IndexText: {
    fontSize: 17,
    fontWeight: "500",
  },
  IndexText2: {
    fontSize: 18,
    color: "gray",
  },
  RightBoxText: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.Default_Black,
  },
  RightBox: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
