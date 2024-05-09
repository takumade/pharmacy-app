import React from 'react';

import {StyleSheet, View, ScrollView, StatusBar, Image} from 'react-native';
import {ScreenContainer} from 'react-native-screens';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

import {List, Text} from 'react-native-paper';

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  productCatalogueContainer: {
    marginTop: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: '#76A593',
  },
  productCatalogueItem: {
    backgroundColor: '#76A593',
    borderRadius: BORDERRADIUS.radius_20,
    paddingLeft: SPACING.space_15,
    marginTop: SPACING.space_10,
  },
});

const ProductCatalogue = () => {
  return (
    <View style={styles.screenContainer}>
      <ScrollView style={styles.productCatalogueContainer}>
        <List.Item
          title={<Text variant="titleMedium">Medication</Text>}
          left={props => (
            <List.Image source={{uri: 'https://picsum.photos/700'}} />
          )}
          style={styles.productCatalogueItem}
        />
      </ScrollView>
    </View>
  );
};

export default ProductCatalogue;

