import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface CustomTextProps {
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: string;
}

const CustomText: React.FC<CustomTextProps> = ({ text, color, fontSize, fontWeight }) => {
  const styles = StyleSheet.create({
    text: {
      color: color || 'black', // Default color to black
      fontSize: fontSize || 16, // Default font size to 16
      fontWeight:"normal", // Default font weight to normal
    },
  });

  return (
    <Text style={styles.text}>
      {text}
    </Text>
  );
};

export default CustomText;