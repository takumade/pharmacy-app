import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import useStore from '../store/store';

const StoreScreen = () => {
  const { items, getItems } = useStore((state) => state);

  useEffect(() => {
    getItems();
  }, [getItems]);

  console.log(items)
  const renderItem = ({ item }: { item: any }) => (
    <Text>{item.type}</Text>
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
      />
      <Text>Store Screen</Text>
    </View>
  );
};

export default StoreScreen;