import * as React from 'react';
import {Button, View, StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import CatalogScreen from '../screens/CatalogScreen';
import OrdersScreen from '../screens/OrdersScreen';
import CustomDrawer from '../components/CustomDrawer';
import Map from '../screens/Map';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Support from '../screens/Support';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Locate"
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="wallet" size={22} color={color} />
          ),
        }}
      />
      
      <Drawer.Screen 
      name="Locate"
      component={Map}
      options={{
        drawerIcon: ({color}) => (
          <Ionicons name="location" size={22} color={color} />
        ),
      }} />
         <Drawer.Screen
        name="Support"
        component={Support}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="help" size={22} color={color} />
          ),
        }}
      />
   
     
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({});
export default DrawerNavigator;
