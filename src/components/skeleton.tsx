import {Skeleton} from '@rneui/themed';
import React from 'react';
import {Dimensions, StyleSheet, View, Animated} from 'react-native';

export default function SkeletonCard() {
  return (
    <View style={style.stack}>
      <Skeleton
        width={Dimensions.get('screen').width - 30}
        style={{borderRadius: 8, backgroundColor: 'grey', marginTop: 10}}
        animation={'pulse'}
        height={250}
      />
      <Skeleton
        width={Dimensions.get('screen').width - 30}
        style={{borderRadius: 8, backgroundColor: 'grey', marginTop: 10}}
        animation={'pulse'}
        height={250}
      />
    </View>
  );
}

const style = StyleSheet.create({
  stack: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
