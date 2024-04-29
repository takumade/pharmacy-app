import {StyleSheet, View} from 'react-native';
import React from 'react';
import {ScreenContainer} from 'react-native-screens';
import {FONTSIZE, SPACING} from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Icon, Card, Text} from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
  homeActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    marginLeft: SPACING.space_30,
    marginRight: SPACING.space_30,
    marginTop: SPACING.space_30,
  },
  cardStyle: {width: '32%', backgroundColor: 'white'},
});

const HomeActionCards = () => {
  return (
    <View style={styles.homeActionContainer}>
      <Card style={styles.cardStyle}>
        <Card.Content style={{alignItems: 'center'}}>
          <FontAwesomeIcon name="plus-circle" size={FONTSIZE.size_24} />
          <Text variant="titleMedium">Medication</Text>
        </Card.Content>
      </Card>

      <Card style={styles.cardStyle}>
        <Card.Content style={{alignItems: 'center'}}>
          <Ionicons name="bag-outline" size={FONTSIZE.size_24} />
          <Text variant="titleMedium">Orders</Text>
        </Card.Content>
      </Card>

      <Card style={styles.cardStyle}>
        <Card.Content style={{alignItems: 'center'}}>
          <Ionicons name="chatbox-outline" size={FONTSIZE.size_24} />
          <Text variant="titleMedium">Support</Text>
        </Card.Content>
      </Card>
    </View>
  );
};


export default HomeActionCards