import Toast from "react-native-toast-message";

export function SUCCESS(Msg, type) {
  Toast.show({
    type: type,
    text1: Msg,
  });
}
