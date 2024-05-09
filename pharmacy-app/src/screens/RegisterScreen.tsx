import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
// import DatePicker from 'react-native-date-picker';

import InputField from '../components/InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomButton from '../components/CustomButton';
import AuthContext, {useAuth} from '../contexts/AuthContext';


interface UserData {
    name: string;
    email: string;
    password: string;
}

const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const {onLogin, onRegister} = useAuth();
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    const result = await onLogin!(email, password);
    if (result && result.error) {
      console.log(result.msg);
    }
  };
  const register = async () => {
    const result = await onRegister!(name, email, password);
    if (result && result.error) {
      console.log("not registered")
      console.log(result.msg);
    } else {
      login();
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25, marginTop: 30 }}>
        <View style={{ alignItems: 'center' }}>
        <Text>reg logo</Text>
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Register
        </Text>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons
            name="person-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5,paddingBottom: 8, marginBottom: 25 }} 
          />
          <TextInput
            onChangeText={(text: string) => setName(text)}
            value={name}
            style={{
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
              flex: 1,
            }}
            placeholder="Full Name"
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5,paddingBottom: 8, marginBottom: 25 }} 
          />
          <TextInput
            onChangeText={(text: string) => setEmail(text)}
            value={email}
            style={{
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
              flex: 1,
            }}
            placeholder="email"
          />
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#666"
            style={{ marginRight: 5,paddingBottom: 8, marginBottom: 25 }} 
          />
          <TextInput
            style={{
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              paddingBottom: 8,
              marginBottom: 25,
              flex: 1,
            }}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text: string) => setPassword(text)}
            value={password}
          />
        </View>

     

      



        <CustomButton label={'Register'} onPress={() => {register()}} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: '#76A593', fontWeight: '700' }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
