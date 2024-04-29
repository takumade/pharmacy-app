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
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';

import { TextInput } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Icon, Card, IconButton, Button, Text } from 'react-native-paper';
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5"

const HomeScreen = () => {
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primaryBlackHex}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <HeaderBar />
        <Text style={styles.ScreenTitle}>Search for {'\n'}drugs below</Text>

        {/*Search input */}
        <View style={styles.InputContainerComponent}>
          {/* <TouchableOpacity>
            <CustomIcon
              name="search"
              color={COLORS.primaryBlackHex}
              size={FONTSIZE.size_18}
              style={styles.InputIcon}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.TextInputContainer}
            placeholder="Find Your Drug..."
          /> */}

<TextInput
      label="Search"
      placeholder='Search for drugs'
      left={<Ionicons name="search" size={FONTSIZE.size_18}  color={COLORS.primaryBlackHex}/>}
      style={{width: "100%"}}
    />



        </View>

       <HomeActionCards/>


    <View style={{...styles.InputContainerComponent, flexDirection:"row", justifyContent: "space-between", backgroundColor: "transparent"}}>
     <Text variant="titleLarge">Popular Items</Text>

     <Text variant='titleMedium'>See All</Text>
  </View>

  <Products />



     
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryBlackHex,
    paddingLeft: SPACING.space_30,
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryWhiteHex,
    alignItems: 'center',
  },
});

export default HomeScreen;

const Products = () => (
  <View style={{...styles.InputContainerComponent, flexDirection:"row", justifyContent: "space-between", backgroundColor: "transparent"}}>
  <Card style={{width: "45%"}}>
   
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Content>
      <Text variant="titleMedium">Vitamin D3</Text>
      <Text variant="bodyMedium">Tablets, 240mg</Text>
    </Card.Content>
    <Card.Actions>
      <Button><FontAwesomeIcon name="plus" size={FONTSIZE.size_16} /></Button>
    </Card.Actions>
  </Card>

  <Card  style={{width: "45%"}}>
   
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Content>
      <Text variant="titleMedium">Vitamin D3</Text>
      <Text variant="bodyMedium">Tablets, 240mg</Text>
    </Card.Content>
    <Card.Actions>
      <Button><FontAwesomeIcon name="plus" size={FONTSIZE.size_16} /></Button>
    </Card.Actions>
  </Card>

  </View>
)


const HomeActionCards = () => {
  return (

    <View style={{...styles.InputContainerComponent, flexDirection:"row", justifyContent: "space-between", backgroundColor: "transparent"}}>
  

  <Card style={{width: "32%"}}>

<Card.Content  style={{alignItems: "center"}}>
<FontAwesomeIcon name="plus-circle" size={FONTSIZE.size_24} />
  <Text variant="titleMedium">Medication</Text>

</Card.Content>
</Card>

<Card style={{width: "32%"}}>

<Card.Content style={{alignItems: "center"}}>
<Ionicons name="bag-outline" size={FONTSIZE.size_24} />
<Text variant="titleMedium">Orders</Text>

</Card.Content>
</Card>

<Card style={{width: "32%"}}> 

<Card.Content  style={{alignItems: "center"}}>
<Ionicons name="chatbox-outline" size={FONTSIZE.size_24} />
<Text variant="titleMedium">Support</Text>

</Card.Content>
</Card>
    </View>

 

  )
}
