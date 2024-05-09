import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
// import DatePicker from 'react-native-date-picker';

import InputField from '../components/InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomButton from '../components/CustomButton';
import  useStore  from '../store/store';


interface UserData {
    name: string;
    email: string;
    password: string;
}

const RegisterScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
 const {signUpUser} = useStore();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
 
  const [name,setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const handleSignUp = async () => {
    const userData: UserData = {
        name,
        email,
        password,
        
    }
    try{
        await signUpUser(userData);
    } catch(error) {
        console.log(error);
    }
 }
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

        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <Text>Google svg</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
           <Text>Facebook svg</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
           <Text>Xs svg</Text>
          </TouchableOpacity>
        </View> */}

        {/* <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
          Or, register with email ...
        </Text> */}

        <InputField
                  label={'Full Name'}
                  icon={<Ionicons
                      name="person-outline"
                      size={20}
                      color="#666"
                      style={{ marginRight: 5 }} />}
                       keyboardType={'email-address'}
                        fieldButtonLabel={''} 
                        fieldButtonFunction={function (): void {
                          throw new Error('Function not implemented.');
                      } }      
                      value={name}  />

        <InputField
                  label={'Email ID'}
                  icon={<Ionicons
                      name="mail-outline"
                      size={20}
                      color="#666"
                      style={{ marginRight: 5 }} />}
                  keyboardType="email-address" fieldButtonLabel={''} fieldButtonFunction={function (): void {
                      throw new Error('Function not implemented.');
                  } } value={email}        />

        <InputField
                  label={'Password'}
                  icon={<Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#666"
                      style={{ marginRight: 5 }} />} keyboardType={'email-address'} fieldButtonLabel={''} fieldButtonFunction={function (): void {
                          throw new Error('Function not implemented.');
                      } } value={password}        />



        <CustomButton label={'Register'} onPress={() => {handleSignUp}} />

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
