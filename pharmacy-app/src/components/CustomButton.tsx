import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

interface CustomButtonProps {
  label: string;
  onPress: () => void;
}
const CustomButton: React.FC<CustomButtonProps> = ({label, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#76A593',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
