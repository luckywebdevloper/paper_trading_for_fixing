import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import {
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
export const HEART_ICON = () => <BsSuitHeart />;
export const HEART_EXPO_ICON = () => (
  <AntDesign name="hearto" size={24} color="black" />
);
export const HEART_EXPO_ICON_FILL = () => (
  <AntDesign name="heart" size={24} color="black" />
);

export const UPLOAD_ICON = ({ color, size, bg }) => (
  <View
    style={{
      width: 48,
      height: 48,
      borderRadius: 24,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: bg,
    }}
  >
    <MaterialCommunityIcons
      name="upload-outline"
      style={{
        color: color,
        fontSize: size,
      }}
    />
  </View>
);

export const CHAT = ({ color, size, bg }) => (
  <View
    style={{
      width: 48,
      height: 48,
      borderRadius: 24,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: bg,
    }}
  >
    <MaterialCommunityIcons
      name="message-reply-text-outline"
      style={{
        color: color,
        fontSize: size,
      }}
    />
  </View>
);

export const WHATS_APP = ({ color, size, bg }) => (
  <View
    style={{
      width: 48,
      height: 48,
      borderRadius: 24,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: bg,
    }}
  >
    <FontAwesome
      name="whatsapp"
      style={{
        color: color,
        fontSize: size,
      }}
    />
  </View>
);
export const UPLOAD_RIGHT = ({ color, size, bg }) => (
  <View
    style={{
      width: 48,
      height: 48,
      borderRadius: 24,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: bg,
    }}
  >
    <Entypo
      name="align-right"
      size={24}
      color="black"
      style={{
        color: color,
        fontSize: size,
      }}
    />
  </View>
);
export const MENU_ICON = ({ color, size, bg }) => (
  <View
    style={{
      width: 48,
      height: 48,
      borderRadius: 24,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: bg,
    }}
  >
    <MaterialCommunityIcons
      name="dots-vertical"
      style={{
        color: color,
        fontSize: size,
      }}
    />
  </View>
);
export const BELL_ICON = ({ color, size, bg }) => (
  <View
    style={{
      width: 48,
      height: 48,
      borderRadius: 24,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: bg,
    }}
  >
    <FontAwesome5
      name="bell"
      style={{
        color: color,
        fontSize: size,
      }}
    />
  </View>
);
export const CHART_ICON = ({ color, size, bg }) => (
  <View
    style={{
      width: 48,
      height: 48,
      borderRadius: 24,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: bg,
    }}
  >
    <AntDesign
      name="linechart"
      style={{
        color: color,
        fontSize: size,
      }}
    />
  </View>
);
export const CLIP_ICON = ({ color, size, bg }) => (
  <View
    style={{
      width: 48,
      height: 48,
      borderRadius: 24,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: bg,
    }}
  >
    <Feather
      name="paperclip"
      style={{
        color: color,
        fontSize: size,
      }}
    />
  </View>
);
export const UNFILL_HEART = ({ color, size, bg }) => (
  <View
    style={{
      width: 48,
      height: 48,
      borderRadius: 24,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: bg,
    }}
  >
    <AntDesign
      name="heart"
      style={{
        color: color,
        fontSize: size,
      }}
    />
  </View>
);
export const CHECKOUTICON = ({ color, size, bg }) => (
  <View
    style={{
      // width: 48,
      // height: 48,
      borderRadius: 24,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: bg,
    }}
  >
    <AntDesign
      name="checkcircle"
      style={{
        color: color,
        fontSize: size,
      }}
    />
  </View>
);

const styles = StyleSheet.create({
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  icon_upload: {
    color: "red",
    fontSize: 24,
    backgroundColor: "#FFCCCB",
  },
});
