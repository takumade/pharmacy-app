import { Dimensions, Image, StyleSheet,  View } from 'react-native'
import React, { useState } from 'react'
import { Card, Text } from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel'
const Cardcarousel = () => {
  const [pagingEnabled, setPagingEnabled] = useState(true);
  const windowWidth = Dimensions.get('window').width;

  const list = [
    {
      id: 1,
      title: 'First Item',
      image: require('../assets/app_images/logos.jpg'),
    },
    {
      id: 2,
      title: 'Second Item',
      image: require('../assets/app_images/logos.jpg'),
    },
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Carousel
        width={windowWidth * 0.9} // Set the width to 80% of the window width
        height={windowWidth / 2}
        data={list}
        autoPlay={false}
        pagingEnabled={pagingEnabled}
        scrollAnimationDuration={2000}
        renderItem={({ item }) => (
          <View style={styles.CarouselItem}>
            <Image style={styles.img} source={item.image} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  CarouselItem: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 20,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});

export default Cardcarousel;

      {/* <Card  style={{ height: 150, width: 300 }} >
    <Card.Content>
      <Text variant="titleLarge">Get the latest drug</Text>
      <Text variant="bodyMedium">change it to carousel</Text>
    </Card.Content>
  </Card> */}