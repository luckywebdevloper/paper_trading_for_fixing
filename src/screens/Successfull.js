import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { CHECKOUTICON } from "../assets/icons/Icon";

const Successfull = ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        gap: 10,
      }}
    >
      <CHECKOUTICON color={"green"} bg={"white"} size={60} />
      <Text style={{ fontSize: 18, fontWeight: 600 }}>
        Successfull Checkout
      </Text>
      <Text>Thank you.You Purchase was successfull</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text
          style={{
            color: "green",
            fontSize: 20,
            borderWidth: 1,
            borderColor: "green",
            borderRadius: 5,
            padding: 10,
            paddingHorizontal: 20,
          }}
        >
          Home
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Successfull;

const styles = StyleSheet.create({});
