import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Modal from "react-native-modal";
import { FlatList, TouchableOpacity } from "react-native";

function ModalTester({
  handle_WatchList,
  isModalVisible,
  setModalVisible,
  toggleModal,
}) {
  const [selectedWatchlist, setSelectedWatchlist] = useState(null);

  const watchLists = [
    { id: 1, name: "Watchlist 1" },
    { id: 2, name: "Watchlist 2" },
    { id: 3, name: "Watchlist 3" },
    { id: 4, name: "Watchlist 4" },
  ];
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
        backgroundColor: "#fff", // Light white color
        borderBottomWidth: 1,
        borderBottomColor: "#ccc", // Border color
      }}
      onPress={() => {
        toggleModal();
        setSelectedWatchlist(item.id);
        handle_WatchList(item.id);
      }}
    >
      <Text>{item.name}</Text>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          backgroundColor: selectedWatchlist === item.id ? "#3498db" : "#fff", // Change color based on selection
          borderWidth: 1,
          borderColor: "#3498db", // Border color of the radio button
        }}
      />
    </TouchableOpacity>
  );
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
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <FlatList
              data={watchLists}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>

          <Button title="Cancel" onPress={toggleModal} />
        </View>
      </Modal>
    </View>
  );
}

export default ModalTester;
