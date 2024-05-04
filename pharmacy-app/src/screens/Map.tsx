import {StyleSheet, Text, View} from 'react-native';
import React, {useRef} from 'react';
import MapView, {Marker, Callout, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {Searchbar} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import BottomSheetC from '../components/BottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
export default class Map extends React.Component {
  state = {
    latitude: null,
    longitude: null,
    snapPoints: ['25%', '50%', '65%'],
  };

  getUserLocation = () => {
    Geolocation.getCurrentPosition(loc => {
      this.mapRef.animateToRegion({
        latitude: -17.824858,
        longitude: 31.053028,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      this.setState({
        latitude: loc.coords.latitude,
      });
    });
  };

  searchSection = () => {
    return (
      <View style={{height: '10%', marginTop: 10}}>
        {/* <Searchbar placeholder='Search for drugs' value={''} />  */}
      </View>
    );
  };
  mapSection = () => {
    const {snapPoints} = this.state;
    return (
      <View style={{height: '100%', flexDirection: 'column'}}>
        <MapView
          style={{...StyleSheet.absoluteFillObject}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: -17.824858,
            longitude: 31.053028,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onMapReady={() => this.getUserLocation()}
          ref={ref => (this.mapRef = ref)}>
          <Marker coordinate={{latitude: -17.824858, longitude: 31.053028}} />
        </MapView>
        <BottomSheet index={1} snapPoints={snapPoints}>
          <View>
          <Searchbar placeholder='Search for drugs' value={''} /> 
          </View>
        </BottomSheet>
      </View>
    );
  };
  mapRef: any;

  render() {
    return (
      <SafeAreaView style={{flexDirection: 'column', paddingTop: 20}}>
        {this.mapSection()}
      </SafeAreaView>
    );
  }
}
