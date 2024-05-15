import {StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import useStore from '../store/store';
import {ScrollView} from 'react-native-gesture-handler';
import { ScreenContainer } from 'react-native-screens';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme';


const PharmacyDetails: FC = () => {
  const {medicines = []}: any = useStore(state => state); // provide a default value
  console.log(medicines);
  return (
    <ScrollView>
   
        {medicines?.data?.map((item: any) => (
            <View key={item?._id} style={styles.screenContainer}>
            <Text style={styles.ScreenTitle}>{item?.owner?.name}</Text>
           <Text>{item?.owner?.operatingHours?.weekdays?.start + ' - ' + item?.owner?.operatingHours?.weekdays?.end}</Text> 
            </View>
        
        ))}
  

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    padding: 15,
    flexGrow: 1,
    marginLeft:10
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryBlackHex,
  },
});

export default PharmacyDetails;


