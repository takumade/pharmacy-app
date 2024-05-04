
import React from 'react';
import { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import BottomSheet from '@gorhom/bottom-sheet';


export default function BottomSheetC () {
    const snapPoints = useMemo(() => ['25%', '50%', '65%'], []);
  return (
    <View >
    <BottomSheet index={1} snapPoints={snapPoints}>
        <View >
        {/* <Tab.Navigator>
<Tab.Screen name="Home" component={HomeScreen} />

</Tab.Navigator> */}
<Text>Thinking of the design</Text>

        </View>
    </BottomSheet>
</View>
  )
}



const styles = StyleSheet.create({})