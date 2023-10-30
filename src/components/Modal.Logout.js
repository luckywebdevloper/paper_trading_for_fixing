import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import Modal from "react-native-modal";

function LogoutModal({
  handle_WatchList,
  isModalVisible,
  setModalVisible,
  toggleModal,
  navigation,
}) {
  const handlePress = async () => {
    const token = await AsyncStorage.getItem("user_token");

    if (token) {
      Alert.alert(
        "Logout",
        "Are you sure you want to Logout?",
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
  return (
    <View style={{ marginTop: 20 }}>
      {/* <Button title="Watch List" onPress={toggleModal} /> */}

      {/* <Modal isVisible={isModalVisible}> */}

      <Modal
        hideModalContentWhileAnimating
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropTransitionOutTiming={0}
        avoidKeyboard
        isVisible={isModalVisible}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            // textAlign: "center",
          }}
        >
          <View style={{}}>
            <Button title="Logout" onPress={handlePress} />
            <Button title="Cancel" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default LogoutModal;
