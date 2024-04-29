import {ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import {FONTSIZE, SPACING} from '../theme/theme';

import {Card, Button, Text} from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  productsContainer: {
    marginLeft: SPACING.space_30,
    marginRight: SPACING.space_30,
    marginTop: SPACING.space_30,
    marginBottom: SPACING.space_15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    gap: 12,
  },
  productCard: {width: 180, height: 240},
  productPicture: {
    height: 130,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});

const Products = () => (
  <ScrollView horizontal>
    <View style={styles.productsContainer}>
      <Card style={styles.productCard}>
        <Card.Cover
          style={styles.productPicture}
          source={{uri: 'https://picsum.photos/700'}}
        />
        <Card.Content>
          <Text variant="titleMedium">Vitamin D3</Text>
          <Text variant="bodyMedium">Tablets, 240mg</Text>
        </Card.Content>
        <Card.Actions>
          <Button>
            <FontAwesomeIcon name="plus" size={FONTSIZE.size_16} />
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.productCard}>
        <Card.Cover
          style={styles.productPicture}
          source={{uri: 'https://picsum.photos/700'}}
        />
        <Card.Content>
          <Text variant="titleMedium">Vitamin D3</Text>
          <Text variant="bodyMedium">Tablets, 240mg</Text>
        </Card.Content>
        <Card.Actions>
          <Button>
            <FontAwesomeIcon name="plus" size={FONTSIZE.size_16} />
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.productCard}>
        <Card.Cover
          style={styles.productPicture}
          source={{uri: 'https://picsum.photos/700'}}
        />
        <Card.Content>
          <Text variant="titleMedium">Vitamin D3</Text>
          <Text variant="bodyMedium">Tablets, 240mg</Text>
        </Card.Content>
        <Card.Actions>
          <Button>
            <FontAwesomeIcon name="plus" size={FONTSIZE.size_16} />
          </Button>
        </Card.Actions>
      </Card>
    </View>
  </ScrollView>
);

export default Products;
