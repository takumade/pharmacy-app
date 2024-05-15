import React, {FC} from 'react';
import {StyleSheet, View, Button, ScrollView, Alert} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {List, Text} from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import useStore from '../store/store';

const MedicineCartItem: FC = () => {
  const {medicines = []}: any = useStore(state => state);

  return (
    <ScrollView>
      <View>
        {medicines?.data?.map((item: any) => (
          <View key={item.id} style={styles.cartItemsContainer}>
            <List.Item
              title={<Text variant="titleMedium">{item.medicineName}</Text>}
              description={
                <View>
                  <Text>{item.dosageStrength}</Text>
                  <Text
                    variant="bodyMedium"
                    style={{fontWeight: 'bold', marginTop: 12}}>
                    ${item.unitPrice}
                  </Text>
                </View>
              }
              left={props => (
                <List.Image style={{marginTop: 8}} source={{uri: item.image}} />
              )}
              right={props => (
                <View>
                  <FontAwesomeIcon
                    style={{alignSelf: 'flex-end'}}
                    name="times"
                    size={FONTSIZE.size_18}
                  />
                  <View
                    style={{
                      marginTop: '40%',
                    }}>
                    <Button
                      title="Add to Cart"
                      color="#76A593"
                      onPress={() =>
                        Alert.alert('Button with adjusted color pressed')
                      }
                    />
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
});

export default MedicineCartItem;
