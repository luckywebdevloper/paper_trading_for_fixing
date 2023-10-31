import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../contants";
import { Button } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { SELL_STOCK } from "../../redux/slice/AuthSlice";
import { Separator } from "../components";
import { display } from "../utils";
import { SUCCESS } from "../components/TOAST.MSG";

const Sell_Screen = ({ navigation, stockDetails }) => {
  const [finalPrice, setFinalPrice] = useState("");
  const dispatch = useDispatch();
  const { SellData, SellDataFailed } = useSelector((state) => state.auth);

  const [IsActive, setIsActive] = useState("Buy");
  const [IsActive_2, setIsActive_2] = useState("MKT");
  const [selectedValue, setSelectedValue] = useState("option1");
  const [checked, setChecked] = useState("first");
  const [quantity, setQuantity] = useState("1");
  const [DisClose, setDisColse] = useState("");
  const [Target, SetTarget] = useState(null);
  const [Total, setTotal] = useState("");
  const [radioButtons, setRadioButtons] = useState("INTRADAY");
  const handleRadioButtonChange = (radioButtonsArray) => {
    setRadioButtons(radioButtonsArray);
  };
  function isGreater(strNum1, strNum2) {
    const num1 = parseFloat(strNum1);
    const num2 = parseFloat(strNum2);

    if (!isNaN(num1) && !isNaN(num2)) {
      return num1 > num2;
    }

    return false;
  }
  function convertToNumber(str) {
    const num = parseFloat(str);
    return isNaN(num) ? null : num;
  }
  function formatPercentage(value) {
    const percentage = value * 100;

    const color = percentage < 0 ? "red" : "green";

    return {
      percentage: percentage.toFixed(2) + "%",
      color: color,
    };
  }
  // console.log(stockDetails, "STOCK DETAIL--------------------------------");
  function handle_Buy_Stock() {
    let data = {
      stockName: stockDetails?.info?.companyName,
      symbol: stockDetails?.metadata?.symbol,
      totalAmount: stockDetails?.priceInfo?.lastPrice,
      stockType: IsActive_2,
      type: radioButtons,
      quantity: quantity,
      targetPrice: Target,
      stockPrice: stockDetails?.priceInfo?.lastPrice,
    };

    if (IsActive_2 == "MKT") {
      let data = {
        stockName: stockDetails?.info?.companyName,
        symbol: stockDetails?.metadata?.symbol,
        totalAmount: stockDetails?.priceInfo?.lastPrice,
        stockType: IsActive_2,
        type: radioButtons,
        quantity: convertToNumber(quantity),
        targetPrice: null,
        stockPrice: stockDetails?.priceInfo?.lastPrice,
        stopPrice: null,
      };
      // console.log(data, "Sell");
      if (0 == convertToNumber(quantity) || "" == quantity) {
        Alert.alert("Quantity must be greater than 0.");
      } else {
        console.log("daat", data);
        dispatch(SELL_STOCK(data));
      }
    }

    if (IsActive_2 == "LMT") {
      const data = {
        stockName: stockDetails?.info?.companyName,
        symbol: stockDetails?.metadata?.symbol,
        totalAmount: convertToNumber(Total),
        stockType: IsActive_2,
        type: radioButtons,
        quantity: convertToNumber(quantity),
        targetPrice: null,
        stockPrice: convertToNumber(finalPrice),
        stopPrice: null,
      };

      if (0 == convertToNumber(finalPrice) || "" == finalPrice) {
        Alert.alert("Price must be greater than 0.");
      } else {
        dispatch(SELL_STOCK(data));
      }
    }

    if (IsActive_2 == "SL") {
      const data = {
        stockName: stockDetails?.info?.companyName,
        symbol: stockDetails?.metadata?.symbol,
        totalAmount: convertToNumber(Total),
        stockType: IsActive_2,
        type: radioButtons,
        quantity: convertToNumber(quantity),
        targetPrice: null,
        stockPrice: convertToNumber(finalPrice),
        stopPrice: convertToNumber(DisClose),
      };
      if (isGreater(DisClose, finalPrice)) {
        // Alert.alert("Stock Loss must be less than price.");
        SUCCESS("error", "Stock Loss must be less than price.");
      } else {
        // function call
        // console.log(data, "SL");
        dispatch(SELL_STOCK(data));
      }
    }
    if (IsActive_2 == "SL-M") {
      const data = {
        stockName: stockDetails?.info?.companyName,
        symbol: stockDetails?.metadata?.symbol,
        totalAmount: convertToNumber(Total),
        stockType: IsActive_2,
        type: radioButtons,
        quantity: convertToNumber(quantity),
        targetPrice: convertToNumber(Target),
        stockPrice: convertToNumber(finalPrice),
        stopPrice: convertToNumber(DisClose),
      };
      if (isGreater(DisClose, finalPrice)) {
        // Alert.alert("Stock Loss must be less than price.");
      } else {
        if (isGreater(finalPrice, Target)) {
          Alert.alert("Target  must be greater than price.");
        } else {
          // function call
          dispatch(SELL_STOCK(data));
        }
      }
    }

    // dispatch(BUY_STOCK(data));
  }
  useEffect(() => {
    setFinalPrice(JSON.stringify(stockDetails?.priceInfo?.lastPrice));
    setTotal(JSON.stringify(stockDetails?.priceInfo?.lastPrice));
    if (SellData?.industryInfo) {
      SUCCESS("You Sell a stock", "info");
    }
    if (SellDataFailed) {
      SUCCESS("Something went wrong", "error");
    }
  }, [SellData]);

  useEffect(() => {
    // console.log("Quantity",);
    let f = parseFloat(quantity);
    let s = parseFloat(finalPrice);
    if (!isNaN(f) && !isNaN(s)) {
      console.log(f * s);
      totalAmount = f * s;
      setTotal(JSON.stringify(totalAmount));
    } else {
      setTotal(JSON.stringify(stockDetails?.preOpenMarket?.finalPric));
    }
  }, [quantity]);

  return (
    <View style={styles.GAP_20}>
      {/* <View>
        <Text>{stockDetails?.metadata?.symbol}</Text>
      </View> */}
      <View horizontal={true} style={styles.Cnt}>
        <View style={styles.combinebtn}>
          <TouchableOpacity
            style={IsActive_2 !== "MKT" ? styles.Dis : styles.Act}
            onPress={() => {
              SetTarget(null);
              setIsActive_2("MKT");
              setFinalPrice(JSON.stringify(stockDetails?.priceInfo?.lastPrice));
              setDisColse(null);
            }}
          >
            <Text style={IsActive_2 !== "MKT" ? styles.bl : styles.wh}>
              MKT
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={IsActive_2 !== "LMT" ? styles.Dis : styles.Act}
            onPress={() => {
              setDisColse(null);
              SetTarget(null);

              setIsActive_2("LMT");
            }}
          >
            <Text style={IsActive_2 !== "LMT" ? styles.bl : styles.wh}>
              LMT
            </Text>
          </TouchableOpacity>
          {radioButtons !== "Delivery" && (
            <TouchableOpacity
              style={IsActive_2 !== "SL" ? styles.Dis : styles.Act}
              onPress={() => {
                SetTarget(null);

                setIsActive_2("SL");
              }}
            >
              <Text style={IsActive_2 !== "SL" ? styles.bl : styles.wh}>
                SL
              </Text>
            </TouchableOpacity>
          )}
          {radioButtons !== "Delivery" && (
            <TouchableOpacity
              style={IsActive_2 !== "SL-M" ? styles.Dis : styles.Act}
              onPress={() => setIsActive_2("SL-M")}
            >
              <Text style={IsActive_2 !== "SL-M" ? styles.bl : styles.wh}>
                SL-M
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View>
        <View style={styles.Slx}>
          {/* <View style={styles.Slx}>
            <Text>Delivery</Text>
            <TouchableOpacity
              style={[
                styles.radioButton,
                radioButtons === "Delivery" && styles.radioButtonSelected,
              ]}
              onPress={() => handleRadioButtonChange("Delivery")}
            ></TouchableOpacity>
          </View> */}
          <View style={styles.Slx}>
            <Text>Intraday</Text>
            <TouchableOpacity
              style={[
                styles.radioButton,
                radioButtons === "INTRADAY" && styles.radioButtonSelected,
              ]}
              onPress={() => handleRadioButtonChange("INTRADAY")}
            >
              <Text>Second Option</Text>
            </TouchableOpacity>

            {/* <Text>Selected option: {selectedOption}</Text> */}
          </View>
        </View>
      </View>
      <View style={styles.GT}>
        <View style={styles.CrdCont}>
          <View style={styles.Card}>
            <View>
              <Text style={styles.Rp}>Price</Text>
            </View>
            <View>
              {IsActive_2 == "MKT" ? (
                <Text style={styles.HD}>
                  {finalPrice == null ? "0" : finalPrice}
                </Text>
              ) : (
                <TextInput
                  style={styles.input}
                  value={finalPrice}
                  onChangeText={(text) => setFinalPrice(text)}
                  placeholder="Enter Amount"
                  keyboardType="numeric" // Adjust the keyboard type as needed
                />
              )}
            </View>
          </View>
          <View style={styles.Card}>
            <View>
              <Text style={styles.Rp}>Target Price</Text>
            </View>
            <View>
              {IsActive_2 == "SL-M" ? (
                <TextInput
                  style={styles.input}
                  value={Target}
                  onChangeText={(text) => SetTarget(text)}
                  placeholder="Enter Target"
                  keyboardType="numeric"
                />
              ) : (
                <Text style={styles.HD}>{Target == null ? "0" : Target}</Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.CrdCont}>
          <View style={styles.Card}>
            <View>
              <Text style={styles.Rp}>Quantity</Text>
            </View>
            <View>
              {/* <Text style={styles.HD}>
                  {stockDetails?.priceInfo?.lastPrice}
                </Text> */}
              <TextInput
                style={styles.input}
                value={quantity}
                onChangeText={(text) => {
                  setQuantity(text);
                }}
                placeholder="Enter Quantity"
                keyboardType="numeric" // Adjust the keyboard type as needed
              />
            </View>
          </View>
          <View style={styles.Card}>
            <View>
              <Text style={styles.Rp}>Stock Loss</Text>
            </View>
            <View>
              {IsActive_2 == "SL" || IsActive_2 == "SL-M" ? (
                <TextInput
                  style={styles.input}
                  value={DisClose}
                  onChangeText={(text) => setDisColse(text)}
                  placeholder="Amount"
                  keyboardType="numeric" // Adjust the keyboard type as needed
                />
              ) : (
                <Text style={styles.HD}>
                  {DisClose == null ? "0" : DisClose}
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.Full_Card}>
        <View>
          <Text style={styles.Rp}>Amount</Text>
        </View>
        <View>
          {/* <Text style={styles.HD}>
              {stockDetails?.priceInfo?.lastPrice}
            </Text> */}
          <TextInput
            style={styles.input}
            value={Total}
            // onChangeText={(text) => setDisColse(text)}
            placeholder="Amount"
            keyboardType="numeric" // Adjust the keyboard type as needed
          />
        </View>
      </View>

      <View>
        <TouchableOpacity style={styles.BTN} onPress={() => handle_Buy_Stock()}>
          <Text style={styles.wh}>Sell</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Sell_Screen;

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
    // width: display.setWidth(80),

    // lineHeight: 20 * 1.4,

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
  radioButton: {
    borderWidth: 3,
    borderColor: "black",
    padding: 10,
    marginBottom: 10,
    width: 8,
    height: 8,
    borderRadius: 100,
    borderColor: Colors.LIGHT_GRAY,
  },
  radioButtonSelected: {
    backgroundColor: Colors.FACEBOOK_BLUE, // Change the color as needed
  },
  CrdCont: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
  Slx: {
    flexDirection: "row",
    gap: 20,
    // alignItems: "center",
  },
  combinebtn: {
    backgroundColor: Colors.LIGHT_GRAY,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: "40px",
  },
  ViewBTN: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCED0",
    paddingVertical: "5%",
  },
  GAP_20: { gap: 20 },

  bl: {
    color: "black",
  },
  wh: {
    color: "white",
  },
  BTN_CONT: {
    flexDirection: "row",
    justifyContent: "center",
    gap: "20px",
    paddingVertical: "5%",
  },
  BTNPRESS: {
    backgroundColor: "green",
    borderRadius: "40",
    color: Colors.Default_GREEN,
  },
  GT: {
    gap: "10px",
  },
  Card: {
    padding: "3%",
    borderWidth: 1,
    borderColor: "#CCCED0",
    borderRadius: "5px",
    width: "45%",
    gap: "10px",
  },
  Full_Card: {
    padding: "3%",
    borderWidth: 1,
    borderColor: "#CCCED0",
    borderRadius: "5px",
    width: "100%",
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
    backgroundColor: Colors.Default_GREEN,
    color: "white",
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
    // backgroundColor: "white",
  },
  Cnt: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  HD: {
    fontSize: 16,
    fontWeight: 800,
    color: Colors.Default_GREY,
  },
  Rp: {
    color: "#84878C",
    fontSize: 12,
    fontWeight: "400",
  },
  RD: {
    color: Colors.Default_GREEN,
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
  // headerContainer: {
  //   display: "flex",
  //   flexDirection: "row",
  //   alignItems: "center",

  //   justifyContent: "space-between",
  //   paddingHorizontals: "5%",
  // },
  button: {
    borderRadius: 50,
    backgroundColor: Colors.Default_GREEN,
    borderWidth: 0,
    // color: "@",
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "space-between",
  },
  BTN: {
    backgroundColor: Colors.Default_GREEN,
    paddingVertical: 20,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  button_2: {
    borderRadius: 50,
    backgroundColor: Colors.Default_GREEN,
    borderWidth: 0,
    // color: "@",
  },
});
