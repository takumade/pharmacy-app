

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
    screenContainer: {
        flex: 1,
        marginHorizontal: SPACING.space_30
    },
    productCatalogueContainer:  {
    marginTop: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    
    },
    productCatalogueItem: {
        backgroundColor: COLORS.primaryWhiteHex,
        borderRadius: BORDERRADIUS.radius_20,
        paddingLeft: SPACING.space_15,
        marginTop: SPACING.space_10
    }
})

const ProductCatalogue = () => {
    return (    <View style={styles.screenContainer}>
        <ScrollView style={styles.productCatalogueContainer}>
        <List.Item
      title="Medication"
      left={props => <List.Image  source={{uri: 'https://picsum.photos/700'}}/>}
      style={styles.productCatalogueItem}
    />
  
  <List.Item
      title="Vitamins"
      left={props => <List.Image  source={{uri: 'https://picsum.photos/700'}}/>}
      style={styles.productCatalogueItem}
    />
  
  <List.Item
      title="Suppliments"
      left={props => <List.Image  source={{uri: 'https://picsum.photos/700'}}/>}
      style={styles.productCatalogueItem}
    />
  
  <List.Item
      title="Body & Care"
      left={props => <List.Image  source={{uri: 'https://picsum.photos/700'}}/>}
      style={styles.productCatalogueItem}
    />
  
  <List.Item
      title="Products for children"
      left={props => <List.Image  source={{uri: 'https://picsum.photos/700'}}/>}
      style={styles.productCatalogueItem}
    />
        </ScrollView>
  
      </View>)
}

export default ProductCatalogue;