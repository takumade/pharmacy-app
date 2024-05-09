import React, {useContext, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import AuthContext, {useAuth} from '../contexts/AuthContext';


interface UserData {
  email: string;
  password: string;
}

const LoginScreen: React.FC<{navigation: any}> = ({navigation}) => {
  const {onLogin, onRegister} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    }
  };

  const register = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      login;
    }
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <Text>svg</Text>
        </View>
        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>
        <TextInput
          onChangeText={(text: string) => setEmail(text)}
          value={email}
          style={{
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
          placeholder="email"
        />
        <TextInput
          style={{
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text: string) => setPassword(text)}
          value={password}
        />
        <CustomButton label="Login" onPress={()=>login()} />
        
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: '#76A593', fontWeight: '700'}}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

function alert(msg: any) {
  throw new Error('Function not implemented.');
}
