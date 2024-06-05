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
import {background} from '@chakra-ui/react';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#902CC0',
          width: 250,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: '',
          drawerLabelStyle: {
            color: 'white',
          },
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={"white"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          headerTitle: '',
          drawerLabelStyle: {
            color: 'white',
          },
          drawerIcon: ({color}) => (
            <Ionicons name="wallet" size={22} color={"white"} />
          ),
        }}
      />

      <Drawer.Screen
        name="Locate"
        component={Map}
        options={{
          headerTitle: '',
          drawerLabelStyle: {
            color: 'white',
          },
          drawerIcon: ({color}) => (
            <Ionicons name="location" size={22} color={"white"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Support"
        component={Support}
        options={{
          headerTitle: '',
          drawerLabelStyle: {
            color: 'white',
          },
          drawerIcon: ({color}) => (
            <Ionicons name="help" size={22} color={"white"} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({});

export default DrawerNavigator;
