import { StyleSheet, Text, Image, View } from "react-native";
import React from "react";

import { display } from "../utils";

const WelcomeCard = ({ title, content, image }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} resizeMode="contain" />
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.contentText}>{content}</Text>
    </View>
  );
};

export default WelcomeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: display.setWidth(100),
  },
  image: {
    height: display.setHeight(40),
    width: display.setWidth(60),
  },
  titleText: {
    fontSize: 33,
    fontFamily: "Inter-Black",
    color: "#193766",
    marginHorizontal: 5,
    textAlign: "center",
  },
  contentText: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    marginHorizontal: 20,
  },
});
