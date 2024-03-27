import React, { useEffect, useState } from 'react'
import CustomText from '../../components/text'
import { Animated } from 'react-native'

interface TopStoriesProp {
    visible : boolean
}

export default function TopStories({visible}:TopStoriesProp){

      
  return (
    <Animated.View style={[{ position:"relative" }]}>
        <CustomText text='Top Stories' fontSize={20}color={"#002010"}/>

    </Animated.View>
  )
}
