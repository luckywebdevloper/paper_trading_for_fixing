import * as React from "react";
// import "react-native-gesture-handler";
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { ApplicationProvider, Layout } from "@ui-kitten/components";
import { default as theme } from "../../theme.json";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Octicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { SafeAreaView } from "react-native";
import {
  SplashScreen,
  WelcomeScreen,
  Market,
  SigninScreen,
  SignupScreen,
  ForgetPassword,
  RegisterPhone,
  VerificationScreen,
  Home,
  Portfolio,
  Trade,
  Search,
  StockDetails,
  Buy,
  Buy_Screen,
  Stock_Detail_History,
  Successfull,
} from "../screens";

import { useFonts } from "expo-font";

import Profile from "../screens/Profile";

import { Colors } from "../contants";
import { Platform, Text, View } from "react-native";
import Chart from "../screens/Chart";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const toastConfig = {
  success: (props) => (
    <BaseToast
      text2NumberOfLines={3}
      {...props}
      style={{ borderLeftColor: Colors.Default_GREEN }}
      text2Style={{
        color: "black",
        fontSize: 13,
      }}
      text1Style={{
        fontSize: 13,
        color: "black",
        textAlign: "right",
      }}
    />
  ),

  error: (props) => (
    <ErrorToast
      text2NumberOfLines={3}
      {...props}
      style={{ borderLeftColor: "red", backgroundColor: "white" }}
      text1Style={{
        color: "red",
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 13,
        color: "black",
      }}
    />
  ),
};
const TabScreenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff",
  },
};
function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={TabScreenOptions}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Entypo
                  name="home"
                  size={20}
                  color={focused ? "#16A34A" : "#ccc"}
                />
                <Text
                  style={{ fontSize: 15, color: "#16A34A", fontWeight: "700" }}
                >
                  Home
                </Text>
              </View>
            );
          },
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        name="Market"
        component={Market}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Octicons
                  name="graph"
                  size={20}
                  color={focused ? "#16A34A" : "#ccc"}
                />
                <Text
                  style={{ fontSize: 15, color: "#16A34A", fontWeight: "700" }}
                >
                  Market
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={Portfolio}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  top: Platform.OS == "ios" ? -10 : -20,
                  width: Platform.OS == "ios" ? 50 : 60,
                  height: Platform.OS == "ios" ? 50 : 60,
                  borderRadius: Platform.OS == "ios" ? 25 : 30,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: Colors.Default_GREEN,
                }}
              >
                <FontAwesome name="exchange" size={20} color="#ffffff" />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Trad"
        component={Trade}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Entypo
                  name="bar-graph"
                  size={20}
                  color={focused ? "#16A34A" : "#C6C6C6"}
                />
                <Text
                  style={{ fontSize: 15, color: "#16A34A", fontWeight: "700" }}
                >
                  Trade
                </Text>
              </View>
            );
          },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Ionicons
                  name="ios-person-circle-outline"
                  size={20}
                  color={focused ? "#16A34A" : "#C6C6C6"}
                />
                <Text
                  style={{ fontSize: 15, color: "#16A34A", fontWeight: "700" }}
                >
                  Profile
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const AuthScreens = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="Signin" // Set your initial route
  >
    {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}
    <Stack.Screen name="Signin" component={SigninScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
    <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    <Stack.Screen name="RegisterPhone" component={RegisterPhone} />
    {/* <Stack.Screen name="Main" component={TabNavigator} /> */}
  </Stack.Navigator>
);
const Navigators = () => {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("../assets/fonts/ClashDisplay-Bold.otf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
  });

  const onLayoutRootView = React.useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <ApplicationProvider {...eva} theme={{ ...eva.light, ...theme }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="RegisterPhone" component={RegisterPhone} />
            <Stack.Screen name="Stockdetails" component={StockDetails} />
            <Stack.Screen name="Chart" component={Chart} />
            <Stack.Screen name="Successfull" component={Successfull} />

            <Stack.Screen name="Search" component={Search} />

            <Stack.Screen name="StockDetails" component={StockDetails} />
            <Stack.Screen
              name="StockDetailHistory"
              component={Stock_Detail_History}
            />
            <Stack.Screen name="BuyStock" component={Buy_Screen} />

            <Stack.Screen name="Verification" component={VerificationScreen} />
            <Stack.Screen name="Buy" component={Buy} />
          </Stack.Navigator>
          <Toast config={toastConfig} />
        </SafeAreaView>

        {/* <Stack.Screen name="Market" component={Market} />

        {!isAuth ? (
          <AuthScreens />
        ) : (
          <TabNavigator />
        )} */}
      </ApplicationProvider>
    </NavigationContainer>
  );
};
export default Navigators;
