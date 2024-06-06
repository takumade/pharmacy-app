import { StyleSheet,  View } from 'react-native'
import React from 'react'
import { Card, Text } from 'react-native-paper';
const Cardcarousel = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Card  style={{ height: 150, width: 300 }} >
    <Card.Content>
      <Text variant="titleLarge">Get the latest drug</Text>
      <Text variant="bodyMedium">change it to carousel</Text>
    </Card.Content>
  </Card>
    </View>
  )
}
const styles = StyleSheet.create({
    
})
export default Cardcarousel

