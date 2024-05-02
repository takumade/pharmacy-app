import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from "react";


import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/navigators/TabNavigators";
import DetailsScreen from "./src/screens/DetailsScreen";
import { PaperProvider } from 'react-native-paper';
import Map from "./src/screens/Map";
import StoreScreen from "./src/screens/StoreScreen";
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PaperProvider>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen
         name="TabNavigator"
         component={TabNavigator}
         options={{animation:'slide_from_bottom'}}>
        </Stack.Screen>
        <Stack.Screen
         name="Details"
         component={DetailsScreen}
         options={{animation:'slide_from_bottom'}}>
        </Stack.Screen>
      </Stack.Navigator> 
     {/* <Map/>*/}
      
      {/* 
      <StoreScreen /> */}
    </NavigationContainer>
    </PaperProvider>
    </GestureHandlerRootView>
  )
}
export default App;