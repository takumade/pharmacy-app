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
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';

import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Icon,
  Card,
  IconButton,
  Button,
  Avatar,
  RadioButton,
  Text,
} from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import Products from '../components/Products';
import ProductCategory from '../components/ProductCategory';
import HomeActionCards from '../components/HomeActionCards';

import {List} from 'react-native-paper';
import ProductCatalogue from '../components/ProductCatalogue';
import CartItems from '../components/CartItems';

const ProfileScreen = () => {
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
        <Text style={styles.ScreenTitle}>Your Profile</Text>

        <View style={{flexDirection: 'row', gap: 12, marginVertical: SPACING.space_16}}>
          <Avatar.Image
            size={100}
            source={require('../assets/app_images/avatar.jpg')}
          />

          <View style={{marginTop: SPACING.space_10}}>
            <View style={{flexDirection: "row", alignItems: "center", gap: 6}}>
            <Text variant="titleLarge">Richson Simbabwe</Text>

<Octicons name="verified" size={FONTSIZE.size_18} color={"blue"}/>
            </View>
            <Text variant="titleMedium">Male</Text>
            <Text variant="titleMedium">56</Text>
          </View>
        </View>

        <View style={{gap: 12, marginTop: SPACING.space_20}}>
          <TextInput
            label="Full Name*"
            secureTextEntry
            left={
              <TextInput.Icon
                icon={() => (
                  <FontAwesomeIcon
                    name="user-alt"
                    size={FONTSIZE.size_20}
                    color={COLORS.primaryDarkGreyHex}
                  />
                )}
              />
            }
          />

          <TextInput
            label="Email*"
            secureTextEntry
            left={
              <TextInput.Icon icon="email" color={COLORS.primaryDarkGreyHex} />
            }
          />

          <TextInput
            label="Mobile Number*"
            secureTextEntry
            left={
              <TextInput.Icon icon="phone" color={COLORS.primaryDarkGreyHex} />
            }
          />
        </View>

        {/* Currency */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: SPACING.space_20,
          }}>
          <Text variant="bodyLarge">Currency</Text>

          <RadioButton.Group onValueChange={newValue => {}} value={'usd'}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <RadioButton value="usd" />
                <Text>USD</Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton value="zig" />
                <Text>Zig</Text>
              </View>
            </View>
          </RadioButton.Group>
        </View>

        <View style={{marginTop: SPACING.space_15}}>
        <Button
          style={{
            paddingVertical: '2%',
          }}
          icon={() => <FontAwesomeIcon name="save" size={FONTSIZE.size_18} color={COLORS.primaryWhiteHex}/>}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          SAVE
        </Button>
        </View>
      </ScrollView>

      {/* Total Amount  */}

      <View style={{marginBottom: '30%'}}>

        <Button
          style={{
            paddingVertical: '2%',
          }}
          icon={() => <Octicons name="trash" size={FONTSIZE.size_18} color={COLORS.primaryWhiteHex}/>}
          buttonColor={COLORS.primaryRedHex}
          mode="contained"
          onPress={() => console.log('Pressed')}>
          DELETE MY ACCOUNT
        </Button>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    marginHorizontal: SPACING.space_30,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryBlackHex,
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
    marginLeft: SPACING.space_30,
    marginRight: SPACING.space_30,
    marginTop: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryWhiteHex,
    alignItems: 'center',
  },

  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});
