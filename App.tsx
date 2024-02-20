import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Calculator from "./src/view/Calculator";
import Contacts from "./src/view/Contacts";
import Home from "./src/view/Home";
import { ThemeProvider } from "./context/ThemeContext";
import NentInfo from "@react-native-community/netinfo";
import { Alert } from "react-native";
import RNRestart from "react-native-restart";


export default function App() {
  const Drawer = createDrawerNavigator();
  const unSubscribe = NentInfo.addEventListener((state) => {
    if (state.isConnected === false) {
      Alert.alert("No internet", "Please Reconnect", [
        {
          text: "Reload App",
          onPress: () => RNRestart.restart(),
        },
      ]);
    } else if (state.isConnected === true) {
      console.log("there is internet connectivity");
    }
  });
  useEffect(() => {
    unSubscribe();
  });
  return (
    <ThemeProvider>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Calculator" component={Calculator} />
        <Drawer.Screen name="Article" component={Contacts} />
      </Drawer.Navigator>
    </ThemeProvider>
  );
}
