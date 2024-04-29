
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
import ProductCatalogue from '../components/ProductCatalogue';

const CatalogScreen = () => {
  return (
    <View style={styles.ScreenContainer}>
    <StatusBar
      barStyle="light-content"
      backgroundColor={COLORS.primaryBlackHex}
    />
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.ScrollViewFlex}>
      <HeaderBar />
      <Text style={styles.ScreenTitle}>Product Catalogue</Text>

      {/*Search input */}
      <View style={styles.InputContainerComponent}>

<View style={styles.searchSection}>
  <Ionicons style={styles.searchIcon} name="search" size={FONTSIZE.size_24} color={COLORS.primaryBlackHex} />
  <TextInput
      style={styles.input}
      placeholder="Type your medication name"
      onChangeText={(searchString) => {}}
      underlineColorAndroid="transparent"
  />
</View>


      </View>

     
 <ProductCatalogue />

    </ScrollView>
  </View>
  )
}

export default CatalogScreen

const styles = StyleSheet.create({  ScreenContainer: {
  flex: 1,
  marginHorizontal: SPACING.space_30
  
},
ScrollViewFlex: {
  flexGrow: 1,
},
ScreenTitle: {
  fontSize: FONTSIZE.size_28,
  fontFamily: FONTFAMILY.poppins_semibold,
  color: COLORS.primaryBlackHex,
  paddingLeft: SPACING.space_30,
},
InputIcon: {
  marginHorizontal: SPACING.space_20,
},
TextInputContainer: {
  flex: 1,
  height: SPACING.space_20 * 3,
  fontFamily: FONTFAMILY.poppins_medium,
  fontSize: FONTSIZE.size_14,
  color: COLORS.primaryWhiteHex,
},
InputContainerComponent: {
  flexDirection: 'row',
  marginLeft: SPACING.space_30,
  marginRight: SPACING.space_30,
  marginTop: SPACING.space_30,
  borderRadius: BORDERRADIUS.radius_20,
  backgroundColor: COLORS.primaryWhiteHex,
  alignItems: 'center',
},

searchSection: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#fff',
},
searchIcon: {
  padding: 10,
},
input: {
  flex: 1,
  paddingTop: 5,
  paddingRight: 10,
  paddingBottom: 10,
  paddingLeft: 0,
  backgroundColor: '#fff',
  color: '#424242',
},
})