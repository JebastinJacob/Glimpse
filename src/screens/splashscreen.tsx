import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
const Splash = require('../assets/splashscreen.png');

type RootStackParamList = {
  Home: undefined; // Define the parameter types for your routes here
  // Add other routes as needed
};

type HomeScreenNavigationProp = NavigationProp<RootStackParamList, 'Home'>;

export default function SplashScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  setTimeout(() => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  }, 1000);

  return <Image source={Splash} style={splashscreenStyle.image} />;
}

const splashscreenStyle = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
