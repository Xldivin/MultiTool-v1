import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
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
  container2: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "black",
  },
});
