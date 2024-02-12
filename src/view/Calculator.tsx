import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Switch, Text, View } from "react-native";
import { myColors } from "../styles/Colors";
import CalculatorKeyBoard from "../components/CalculatorKeyBoard";
import React from "react";

export default function Calculator() {
  return (
    <SafeAreaView
      style={styles.container2}
    >
      <StatusBar style="auto" />
      <CalculatorKeyBoard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.light,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  container2: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "black",
  },
});
