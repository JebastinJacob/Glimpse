import React, { useState, useEffect } from 'react';
import { Animated, View, StyleSheet, Platform } from 'react-native';
import CustomText from './text';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

interface AppBarProps {
  title: string;
  backgroundColor?: string; // Optional for customization
  isVisible: boolean; // Boolean parameter to control visibility
}

const ScrollableAppBar: React.FC<AppBarProps> = ({ title, backgroundColor = '#C0C0C0', isVisible }) => {
  const [scrollY] = useState(new Animated.Value(0));
  //const [appBarVisible, setAppBarVisible] = useState(isVisible);
  const navigation = useNavigation();
  
  useEffect(() => {
    toggleAppBarVisibility(isVisible);
  }, [isVisible]);

  

  const toggleAppBarVisibility = (visible: boolean) => {
    Animated.timing(scrollY, {
      toValue: visible ? 1 : 0,
      duration: 500, // Adjust duration as needed
      useNativeDriver: true,
    }).start(() => {
      //setAppBarVisible(visible);
    });
  };

  const animatedOpacity = scrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.container, { opacity: animatedOpacity,position:isVisible?"absolute":"relative"  }]}>
      <Icon onPress={navigation.goBack}
        name='arrow-back-ios'
        type='material'
        />
        <View style={{ backgroundColor }}>
          <CustomText text={title}/>
        </View>
      <></>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection:'row',
    justifyContent:"space-evenly"
  },
  
});

export default ScrollableAppBar;
