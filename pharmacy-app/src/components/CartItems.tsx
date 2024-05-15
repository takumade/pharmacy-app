

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
import useStore from '../store/store';
import { List } from 'react-native-paper';

interface FavouritesProps {
  cartItems: any[];
}

const styles = StyleSheet.create({
    cartItemsContainer:  {
    borderRadius: BORDERRADIUS.radius_20,

    },
    cartItem: {
        backgroundColor: COLORS.primaryWhiteHex,
        borderRadius: BORDERRADIUS.radius_20,
        paddingLeft: SPACING.space_15,
        marginTop: SPACING.space_10,
    }
})

const CartItems: React.FC<FavouritesProps> = ({cartItems}) => {
  console.log(cartItems)
    return (   
        <View style={styles.cartItemsContainer}>
        <List.Item
      title={<Text variant="titleMedium">Paracetamol</Text>}
      description={<CartItemDesc/>}
      left={props => <List.Image style={{marginTop: 8}}  source={{uri: 'https://picsum.photos/700'}}/>}
      right={props => <CartItemQuantity/>}
      style={styles.cartItem}
    />
    
        </View>
      )
}

export default CartItems;

const CartItemQuantity = () => {
    return (<View >
        <FontAwesomeIcon style={{alignSelf: "flex-end"}} name="times" size={FONTSIZE.size_18} />

       <View style={{flexDirection: "row", gap: 12, alignItems: "center", marginTop: "40%"}}>
        <FontAwesomeIcon name="minus" size={FONTSIZE.size_18} />
       
       <Text style={{fontSize: FONTSIZE.size_16}}>10</Text>

       <FontAwesomeIcon name="plus" size={FONTSIZE.size_18} />
      
     </View>
     </View>)
}

const CartItemDesc = () => {
    return (<View>

        <Text>Tablets .240mg</Text>

        <Text variant="bodyMedium" style={{fontWeight: "bold", marginTop: 12}}>$10.00</Text>
      </View>)
}