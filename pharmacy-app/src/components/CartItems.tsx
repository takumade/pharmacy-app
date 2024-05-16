import React, {FC} from 'react';
import {StyleSheet, View, Text, Touchable} from 'react-native';
import {List} from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';
import useStore from '../store/store';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableOpacity} from '@gorhom/bottom-sheet';

const CartItem: FC = () => {
  const {cartItems = [], removeItemFromCart,incrementItemQuantity}: any = useStore(state => state);
  console.log(cartItems)
  return (
    <ScrollView>
      <View>
        {cartItems?.map((item: any) => (
          <View key={item._id} style={styles.cartItemsContainer}>
            <List.Item
              title={<Text style={styles.title}>{item.brandName}</Text>}
              description={
                <View>
                  <Text>{item.dosageStrength}</Text>
                  <Text style={styles.price}>${item.unitPrice}</Text>
                </View>
              }
              left={props => (
                <List.Image style={styles.image} source={{uri: item.image}} />
              )}
              right={props => (
                <View>
                  <TouchableOpacity onPress={() => removeItemFromCart(item._id)}>
                    <FontAwesomeIcon
                      style={{alignSelf: 'flex-end'}}
                      name="times"
                      size={FONTSIZE.size_18}
                    />
                  </TouchableOpacity>
                  <View >
                    <FontAwesomeIcon name="minus" size={FONTSIZE.size_18} />
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                  <TouchableOpacity key={item._id} onPress={() => incrementItemQuantity(item._id)}>
                    <FontAwesomeIcon name="plus" size={FONTSIZE.size_18} />
                  </TouchableOpacity>
                  </View>
                </View>
              )}
              style={styles.cartItem}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cartItemsContainer: {
    borderRadius: BORDERRADIUS.radius_20,
  },
  cartItem: {
    backgroundColor: COLORS.primaryWhiteHex,
    borderRadius: BORDERRADIUS.radius_20,
    paddingLeft: SPACING.space_15,
    marginTop: SPACING.space_10,
  },
  title: {
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
  },
  image: {
    marginTop: SPACING.space_8,
  },
  quantityContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginTop: '40%',
  },
  quantityText: {
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: FONTSIZE.size_16,
    fontWeight: 'bold',
    marginTop: SPACING.space_12,
  },
});

export default CartItem;
