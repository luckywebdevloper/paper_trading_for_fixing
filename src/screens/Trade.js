import { StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../contants";
import { TouchableOpacity } from "react-native";
import { MENU_ICON } from "../assets/icons/Icon";
import { Button, Icon, IconElement } from "@ui-kitten/components";
import { GET_API, POST_API } from "../Api/POST";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList,
} from "accordion-collapse-react-native";
import { NseIndia } from "stock-nse-india";
import { ScrollView } from "react-native-gesture-handler";
import MarketList from "../components/MarketList";
import { SUCCESS } from "../components/TOAST.MSG";
import { calculateProfitOrLoss } from "../components/Utils";
const Trade = ({ navigation }) => {
  const [IsActive, setIsActive] = useState("Position");
  const [IsActiveSub, setIsActiveSub] = useState("Pending");
  const [PendingData, setPendingData] = useState([]);
  const [ExecutedData, setExecutedData] = useState([]);
  const [ExecutedDataSymbol, setExecutedDataSymbol] = useState([]);
  const [PendingSymbol, setPendingSymbol] = useState([]);
  const [stockDetails, setStockDetails] = useState();

  const nseIndia = new NseIndia();
  const [Other, setOther] = useState([]);
  function formatPercentage(value) {
    const percentage = value * 100;

    const color = percentage < 0 ? "red" : "green";

    return {
      percentage: percentage.toFixed(2) + "%",
      color: color,
    };
  }
  async function GET_STATUS({ status, state, SymbolArray }) {
    try {
      const Respone = await GET_API(`/market/getmystocks/${status}`);
      const OnlySymbol = Respone?.data?.data?.map((item) => item.symbol) || [];
      state(Respone.data.data);
      if (SymbolArray) {
        SymbolArray(OnlySymbol);
      }
    } catch (err) {
      console.log(err, "Error");
    }
  }
  // console.log(ExecutedData, "Success");
  function convertToNumber(str) {
    const num = parseFloat(str);
    return isNaN(num) ? null : num;
  }
  async function SquareOff({ Id, qty, price }) {
    const data = {
      stockId: Id,
      totalAmount: qty,
      stockPrice: price,
    };
    // console.log(data, "API DATA");
    try {
      const respone = await POST_API("/market/squareoff", data);
      SUCCESS("Stock squared off", "info");
      navigation.navigate("Portfolio");
      // console.log(respone.data, "stock");
    } catch (err) {
      console.log(err.response, "Error");
    }
  }

  useEffect(() => {
    GET_STATUS({
      status: "executed",
      state: setExecutedData,
      SymbolArray: setExecutedDataSymbol,
    });
    GET_STATUS({
      status: "pending",
      state: setPendingData,
      SymbolArray: setPendingSymbol,
    });
    GET_STATUS({ status: "others", state: setOther });
  }, []);

  const Fetch_Single_Symbol = async () => {
    try {
      const updatedStockDetails = [];

      for (let index = 0; index < ExecutedDataSymbol.length; index++) {
        const data = ExecutedDataSymbol[index];
        const details = await nseIndia.getEquityDetails(data);
        updatedStockDetails.push(details);
      }

      setStockDetails(updatedStockDetails);
    } catch (error) {
      console.error("Error fetching equity details:", error);
    }
  };
  const Fetch_Single_Symbol_Pending = async () => {
    try {
      const updatedStockDetails = [];

      for (let index = 0; index < PendingSymbol.length; index++) {
        const data = PendingSymbol[index];
        const details = await nseIndia.getEquityDetails(data);
        updatedStockDetails.push(details);
      }

      setPendingData(updatedStockDetails);
    } catch (error) {
      console.error("Error fetching equity details:", error);
    }
  };

  console.log(PendingData, "sldjfdskljfdskl");

  useEffect(() => {
    if (ExecutedDataSymbol) {
      Fetch_Single_Symbol();
    }
  }, [ExecutedDataSymbol]);
  useEffect(() => {
    if (PendingSymbol) {
      Fetch_Single_Symbol_Pending();
    }
  }, [PendingSymbol]);

  return (
    <View className=" h-full w-ful flex  bg-white ">
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.Default_GREEN}
      />
      <View className=" p-4" style={styles.Nav}>
        <Text
          className=" text-3xl leading-loose my-2 w-1/2   text-black  font-bold"
          onPress={() => console.log("hey i malcik")}
        >
          Trade
        </Text>
        <TouchableOpacity>
          <MENU_ICON size={20} color={"black"} bg={"transparent"} />
        </TouchableOpacity>
      </View>
      <View style={styles.WID_H}>
        <View style={styles.combinebtn}>
          <TouchableOpacity
            style={IsActive !== "Position" ? styles.Dis : styles.Act}
            onPress={() => setIsActive("Position")}
          >
            <Text>Position</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={IsActive !== "Orders" ? styles.Dis : styles.Act}
            onPress={() => setIsActive("Orders")}
          >
            <Text>Orders</Text>
          </TouchableOpacity>
        </View>
        {IsActive == "Orders" && (
          <View style={styles.SubCont}>
            <TouchableOpacity
              style={IsActiveSub !== "Pending" ? styles.DisSub : styles.ActSub}
              onPress={() => setIsActiveSub("Pending")}
            >
              <Text>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={IsActiveSub !== "Executed" ? styles.DisSub : styles.ActSub}
              onPress={() => setIsActiveSub("Executed")}
            >
              <Text>Executed</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={IsActiveSub !== "Others" ? styles.DisSub : styles.ActSub}
              onPress={() => setIsActiveSub("Others")}
            >
              <Text>Others</Text>
            </TouchableOpacity>
            {/* </View> */}
          </View>
        )}
      </View>

      {IsActive == "Orders" && (
        <View>
          {IsActiveSub == "Others" &&
            Other?.map((data, index) => (
              <Collapse key={index}>
                <CollapseHeader>
                  <View>
                    <View style={styles.IndexBox}>
                      <View>
                        <Text style={styles.IndexText}>{data?.symbol}</Text>
                      </View>
                      <View style={styles.RightBox}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "600",
                          }}
                        >
                          {data?.stockPrice}
                        </Text>
                      </View>
                    </View>
                  </View>
                </CollapseHeader>
                <CollapseBody>
                  <View style={styles.InnerBox}>
                    <TouchableOpacity>
                      <Text style={styles.CSTBTN_A}>Info</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Text style={styles.CSTBTN_G}>Chart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Text style={styles.CSTBTN_R}>Squareoff</Text>
                    </TouchableOpacity>
                  </View>
                </CollapseBody>
              </Collapse>
            ))}
          {/* <MarketList watchlist={ExecutedDataSymbol} /> */}

          {IsActiveSub == "Executed" && (
            <ScrollView>
              {stockDetails?.map((StockDetail, index) => (
                <Collapse key={index}>
                  <CollapseHeader>
                    <View key={StockDetail.priceInfo.pChange}>
                      <View
                        style={styles.IndexBox}
                        key={StockDetail.priceInfo.pChange}
                      >
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
                              color: formatPercentage(
                                StockDetail.priceInfo.pChange
                              ).color,
                              fontSize: 15,
                              fontWeight: "600",
                            }}
                          >
                            {calculateProfitOrLoss(
                              ExecutedData[index]?.stockPrice,
                              StockDetail.priceInfo.lastPrice.toFixed(2)
                            )}
                            {console.log(
                              StockDetail.priceInfo.lastPrice.toFixed(2),
                              "Lst Price",
                              ExecutedData[index]?.stockPrice,
                              "Purcaase "
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    <View style={styles.InnerBox}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Buy", {
                            Symbol: StockDetail.info.symbol,
                          })
                        }
                      >
                        <Text style={styles.CSTBTN_A}>Info</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Home", {
                            Symbol: StockDetail.info.symbol,
                          })
                        }
                      >
                        <Text style={styles.CSTBTN_G}>Chart</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          SquareOff({
                            Id: ExecutedData[index]?._id,
                            qty: convertToNumber(
                              ExecutedData[index]?.quantity *
                                StockDetail?.priceInfo?.lastPrice?.toFixed(3)
                            ),
                            price:
                              StockDetail?.priceInfo?.lastPrice?.toFixed(3),
                          });
                        }}
                      >
                        <Text style={styles.CSTBTN_R}>Squareoff</Text>
                      </TouchableOpacity>
                    </View>
                  </CollapseBody>
                </Collapse>
              ))}
              {ExecutedData.length == 0 && (
                <View style={styles.CENTER}>
                  <Text style={styles.GR}>No data Available currently</Text>

                  <Button
                    style={styles.button}
                    onPress={() => navigation.navigate("Market")}
                    status="success"
                  >
                    Go to Watchlist
                  </Button>
                </View>
              )}
            </ScrollView>
          )}
          {IsActiveSub == "Pending" && (
            <ScrollView>
              {PendingData?.map((StockDetail, index) => (
                <Collapse key={index}>
                  <CollapseHeader>
                    <View key={StockDetail?.priceInfo?.pChange}>
                      <View
                        style={styles.IndexBox}
                        key={StockDetail?.priceInfo?.pChange}
                      >
                        <View>
                          <Text style={styles.IndexText}>
                            {StockDetail?.info?.symbol}
                          </Text>
                          <Text>NSE( {StockDetail?.info?.activeSeries})</Text>
                        </View>
                        <View style={styles.RightBox}>
                          <Text style={styles.RightBoxText}>
                            {StockDetail?.priceInfo?.lastPrice?.toFixed(3)}
                          </Text>
                          <Text
                            style={{
                              color: formatPercentage(
                                StockDetail?.priceInfo?.pChange
                              ).color,
                              fontSize: 15,
                              fontWeight: "600",
                            }}
                          >
                            {calculateProfitOrLoss(
                              PendingData[index]?.stockPrice,
                              StockDetail?.priceInfo?.lastPrice?.toFixed(2)
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </CollapseHeader>
                  <CollapseBody>
                    {/* <View style={styles.InnerBox}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Buy", {
                            Symbol: StockDetail.info.symbol,
                          })
                        }
                      >
                        <Text style={styles.CSTBTN_A}>Info</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("Home", {
                            Symbol: StockDetail.info.symbol,
                          })
                        }
                      >
                        <Text style={styles.CSTBTN_G}>Chart</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          SquareOff({
                            Id: ExecutedData[index]?._id,
                            qty: convertToNumber(
                              ExecutedData[index]?.quantity *
                                StockDetail?.priceInfo?.lastPrice?.toFixed(3)
                            ),
                            price:
                              StockDetail?.priceInfo?.lastPrice?.toFixed(3),
                          });
                        }}
                      >
                        <Text style={styles.CSTBTN_R}>Squareoff</Text>
                      </TouchableOpacity>
                    </View> */}
                  </CollapseBody>
                </Collapse>
              ))}
              {ExecutedData.length == 0 && (
                <View style={styles.CENTER}>
                  <Text style={styles.GR}>No data Available currently</Text>

                  <Button
                    style={styles.button}
                    onPress={() => navigation.navigate("Market")}
                    status="success"
                  >
                    Go to Watchlist
                  </Button>
                </View>
              )}
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
};

export default Trade;

const styles = StyleSheet.create({
  Nav: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  combinebtn: {
    backgroundColor: Colors.LIGHT_GRAY,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 40,
    width: "80%",
  },
  SubCont: {
    width: "70%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "stretch",
    textAlign: "center",
  },
  CSTBTN_A: {
    color: "purple",
    borderColor: "purple",
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: "purple",
    borderWidth: 1,
    borderRadius: 5,
  },
  CSTBTN_B: {
    color: Colors.FACEBOOK_BLUE,
    borderColor: Colors.FACEBOOK_BLUE,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: Colors.FACEBOOK_BLUE,
    borderWidth: 1,
    borderRadius: 5,
  },
  CSTBTN_G: {
    color: Colors.Default_GREEN,
    borderColor: Colors.Default_GREEN,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: Colors.Default_GREEN,
    borderWidth: 1,
    borderRadius: 5,
  },
  CSTBTN_R: {
    color: Colors.TEXT_RED,
    borderColor: "purple",
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: Colors.TEXT_RED,
    borderWidth: 1,
    borderRadius: 5,
  },
  ViewBTN: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCED0",
    paddingVertical: "5%",
  },
  GR: {
    color: Colors.Default_GREY,
    fontSize: 18,
  },
  BTN_CONT: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    paddingVertical: "5%",
  },
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
  InnerBox: {
    borderRadius: 15,
    marginVertical: 6,
    marginHorizontal: 15,
    gap: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    // borderColor: "#CCCED0",
    // borderStyle: "solid",
    // borderWidth: 1,
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
  BTNPRESS: {
    backgroundColor: "green",
    borderRadius: 40,
    color: "red",
  },
  Act: {
    borderRadius: 40,
    padding: 8,
    fontSize: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    marginVertical: 5,
    marginHorizontal: 5,
    width: "45%",
    alignItems: "center",
  },
  WID_H: {
    width: "100%,",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },

  Dis: {
    borderRadius: 45,
    padding: 8,
    fontSize: 8,
    marginVertical: 5,
    width: "40%",
    alignItems: "center",

    paddingHorizontal: 20,
    paddingVertical: 10,

    // backgroundColor: "white",
  },
  DisSub: {
    color: "grey",
    // borderBottomWidth: 2,
    backgroundColor: "white",
    borderColor: "black",
    padding: 10,
  },
  ActSub: {
    color: "black",
    borderBottomWidth: 2,
    backgroundColor: "white",

    borderColor: "black",
    padding: 10,
  },
  CENTER: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 20,
  },
  button: {
    borderRadius: 50,
    backgroundColor: "#16A34A",
    // color: "@",
  },
});
