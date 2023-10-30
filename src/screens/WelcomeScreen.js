import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { Colors, General } from "../contants";
import { Separator, WelcomeCard } from "../components";
import { display } from "../utils";

const pageStyle = (isActive) =>
  isActive
    ? styles.page
    : { ...styles.page, backgroundColor: Colors.Default_GREY };
const Pagination = ({ index }) => {
  return (
    <View style={styles.pageContainer}>
      {[...Array(General.WELCOME_CONTENTS.length).keys()].map((_, i) =>
        i === index ? (
          <View style={pageStyle(true)} key={i} />
        ) : (
          <View style={pageStyle(false)} key={i} />
        )
      )}
    </View>
  );
};
export default function WelcomeScreen({ navigation }) {
  const [welcomeListIndex, setWelcomeListIndex] = useState(0);
  const welcomeList = useRef();
  const pageScroll = () => {
    welcomeList.current.scrollToIndex({
      index: welcomeListIndex < 1 ? welcomeListIndex + 1 : welcomeListIndex,
    });
  };

  const onViewRef = useRef(({ changed }) => {
    setWelcomeListIndex(changed[0].index);
  });
  const viewConfiRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={Colors.Default_GREEN}
        translucent
      />
      <Separator height={StatusBar.currentHeight} />
      <Separator height={display.setHeight(8)} />
      <View style={styles.welcomeListContiner}>
        <FlatList
          ref={welcomeList}
          data={General.WELCOME_CONTENTS}
          keyExtractor={(item) => item.title}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          viewabilityConfig={viewConfiRef.current}
          onViewableItemsChanged={onViewRef.current}
          overScrollMode="never"
          renderItem={({ item }) => <WelcomeCard {...item} />}
        />
      </View>
      <Separator height={display.setHeight(8)} />
      <Pagination index={welcomeListIndex} />
      <Separator height={display.setHeight(8)} />
      <View style={styles.CMB}>
        {welcomeListIndex === 1 ? (
          <TouchableOpacity
            onPress={() => navigation.navigate("Signin")}
            activeOpacity={0.8}
            style={styles.getStartedButton}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => welcomeList.current.scrollToEnd()}>
              <Text style={styles.buttonText}>SKIP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => pageScroll()}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Default_BG,
  },
  pageContainer: {
    flexDirection: "row",
  },
  welcomeListContiner: {
    height: display.setHeight(60),
  },
  CMB: {
    marginBottom: 20,
  },
  page: {
    height: 8,
    width: 15,
    backgroundColor: Colors.Default_GREEN,
    borderRadius: 32,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: display.setWidth(90),
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
  },
  button: {
    fontSize: 16,
    backgroundColor: Colors.Default_GREEN,
    paddingVertical: 11,
    paddingHorizontal: 11,
    borderRadius: 32,
  },
  getStartedButton: {
    backgroundColor: Colors.Default_GREEN,
    paddingHorizontal: 40,
    paddingVertical: 15,
    marginHorizontal: 10,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  getStartedText: {
    fontSize: 20,
    color: Colors.Default_WHITE,
  },
});
