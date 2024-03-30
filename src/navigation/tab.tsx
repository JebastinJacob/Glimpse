import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import React from 'react';
import Home from '../screens/home/home';
import NewsScreen from '../screens/news';
import {Icon} from '@rneui/base';
import {primaryColor, secondaryColor} from '../utils/colors';

export function TabNavigator() {
  const Tab = createBottomTabNavigator();
  const tabBarOptions = {
    tabBarActiveTintColor: primaryColor, // Color for the selected tab
    tabBarInactiveTintColor: secondaryColor, // Color for the unselected tabs
  };
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarInactiveTintColor: secondaryColor,
        tabBarActiveTintColor: primaryColor,
        tabBarIcon: ({color, size}) => {
          let iconName: string = 'home';
          const isFocused = useIsFocused();

          if (route.name === 'HomeTab') {
            iconName = 'home'; // MaterialCommunityIcons icon name
          } else if (route.name === 'News') {
            iconName = 'newspaper-o'; // Ionicons icon name
          }

          return (
            <Icon
              name={iconName}
              type="font-awesome"
              color={isFocused ? primaryColor : secondaryColor}
            />
          );
        },
      })}>
      {/* Define your tab screens */}
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="News"
        component={NewsScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
