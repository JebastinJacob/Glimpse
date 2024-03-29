import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {primaryColor, secondaryColor} from '../utils/colors';
import {useGlobalStore} from '../store/global';
interface categoryParams {
  name: string;
  category: string;
}
export default function Category({name, category}: categoryParams) {
  const {setCategory} = useGlobalStore();
  const selectedName = () => {
    setCategory(name);
    console.log(name);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={selectedName}
        style={{
          padding: 10,
          backgroundColor: name == category ? primaryColor : secondaryColor,
          borderRadius: 20,
          marginHorizontal: 5,
        }}>
        <Text>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}
