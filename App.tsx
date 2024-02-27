import React, { useEffect, useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import {
  Alert,
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import NentInfo from "@react-native-community/netinfo";
import RNRestart from "react-native-restart";
import Calculator from "./src/view/Calculator";
import Contacts from "./src/view/Contacts";
import Home from "./src/view/Home";
import { ThemeProvider } from "./context/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { firebase } from "./confing";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ changeAvatar }: any) => {
  return (
    <DrawerContentScrollView>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={changeAvatar} style={styles.avatarWrapper}>
          <Image
            source={require("./src/assets/deal.png")}
            style={styles.avatar}
          />
          <Image
            source={require("./src/assets/camera.png")}
            style={styles.uploadIcon}
          />
        </TouchableOpacity>
      </View>
      <DrawerItem label="Home" onPress={() => {}} />
      <DrawerItem label="Calculator" onPress={() => {}} />
      <DrawerItem label="Article" onPress={() => {}} />
    </DrawerContentScrollView>
  );
};

export default function App() {
  const [avatarSource, setAvatarSource] = useState(
    require("./src/assets/deal.png")
  );

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadMedia = async () => {
    if (!image) {
      console.error("Image is null");
      return;
    }
    setUploading(true);
  
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
  
        xhr.onerror = (e) => {
          reject(new TypeError("Network request Failed"));
        };
  
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
  
      const filename = image.substring(image.lastIndexOf("/") + 1);
      const ref = firebase.storage().ref().child(filename);
  
      if (!(blob instanceof Blob || blob instanceof Uint8Array || blob instanceof ArrayBuffer)) {
        throw new Error("Blob is not of the correct type");
      }
      await ref.put(blob);
      setUploading(false);
      Alert.alert("Photo Uploaded!!");
      setImage(null); 
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  

  useEffect(() => {
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

    return () => unSubscribe();
  }, []);

  const changeAvatar = () => {
    setAvatarSource((prevSource: any) =>
      prevSource === require("./src/assets/deal.png")
        ? require("./src/assets/newAvatar.png")
        : require("./src/assets/deal.png")
    );
  };

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => (
            <CustomDrawerContent {...props} changeAvatar={changeAvatar} />
          )}
        >
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Calculator" component={Calculator} />
          <Drawer.Screen name="Article" component={Contacts} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  avatarContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatarWrapper: {
    position: "relative",
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: "#ccc",
    borderRadius: 50,
  },
  avatar: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  uploadIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    marginRight: 5,
    marginBottom: 5,
    tintColor: "#FFD74A",
  },
});
