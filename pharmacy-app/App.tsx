import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './src/navigators/TabNavigators';
import DetailsScreen from './src/screens/DetailsScreen';
import {PaperProvider} from 'react-native-paper';
import Map from './src/screens/Map';
import StoreScreen from './src/screens/StoreScreen';
import DrawerNavigator from './src/navigators/Drawer';
import AuthStack from './src/navigators/AuthStack';
import AuthProvider, {useAuth} from './src/contexts/AuthContext';
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <Layout></Layout>
    </AuthProvider>
  );
};
export default App;

export const Layout = () => {
  const {authState, onLogout} = useAuth();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {authState?.authenticated ? (
              <>
                <Stack.Screen
                  name="DrawerNavigator"
                  component={DrawerNavigator}
                  options={{animation: 'slide_from_bottom'}}
                />
                </>):(
                  <>
                <Stack.Screen
                  name="AuthStack"
                  component={AuthStack}
                  options={{animation: 'slide_from_bottom'}}
                />
                </>
              
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </GestureHandlerRootView>
  );
};
