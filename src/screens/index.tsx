import * as React from 'react';

import {Text} from '@rneui/base';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './home/home';
import SplashScreen from './splashscreen';
import CustomWebview from '../components/customWebview';

const Index = () => {
  const Stack = createNativeStackNavigator();


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" >
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false,animation:'flip'}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false,animation:'slide_from_right'}}/>
        <Stack.Screen name="Webview" component={CustomWebview} options={{headerShown: false,animation:'slide_from_right'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
