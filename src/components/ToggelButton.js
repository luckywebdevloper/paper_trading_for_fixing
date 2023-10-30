import { StyleSheet, Animated, TouchableOpacity, Easing } from "react-native";
import React from "react";
import { Colors } from "../contants";
import { useState } from "react";

const cotainerStyle = (size, isActive) => ({
  backgroundColor: isActive ? Colors.Default_GREEN : Colors.Default_GREY,
  height: 32 * size,
  width: 64 * size,
  borderRadius: 32,

  padding: 4 * size,
});
const toggleStyle = (size, animatedValue) => ({
  height: 24 * size,
  width: 24 * size,
  backgroundColor: Colors.Default_WHITE,
  borderRadius: 32,
  transform: [
    {
      translateX: animatedValue,
    },
  ],
});
export default function ToggelButton({ size }) {
  const [isActive, setIsActive] = useState(false);
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  const toggleHandle = () => {
    Animated.timing(animatedValue, {
      toValue: isActive ? 0 : 32 * size,

      duration: 250,
      easing: Easing.bounce,
      delay: 0,
      useNativeDriver: true,
    }).start();
    setIsActive(!isActive);
  };
  return (
    <TouchableOpacity
      onPress={() => toggleHandle()}
      style={cotainerStyle(size, isActive)}
    >
      <Animated.View style={toggleStyle(size, animatedValue)} />
    </TouchableOpacity>
  );
}
