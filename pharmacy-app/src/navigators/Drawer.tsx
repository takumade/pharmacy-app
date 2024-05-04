import * as React from 'react';
import { Button, View,StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import CatalogScreen from '../screens/CatalogScreen';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
   
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={CatalogScreen} />
    </Drawer.Navigator>

  )
}
const styles = StyleSheet.create({})
export default DrawerNavigator

