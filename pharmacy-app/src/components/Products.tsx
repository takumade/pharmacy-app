import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { Card, Button, Text } from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import useStore from '../store/store';

interface ProductsCardProps {
  id: string;
  index: number;
  type: string;
}

const images = [
  { name: 'Image 1', url: 'https://bootiespharmacies.com/media/3423' },
  { name: 'Image 2', url: 'https://bootiespharmacies.com/media/4057' },
  { name: 'Image 3', url: 'https://bootiespharmacies.com/media/2864' },
];

const Products = () => {
  const {medicines = [],addItemToCart}: any = useStore(state => state);
  addItemToCart
  return (
    <ScrollView horizontal>
    <View style={styles.productsContainer}>
      {images.map((image, index) => (
        <Card key={index} style={styles.productCard}>
          <Card.Cover style={styles.productPicture} source={{ uri: image.url }} />
          <Card.Content>
            <Text style={styles.cardHeaderStyle} variant="titleMedium">
              {image.name}
            </Text>
            <Text style={styles.cardDescription} variant="bodyMedium">
              Tablets, 240mg
            </Text>
          </Card.Content>
          <Card.Actions>
            <Button>
              <FontAwesomeIcon name="plus" size={FONTSIZE.size_16} color={'#902CC0'}  onPress={() => addItemToCart(images)} />
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </View>
  </ScrollView>
  )
 


}

const styles = StyleSheet.create({
  productsContainer: {
    marginTop: SPACING.space_30,
    marginBottom: SPACING.space_15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    gap: 12,
  },
  productCard: {
    width: 158,
    height: 240,
    borderRadius: BORDERRADIUS.radius_15,
  },
  productPicture: {
    height: 130,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardHeaderStyle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryBlackHex,
  },
  cardDescription: {
    fontFamily: FONTFAMILY.poppins_regular,
  },
});

export default Products;