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
import {Searchbar} from 'react-native-paper';
import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useStore from '../store/store';
import {Text} from 'react-native-paper';
import Products from '../components/Products';
import ProductCategory from '../components/ProductCategory';
import HomeActionCards from '../components/HomeActionCards';
import Cardcarousel from '../components/Cardcarousel';

const HomeScreen = () => {
  const {medicines = [], addItemToCart}: any = useStore(state => state);
  return (
    <View style={{flexDirection: 'column',}}>
      <View
        style={{
          height: '30%',
          padding: 20,
          backgroundColor: '#902CC0',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <HeaderBar />
        <View style={styles.InputContainerComponent}>
          <Searchbar placeholder="Search for drugs" value="" />
        </View>
      
      </View>
       <View style={{  bottom: 50, zIndex: 1 }}>
          <Cardcarousel />
        </View>
      <View style={{height: '70%', marginHorizontal: SPACING.space_30}}>
        <ScrollView>
       
          {/* <HomeActionCards /> */}
          <ProductCategory title="Popular Items" />
          <Products />
          <ProductCategory title="Recently Viewed Products" />
          <Products />
        </ScrollView>
      </View>
    </View>

    // <View style={styles.ScreenContainer}>
    //   <StatusBar
    //     barStyle="light-content"
    //     backgroundColor={COLORS.primaryBlackHex}
    //   />
    //   <ScrollView
    //     showsVerticalScrollIndicator={false}
    //     contentContainerStyle={styles.ScrollViewFlex}>
    //     <HeaderBar />

    //     {/*Search input  */}
    //     <View style={styles.InputContainerComponent}>
    //       <Searchbar placeholder='Search for drugs' value="" />
    //       </View>

    //     <HomeActionCards />

    //     <ProductCategory title="Popular Items" />

    //     <Products />

    //     <ProductCategory title="Recently Viewed Products" />

    //     <Products />
    //   </ScrollView>
    // </View>
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
    marginTop: SPACING.space_10,
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
    borderRadius: BORDERRADIUS.radius_20,

    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});

export default HomeScreen;

{
  /* <View style={styles.InputContainerComponent}>
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
        </View> */
}
