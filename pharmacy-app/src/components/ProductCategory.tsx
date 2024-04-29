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
import HeaderBar from './HeaderBar';
import CustomIcon from './CustomIcon';

import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Icon, Card, IconButton, Button, Text} from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  ProductCategoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
});

const ProductCategory = ({title}: {title: string}) => {
  return (
    <View style={styles.ProductCategoryContainer}>
      <Text variant="titleLarge">{title}</Text>

      <Text variant="titleMedium">See All</Text>
    </View>
  );
};

export default ProductCategory;
