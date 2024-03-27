import React, { useState, useEffect, Component } from 'react';
import { Animated, View, ScrollView, StyleSheet, Platform } from 'react-native';
import CustomText from './text';


interface AppBarProps {
  title: string;
  backgroundColor?: string; // Optional for customization
  homeComponent:any
}

const ScrollableAppBar: React.FC<AppBarProps> = ({ title, backgroundColor = '#C0C0C0',homeComponent }) => {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [appBarVisible, setAppBarVisible] = useState(true);

  const handleScroll = (event:any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setScrollY(new Animated.Value(offsetY));
    setAppBarVisible(offsetY <= 0); // Hide AppBar when scrolled down, show when at top
  };

  const animatedOpacity = scrollY.interpolate({
    inputRange: [0, Platform.OS === 'ios' ? 35 : 50], // Adjust threshold based on platform
    outputRange: [1, 0],
    extrapolate: 'clamp', // Clamp to avoid negative opacity
  });

//   useEffect(() => {
//     const unsubscribe = ScrollView.addListener('scroll', handleScroll);
//     return () => unsubscribe();
//   }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.appBar, { opacity: animatedOpacity }]}>
        <View style={{ backgroundColor }}>
          <CustomText text={title}/>
        </View>
      </Animated.View>
      <ScrollView onScroll={handleScroll}>
        {/* Your scrollable content here */}
        {homeComponent}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Ensure AppBar stays on top during scrolling
  },
});

export default ScrollableAppBar;