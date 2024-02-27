import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Button from "../components/ButtonComponent";
import { ThemeContext } from "../../context/ThemeContext";
import { GoogleSignin, User, GoogleSigninButton } from "@react-native-google-signin/google-signin";

export default function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [error, setError] = useState< string |unknown | undefined>();
  const [userInfo, setUserInfo] = useState<User | undefined>();

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    toggleTheme(newTheme);
  };

  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       "851639951476-m8t4dppklc5kt2dv4c0qahiuru1im0p3.apps.googleusercontent.com",
  //   });
  // }, []);

  // const signin = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const user = await GoogleSignin.signIn();
  //     setUserInfo(user);
  //   } catch (e) {
  //     setError(e);
  //   }
  // };
  return (
    <SafeAreaView style={styles.container2}>
      <StatusBar style="auto" />
      <Button
        title={theme === "light" ? "Dark" : "Light"}
        onPress={() => handleToggleTheme()}
      />
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
