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
      initialRouteName="Locate"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#76A593',
          width: 250,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: '',
          drawerIcon: ({color}) => (
            <Ionicons name="home-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          headerTitle: '',
          drawerIcon: ({color}) => (
            <Ionicons name="wallet" size={22} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Locate"
        component={Map}
        options={{
          headerTitle: '',
          drawerIcon: ({color}) => (
            <Ionicons name="location" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Support"
        component={Support}
        options={{
          headerTitle: '',
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
