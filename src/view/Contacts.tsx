import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Switch, Text, View } from "react-native";
import React from "react";

export default function Contacts() {
  return (
    <SafeAreaView
      style={styles.container2}
    >
      <StatusBar style="auto" />
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
