import {
  ScrollView,
  StatusBar,
  StyleSheet,
  // Text,
  // TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {ScreenContainer} from 'react-native-screens';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';

import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useStore from '../store/store';
import {Text} from 'react-native-paper';
import Products from '../components/Products';
import ProductCategory from '../components/ProductCategory';
import HomeActionCards from '../components/HomeActionCards';

const HomeScreen = () => {
  const {medicines = [],addItemToCart}: any = useStore(state => state);
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
        <Text style={styles.ScreenTitle}>Search for {'\n'}drugs below</Text>

        {/*Search input  */}
        <View style={styles.InputContainerComponent}>
          <View style={styles.searchSection}>
            <Ionicons
              style={styles.searchIcon}
              name="search"
              size={FONTSIZE.size_24}
              color={COLORS.primaryBlackHex}
            />
            <TextInput
              style={styles.input}
              placeholder="Search for drugs"
              onChangeText={searchString => {}}
              underlineColorAndroid="transparent"
            />
          </View>
        </View>

        <HomeActionCards />

        <ProductCategory title="Popular Items" />

        <Products />

        <ProductCategory title="Recently Viewed Products" />

        <Products />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    marginHorizontal: SPACING.space_30,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryBlackHex,
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
});

export default HomeScreen;
