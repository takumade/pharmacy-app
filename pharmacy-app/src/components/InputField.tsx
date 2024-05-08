import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TextStyle,
  ViewStyle,
} from 'react-native';

interface InputFieldProps {
  label: string;
  icon: JSX.Element;
  keyboardType: 'default' | 'email-address';
  fieldButtonLabel: string;
  fieldButtonFunction: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  icon,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {icon}
      <TextInput
        placeholder={label}
        keyboardType={keyboardType}
        style={{flex: 1, paddingVertical: 0}}
        secureTextEntry={keyboardType === 'default' ? false : true}
      />
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={buttonTextStyle}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const buttonTextStyle: TextStyle = {
  color: '#76A593',
  fontWeight: '700',
};

export default InputField;
