import React from "react";

import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/navigators/TabNavigators";
import DetailsScreen from "./src/screens/DetailsScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
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
    </NavigationContainer>
  )
}
export default App;