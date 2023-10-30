import { FlatList } from "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Separator, ToggleButton } from "../components";
import { display } from "../utils";
import { Colors, Images } from "../contants";

import React, { useEffect, useState } from "react";
import {
  HEART_EXPO_ICON,
  HEART_EXPO_ICON_FILL,
  HEART_ICON,
} from "../assets/icons/Icon";
import { ALL_STOCKS_DATA } from "../components/Demo_Data";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import {
  ADD_STOCK_TO_WATCHLIST,
  DELETE_WATCHLIST,
} from "../../redux/slice/AuthSlice";

const Search = ({ navigation }) => {
  const [stockData, set_stockData] = useState([
    { symbol: "3IINFOLTD" },
    { symbol: "3MINDIA" },
    { symbol: "3PLAND" },
  ]);
  const { watch_ListData } = useSelector((state) => state.auth);
  const [compare, set_Compare] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (query) => {
    if (query) {
      const filteredData = ALL_STOCKS_DATA.filter(
        (stock) =>
          stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
          stock.CompanyName.toLowerCase().includes(query.toLowerCase())
      );
      set_stockData(filteredData);
    } else {
      // handle_WatchList();
      // set_stockData(["360ONE", "3IINFOLTD", "3MINDIA", "3PLAND"]);
    }

    setSearchQuery(query);
  };
  function handleHeartClick(symbol) {
    dispatch(
      ADD_STOCK_TO_WATCHLIST({
        symbol,
      })
    );
  }
  function handle_WatchList_Remove_Stock(_id) {
    dispatch(DELETE_WATCHLIST(_id));
    //  handle_WatchList();
  }

  useEffect(() => {
    if (watch_ListData && watch_ListData.data) {
      // updatedSymbol.push(watch_ListData.data.symbol);
      const arrayOfSymbols = watch_ListData?.data?.map(
        (object) => object.symbol
      );

      //  This is my flate list with Add /Remove functionality
      set_stockData(watch_ListData?.data);
      set_Compare(arrayOfSymbols);
    }
  }, [watch_ListData]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
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
          <Text style={styles.headerText}>Search </Text>
        </View>

        <View>
          <TextInput
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(text) => {
              setSearchQuery(text);
              handleSearch(text);
            }}
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              margin: 10,
              borderRadius: 5,
              paddingLeft: 10,
            }}
          />
          <FlatList
            data={stockData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  // padding: 10,
                  alignItems: "flex-start",
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
                  // paddingVertical: 10,
                  paddingHorizontal: 14,
                }}
              >
                <TouchableOpacity
                  style={styles.Touch}
                  onPress={() =>
                    navigation.navigate("Buy", { Symbol: item.symbol })
                  }
                >
                  <Text>
                    {item.CompanyName ? item.CompanyName : item?.symbol}
                  </Text>
                </TouchableOpacity>

                {compare.includes(item.symbol ? item.symbol : item) ? (
                  <TouchableOpacity
                    onPress={() => handle_WatchList_Remove_Stock(item?._id)}
                  >
                    <HEART_EXPO_ICON_FILL />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => handleHeartClick(item?.symbol)}
                  >
                    <HEART_EXPO_ICON />
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Search;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Default_WHITE,
  },

  headerContainer: {
    alignItems: "center",
    // justifyContent: "center",
    flexDirection: "row",
    // paddingVertical: 10,
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
  Touch: {
    // backgroundColor: "red",
    width: "90%",
    height: "100%",
    paddingVertical: 10,
  },
});
