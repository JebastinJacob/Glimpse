import React from 'react';
import {Text, StyleSheet} from 'react-native';

interface CustomTextProps {
  text: string;
  color?: string;
  fontSize?: number;
}

const CustomText: React.FC<CustomTextProps> = ({text, color, fontSize}) => {
  const styles = StyleSheet.create({
    text: {
      color: color || 'black',
      fontSize: fontSize || text == 'Glimpse' ? 20 : 16,
      fontWeight: text == 'Glimpse' ? 'bold' : 'normal',
    },
  });

  return <Text style={styles.text}>{text}</Text>;
};

export default CustomText;
