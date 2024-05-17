import React, {FC} from 'react';

import {StyleSheet, View, ScrollView, StatusBar, Image} from 'react-native';
import {ScreenContainer} from 'react-native-screens';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';

import {Icon, Card, IconButton, Button, Text} from 'react-native-paper';
import CartItems from '../components/CartItems';
import useStore from '../store/store';

const OrdersScreen: FC = () => {
  const {cartItems = [],clearCart}: any = useStore(state => state);
  let totalAmount = cartItems
    .reduce(
      (total: number, item: any) => total + item.unitPrice * item.quantity,
      0,
    )
    .toFixed(2);
 
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
        <Text style={styles.ScreenTitle}>Your Cart</Text>
        {cartItems.length == 0 ? <Text>No item in cart</Text> : <CartItems />}

        {/* Remove All  */}
        <View style={{marginTop: SPACING.space_15}}>
          <Button
            style={{alignSelf: 'flex-end'}}
            mode="text"
            onPress={() => clearCart()}>
            Remove All
          </Button>
        </View>
      </ScrollView>

      {/* Total Amount  */}

      <View style={{marginBottom: '30%'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: SPACING.space_15,
            marginBottom: SPACING.space_36,
          }}>
          <Text variant="titleMedium">Total Amount:</Text>

          <Text variant={'titleMedium'}>${totalAmount}</Text>
        </View>

        <Button
          style={{
            paddingVertical: '2%',
          }}
          icon="cash-fast"
          mode="contained"
          onPress={() => console.log('Pressed')}>
          Place Order
        </Button>
      </View>
    </View>
  );
};

export default OrdersScreen;

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
});
