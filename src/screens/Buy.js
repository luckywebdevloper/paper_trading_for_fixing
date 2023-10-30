import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../contants";
import {
  BELL_ICON,
  CHART_ICON,
  CLIP_ICON,
  UNFILL_HEART,
} from "../assets/icons/Icon";
import { Button } from "@ui-kitten/components";
import { NseIndia } from "stock-nse-india";
import StockDetails from "./StockDetails";
import { Separator } from "../components";
import { display } from "../utils";
const Buy = ({ navigation, route }) => {
  const nseIndia = new NseIndia();
  const { Symbol } = route.params;
  const [IsActive, setIsActive] = useState("Overview");
  const [stockDetails, setStockDetails] = useState({});
  const [buyQty, setBuyQty] = useState("");
  const [sellQty, setSellQty] = useState("");
  function calculatePercentage(value, total) {
    if (total === 0) {
      // Avoid division by zero
      return 0;
    }

    let percentage = (value / total) * 100;
    return percentage.toFixed(2);
  }
  const Fetch_Single_Symbol = async () => {
    try {
      //  const updatedStockDetails = [];

      //  for (let index = 0; index < watchList.length; index++) {
      //    const data = watchList[index];
      //    const details = await nseIndia.getEquityDetails(data);
      //    updatedStockDetails.push(details);
      //  }

      const details = await nseIndia.getEquityDetails(Symbol);

      setStockDetails(details);

      let Bqty = calculatePercentage(
        details?.preOpenMarket?.totalBuyQuantity,
        details?.preOpenMarket?.totalBuyQuantity +
          details?.preOpenMarket?.totalSellQuantity
      );
      let Sqty = calculatePercentage(
        details?.preOpenMarket?.totalSellQuantity,
        details?.preOpenMarket?.totalBuyQuantity +
          details?.preOpenMarket?.totalSellQuantity
      );
      setBuyQty(Bqty);
      setSellQty(Sqty);
    } catch (error) {
      console.error("Error fetching equity details:", error);
    }
  };
  useEffect(() => {
    Fetch_Single_Symbol();
  }, []);
  return (
    <ScrollView style={styles.container} key={route.params.symbol}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={Colors.Default_GREEN}
      />
      <Separator height={StatusBar.currentHeight} />

      <View style={styles.MainCont}>
        <View style={styles.headerContainer}>
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color="black"
            onPress={() => navigation.goBack()}
          />
          <View style={styles.Col}>
            <View style={styles.Flx}>
              <Text style={styles.headerText}>
                {stockDetails?.info?.companyName}
              </Text>
              {/* <Text style={styles.Rp}>StockShortForm</Text> */}
            </View>
            <View style={styles.Flx}>
              <Text style={styles.HD}>
                {stockDetails?.preOpenMarket?.finalPrice}
              </Text>
              {/* <Text style={styles.RD}>(-34322)</Text> */}
            </View>
          </View>
          <Ionicons
            name="arrow-back-circle-outline"
            size={30}
            color="black"
            style={{ opacity: 0 }}
            //   onPress={() => navigation.goBack()}
          />
        </View>
        <View style={styles.Card}>
          <View>
            <Text style={styles.Rp}>{stockDetails?.info?.companyName}</Text>
          </View>
          <View>
            <Text style={styles.HD}>
              {stockDetails?.preOpenMarket?.finalPrice}
            </Text>
          </View>
          <View>{/* <Text style={styles.RD}>Hike</Text> */}</View>
        </View>

        <ScrollView horizontal={true}>
          <View style={styles.combinebtn}>
            <TouchableOpacity
              style={IsActive !== "Overview" ? styles.Dis : styles.Act}
              onPress={() => setIsActive("Overview")}
            >
              <Text>Overview</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={IsActive !== "Fundamental" ? styles.Dis : styles.Act}
              onPress={() => setIsActive("Fundamental")}
            >
              <Text>Fundamental</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={IsActive !== "Technical" ? styles.Dis : styles.Act}
              onPress={() => setIsActive("Technical")}
            >
              <Text>Technical</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={IsActive !== "Research" ? styles.Dis : styles.Act}
              onPress={() => setIsActive("Research")}
            >
              <Text>Research</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.ViewBTN}>
          <View style={styles.singleCont}>
            <Text style={styles.Rp}>Open</Text>
            <Text style={styles.HD}>{stockDetails?.priceInfo?.open}</Text>
          </View>
          <View style={styles.singleCont}>
            <Text style={styles.Rp}>High</Text>
            <Text style={styles.HD}>
              {stockDetails?.priceInfo?.intraDayHighLow?.max}
            </Text>
          </View>
          <View style={styles.singleCont}>
            <Text style={styles.Rp}>Low</Text>
            <Text style={styles.HD}>
              {stockDetails?.priceInfo?.intraDayHighLow?.min}
            </Text>
          </View>
          <View style={styles.singleCont}>
            <Text style={styles.Rp}>Close</Text>
            <Text style={styles.HD}>{stockDetails?.priceInfo?.lowerCP}</Text>
          </View>
        </View>

        <View style={styles.ViewBTN}>
          <View style={styles.Cnt}>
            <BELL_ICON color={"#193766"} size={24} bg={"#DDE1E8"} />
            <Text>Set Alert</Text>
          </View>
          <View style={styles.Cnt}>
            <CHART_ICON color={"#193766"} size={24} bg={"#DDE1E8"} />
            <Text>Chart</Text>
          </View>

          <View style={styles.Cnt}>
            <UNFILL_HEART color={"#193766"} size={24} bg={"#DDE1E8"} />
            <Text>Watchlist</Text>
          </View>
          <View style={styles.Cnt}>
            <CLIP_ICON color={"#193766"} size={24} bg={"#DDE1E8"} />
            <Text>Option Chain</Text>
          </View>
        </View>
        <View style={styles.BTN_CONT}>
          {/* <TouchableOpacity style={styles.W_45}> */}
          {/* <Text style={styles.BTNPRESS}>Buy</Text> */}
          <Button
            onPress={() => {
              navigation.navigate("BuyStock", { stockDetails: stockDetails });
            }}
            style={styles.button}
            status="success"
          >
            Buy
          </Button>
          {/* </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.W_45}> */}
          <Button style={styles.button_2} status="success" onPress={() => ""}>
            Sell
          </Button>
          {/* </TouchableOpacity> */}
        </View>
        <View style={styles.CONT}>
          <View>
            <Text style={styles.headerText}>Market Depth</Text>
          </View>
          <View style={styles.FlxRow}>
            <Text style={styles.GR}>Last Update</Text>
            <Text style={styles.GR}>Date</Text>
          </View>
          <View style={styles.Row}>
            <View style={styles.COL}>
              <View style={styles.JustRw}>
                <Text style={styles.GR}>Order</Text>
                <Text style={styles.GR}>Qty</Text>
                <Text style={styles.GR}>Bid</Text>
              </View>
              {stockDetails?.preOpenMarket?.preopen?.map((data, index) => (
                <View style={styles.JustRw} key={index}>
                  <Text style={styles.GR}>{data?.buyQty}</Text>
                  <Text style={styles.GR}>{data?.buyQty}</Text>

                  <Text style={styles.SC}>{data?.price}</Text>
                </View>
              ))}
            </View>

            <View style={styles.COL}>
              <View style={styles.JustRw}>
                <Text style={styles.GR}>Ask</Text>
                <Text style={styles.GR}>Qty</Text>
                <Text style={styles.GR}>Bid</Text>
              </View>

              {stockDetails?.preOpenMarket?.preopen?.map((data, index) => (
                <View style={styles.JustRw} key={index}>
                  <Text style={styles.RD}>{data?.price}</Text>
                  <Text style={styles.GR}>{data?.sellQty}</Text>

                  <Text style={styles.GR}>{data?.sellQty}</Text>
                </View>
                // </View>
              ))}
            </View>
          </View>
        </View>

        <View>
          <View style={styles.JustRw}>
            <Text>Buy Order Qty</Text>
            <Text>Sell Order Qty</Text>
          </View>
          <View style={styles.JustRw}>
            <Text>{buyQty}%</Text>
            <Text>{sellQty}%</Text>
          </View>
        </View>
        <View style={styles.Progress}>
          <View
            style={{ backgroundColor: "green", width: `${buyQty}%`, height: 5 }}
          ></View>
          <View
            style={{ backgroundColor: "red", width: `${sellQty}%`, height: 5 }}
          ></View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Buy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Default_WHITE,
  },

  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontFamily: "Poppins-Regular",
    lineHeight: 20 * 1.4,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  MainCont: {
    paddingHorizontal: "5%",
    gap: "15%",
  },
  headerText: {
    fontSize: 15,
    fontFamily: "Inter-Black",

    textAlign: "center",
  },
  combinebtn: {
    backgroundColor: Colors.LIGHT_GRAY,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: "40px",
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Inter-Black",

    textAlign: "center",
  },
  ViewBTN: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCED0",
    paddingVertical: "5%",
  },
  BTN_CONT: {
    flexDirection: "row",
    justifyContent: "center",
    gap: "20px",
  },
  BTNPRESS: {
    backgroundColor: "green",
    borderRadius: "40",
    color: "red",
  },
  W_45: {
    width: "45%",
  },
  GR: {
    color: Colors.Default_GREY,
    fontSize: 14,
  },

  RD: {
    color: Colors.TEXT_RED,
    fontSize: 14,
  },
  SC: {
    color: Colors.Default_GREEN,
    fontSize: 14,
  },
  Card: {
    padding: "3%",
    borderWidth: 1,
    borderColor: "#CCCED0",
    borderRadius: "5px",
    width: "50%",
    gap: "10px",
  },
  singleCont: {
    gap: "10px",
  },
  Act: {
    borderRadius: "40px",
    padding: 8,
    fontSize: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    marginVertical: 5,
    marginHorizontal: 5,
  },
  Dis: {
    borderRadius: "40px",
    padding: 8,
    fontSize: 8,
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  Cnt: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  HD: {
    fontSize: 16,
    fontWeight: 800,
  },
  Rp: {
    color: "#84878C",
    fontSize: 12,
    fontWeight: "400",
  },
  RD: {
    color: Colors.TEXT_RED,
    fontSize: 14,
    fontWeight: "600",
  },
  Flx: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  Col: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  button: {
    borderRadius: 5,
    backgroundColor: Colors.Default_GREEN,
    width: "45%",
  },
  button_2: {
    borderRadius: 5,
    backgroundColor: Colors.TEXT_RED,
    borderWidth: 0,
    width: "45%",
  },
});
