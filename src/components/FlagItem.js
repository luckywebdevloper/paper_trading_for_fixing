import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../contants";
import { StaticImageService } from "../services";

export default function FlagItem({ code, name, dial_code, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress({ code, name, dial_code })}
    >
      <Image
        style={styles.flagImage}
        source={{ uri: StaticImageService.getFlagIcon(code) }}
      />
      <Text style={styles.flagText}>{dial_code}</Text>
      <Text style={styles.flagText}>{name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  flagImage: {
    height: 25,
    width: 25,
    marginRight: 10,
  },
  flagText: {
    fontSize: 14,
    lineHeight: 14 * 1.4,
    color: Colors.Default_Black,
    marginRight: 10,
  },
});
