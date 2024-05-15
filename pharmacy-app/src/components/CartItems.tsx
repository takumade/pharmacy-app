import React, { FC } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { List } from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';
import useStore from '../store/store';
import { ScrollView } from 'react-native-gesture-handler';

const CartItem: FC = () => {
 const {cartItems=[]}:any = useStore((state) => state);
 console.log(cartItems)
  return (
    <ScrollView>
      <View>
        {
          cartItems?.map((item:any) => (
    <View style={styles.cartItemsContainer}>
      <List.Item
        title={<Text style={styles.title}>{item.brandName}</Text>}
        description={
          <View>
            <Text>Tablets .240mg</Text>
            <Text style={styles.price}>$10.00</Text>
          </View>
        }
        left={(props) => (
          <List.Image style={styles.image} source={{ uri: 'https://picsum.photos/700' }} />
        )}
        right={(props) => (
          <View>
            <FontAwesomeIcon style={{ alignSelf: 'flex-end' }} name="times" size={FONTSIZE.size_18} />

            <View style={styles.quantityContainer}>
              <FontAwesomeIcon name="minus" size={FONTSIZE.size_18} />
              <Text style={styles.quantityText}>10</Text>
              <FontAwesomeIcon name="plus" size={FONTSIZE.size_18} />
            </View>
          </View>
        )}
        style={styles.cartItem}
      />
    </View>
          ))
}
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
