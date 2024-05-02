import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import CustomIcon from '../components/CustomIcon';
import CatalogScreen from '../screens/CatalogScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DetailsScreen from '../screens/DetailsScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../theme/theme';
import {BlurView} from '@react-native-community/blur';

const Tab = createBottomTabNavigator();

const TabNavigators = () => {
  return (
    <Tab.Navigator
      initialRouteName="Map Screen"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
          <BlurView
            overlayColor=""
            blurAmount={15}
            style={styles.BlurViewStyles}
          />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              size={25}
              name="home"
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Catalog"
        component={CatalogScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              size={25}
              name="cart"
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Map Screen"
        component={DetailsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              size={45}
              name="like"
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              size={25}
              name="wallet"
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
          <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              size={25}
              name="menu"
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    borderTopColor: 'transparent',
  },

  BlurViewStyles: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
export default TabNavigators;
