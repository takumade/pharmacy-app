

import React from 'react'

import {
  StyleSheet, 
  View,
  ScrollView,
  StatusBar,
  Image
} from 'react-native';
import {ScreenContainer} from 'react-native-screens';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';

import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Icon, Card, IconButton, Button, Text } from 'react-native-paper';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5"
import Products from '../components/Products';
import ProductCategory from '../components/ProductCategory';
import HomeActionCards from "../components/HomeActionCards";

import { List } from 'react-native-paper';


const styles = StyleSheet.create({
    cartItemsContainer:  {
    marginLeft: SPACING.space_30,
    marginRight: SPACING.space_30,
    marginTop: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    },
    cartItem: {
        backgroundColor: COLORS.primaryWhiteHex,
        borderRadius: BORDERRADIUS.radius_20,
        paddingLeft: SPACING.space_15,
        marginTop: SPACING.space_10
    }
})

const CartItems = () => {
    return (    <ScrollView>
        <View style={styles.cartItemsContainer}>
        <List.Item
      title="Paracetamol"
      description="Tablets .240mg"
      left={props => <List.Image  source={{uri: 'https://picsum.photos/700'}}/>}
      right={props => <View style={{flexDirection: "row", gap: 12, alignItems: "center"}}>
         <FontAwesomeIcon name="minus" size={FONTSIZE.size_18} />
        
        <Text style={{fontSize: FONTSIZE.size_16}}>10</Text>

        <FontAwesomeIcon name="plus" size={FONTSIZE.size_18} />
       
      </View>}
      style={styles.cartItem}
    />
        </View>
  
      </ScrollView>)
}

export default CartItems;