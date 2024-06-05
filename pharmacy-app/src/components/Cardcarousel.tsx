import { StyleSheet,  View } from 'react-native'
import React from 'react'
import { Card, Text } from 'react-native-paper';
const Cardcarousel = () => {
  return (
    <View style={{marginLeft: 10,marginRight: 10}}>
      <Card >
    <Card.Content>
      <Text variant="titleLarge">Card title</Text>
      <Text variant="bodyMedium">Card content</Text>
    </Card.Content>
  </Card>
    </View>
  )
}
const styles = StyleSheet.create({
    
})
export default Cardcarousel

