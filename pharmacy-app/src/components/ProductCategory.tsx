import {
  StyleSheet,
  // Text,
  // TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import {
  SPACING,
} from '../theme/theme';

import {Button, Text} from 'react-native-paper';

const styles = StyleSheet.create({
  ProductCategoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    marginTop: SPACING.space_30,
    alignItems: "center"
  },
});

const ProductCategory = ({title}: {title: string}) => {
  return (
    <View style={styles.ProductCategoryContainer}>
      <Text variant="titleLarge">{title}</Text>

      

      <Button mode="text" onPress={() => console.log('Pressed')}>
    See All
  </Button>
    </View>
  );
};

export default ProductCategory;
