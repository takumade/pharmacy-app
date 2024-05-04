import React from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';


interface CustomDrawerProps extends DrawerContentComponentProps {}

const CustomDrawer: React.FC<CustomDrawerProps> = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#5284b5', }}>
        <ImageBackground  style={{ padding: 20 }}>
          <Image source={require('../assets/app_images/avatar.jpg')} style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }} />
          <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'Roboto-Medium', marginBottom: 5 }}>
           Takunda Simbabwe
          </Text>
        
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="share-social-outline" size={22} />
            <Text style={{ fontSize: 15, fontFamily: 'Roboto-Medium', marginLeft: 5 }}>Tell a Friend</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="exit-outline" size={22} />
            <Text style={{ fontSize: 15, fontFamily: 'Roboto-Medium', marginLeft: 5 }}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;