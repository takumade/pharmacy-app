import { StyleSheet, Text, View } from 'react-native'
import React,{useRef } from 'react'
import MapView, { Marker, Callout,PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import { Searchbar } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
export default class Map extends React.Component {
    state={
        latitude:null,
        longitude:null}
        
    getUserLocation = () => {
        Geolocation.getCurrentPosition((loc) => {
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
    }
    
    searchSection = () => {
        return (
            <View style={{height:"10%",marginTop:10 }}>
            <Searchbar placeholder='Search for drugs' value={''} /> 
          </View>
        )
    }
    mapSection = () => {
        return(
            <View style={{height:"90%",  flexDirection:"column"}}>
                <MapView style={{...StyleSheet.absoluteFillObject}}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={{
                        latitude: -17.824858,
                        longitude: 31.053028,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                    onMapReady={() => this.getUserLocation()}
                   ref={(ref) => this.mapRef = ref}
                >
                    <Marker coordinate={{latitude: -17.824858, longitude: 31.053028}}/> 
                </MapView>
            </View>
        )
    }
    mapRef: any

    render() {
        return (
            <SafeAreaView style={{flexDirection:"column",paddingTop:20}}>
                {this.searchSection()}
                {this.mapSection()}
            </SafeAreaView>
        )
    }
}

