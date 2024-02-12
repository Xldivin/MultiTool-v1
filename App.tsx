import 'react-native-gesture-handler';
import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Calculator from './src/view/Calculator';
import Contacts from './src/view/Contacts';

export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator>
    <Drawer.Screen name="Calculator" component={Calculator} />
    <Drawer.Screen name="Article" component={Contacts} />
  </Drawer.Navigator>
  );
}
