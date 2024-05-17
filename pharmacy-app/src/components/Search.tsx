import { StyleSheet, Text, View } from 'react-native'
import React,{FC,useEffect, useState} from 'react'
import {Searchbar} from 'react-native-paper';
import useStore from '../store/store';

const Search: FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { medicines = [], searchMedicines }:any = useStore((state) => state); // provide a default value
   

    const handleSearch = async() : Promise<void> => {
      await searchMedicines(searchQuery);
    }
    
  return (
    <View>
     <Searchbar 
     placeholder='Search for drugs' 
     onChangeText={setSearchQuery}
     value={searchQuery}
      onSubmitEditing={handleSearch}/> 
     
    </View>
  )
}
const styles = StyleSheet.create({})
export default Search

