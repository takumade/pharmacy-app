
import BottomSheet from '@gorhom/bottom-sheet';
import React from 'react';
import { useMemo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Map from './Map';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';

const Tab = createBottomTabNavigator();
export default function DetailsScreen() {
	const snapPoints = useMemo(() => ['25%', '50%', '65%'], []);

	return (
	
		<View >
			<Map />
			<BottomSheet index={1} snapPoints={snapPoints}>
				<View >
				{/* <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />

      </Tab.Navigator> */}
	  <Text>Thinking of the design</Text>

				</View>
			</BottomSheet>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	contentContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	containerHeadline: {
		fontSize: 24,
		fontWeight: '600',
		padding: 20
	}
});