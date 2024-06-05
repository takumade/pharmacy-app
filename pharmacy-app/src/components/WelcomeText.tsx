import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme'

const WelcomeText = () => {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
      const currentHour = new Date().getHours();
      if (currentHour < 12) {
        setGreeting('Good morning');
      } else if (currentHour < 18) {
        setGreeting('Good afternoon');
      } else {
        setGreeting('Good evening');
      }
    }, []);
  return (
    <View>
      <Text style={styles.ScreenTitle}>{greeting} Takunda</Text>
      <Text style={{color: COLORS.primaryWhiteHex}}>What do you want to do today?</Text>
    </View>
  )
}
const styles = StyleSheet.create({
    ScreenTitle: {
        fontSize: FONTSIZE.size_16,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryWhiteHex,
      },
    
})
export default WelcomeText

