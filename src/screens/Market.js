import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../contants";
import { Button, Icon, IconElement } from "@ui-kitten/components";
import { MarketList } from "../components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Get_User_Token } from "../utils/storageItems";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_STOCK_TO_WATCHLIST,
  DELETE_WATCHLIST,
  userProfile,
  watch_List,
} from "../../redux/slice/AuthSlice";
import ModalTester from "../components/Slider";
import { FlatList } from "react-native-gesture-handler";
import {
  HEART_EXPO_ICON,
  HEART_EXPO_ICON_FILL,
  HEART_ICON,
} from "../assets/icons/Icon";
import { ALL_STOCKS_DATA } from "../components/Demo_Data";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Market({ navigation }) {
  const dispatch = useDispatch();
  const {
    watch_List_Added,
    watch_List_AddedFailed,
    loading,
    watch_ListData,
    watch_ListFailed,
    Delete_WatchList_Data,
  } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [Active_Watch, Set_Active_Watch] = useState(1);
  const [stock_Symbol, set_Stock_Stymbol] = useState([]);
  const [compare, set_Compare] = useState([]);
  const [stockData, set_stockData] = useState([
    { symbol: "3IINFOLTD" },
    { symbol: "3MINDIA" },
    { symbol: "3PLAND" },
  ]);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [stockDetails, setStockDetails] = useState();
  //  console.log(watchList, "dfdssdfdsfds");

  const Fetch_Single_Symbol = async (watchList) => {
    try {
      const updatedStockDetails = [];

      watchList?.map(async (data, index) => {
        const details = await nseIndia.getEquityDetails(data);
        updatedStockDetails.push(details);
        console.log(details, "Single Symbol");
      });
      setStockDetails(updatedStockDetails);

      // setStockDetails(details);
    } catch (error) {
      console.error("Error fetching equity details:", error);
    }
  };

  const handlePress = async () => {
    const token = await AsyncStorage.getItem("user_token");

    if (token) {
      Alert.alert(
        "Clear Token",
        "Are you sure you want to clear the user token?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              try {
                // Check if the item exists before attempting to remove
                const tokenExists = await AsyncStorage.getItem("user_token");
                if (tokenExists) {
                  await AsyncStorage.removeItem("user_token");
                  // console.log("User token cleared successfully.");
                  navigation.navigate("Signin");
                } else {
                  console.log("User token does not exist.");
                }
              } catch (error) {
                console.error("Error clearing user token:", error.message);
              }
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert("User Token is Empty", "There is no user token to clear.");
    }
  };
  function handle_WatchList(number = 1) {
    dispatch(watch_List(number));
    Set_Active_Watch(number);
  }

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
    handle_WatchList();
  }

  useEffect(() => {
    // GET();
    handle_WatchList();
    // Toast.show({
    //   type: "info",
    //   text1: "Login successfully.",
    // });
  }, []);
  useEffect(() => {
    if (watch_ListData && watch_ListData.data) {
      let updatedSymbol = [];
      // updatedSymbol.push(watch_ListData.data.symbol);
      const arrayOfSymbols = watch_ListData?.data?.map(
        (object) => object.symbol
      );
      set_Stock_Stymbol(arrayOfSymbols);

      //  This is my flate list with Add /Remove functionality
      set_stockData(watch_ListData?.data);
      set_Compare(arrayOfSymbols);
    }
  }, [watch_ListData]);
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
          Market
        </Text>
        <Button
          style={styles.button}
          status="success"
          // accessoryRight={}
          onPress={toggleModal}
        >
          Go to Watchlist
        </Button>
      </View>
      {/* <Button onPress={handlePress}>Logout</Button>
      <Button onPress={() => navigation.navigate("Signin")}>Login</Button> */}

      <TouchableOpacity
        onPress={(text) => {
          navigation.navigate("Search");
        }}
        style={{
          borderColor: "gray",
          borderWidth: 1,
          margin: 10,
          flexDirection: "row",
          borderRadius: 30,
          paddingLeft: 10,
          paddingVertical: 18,
          alignItems: "center",
          gap: 5,
          justifyContent: "flex-start",
        }}
      >
        <Ionicons name="ios-search" size={24} color="black" />
        <Text style={{ color: Colors.Default_GREY }}>Search</Text>
      </TouchableOpacity>

      <ModalTester
        handle_WatchList={handle_WatchList}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        toggleModal={toggleModal}
      />

      <MarketList watchList={stock_Symbol} navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  Nav: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 50,
    backgroundColor: "#16A34A",
    // color: "@",
  },
});
