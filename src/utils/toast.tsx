import React from 'react';
import {ToastAndroid} from 'react-native';


export   const showToast = (content:string) => {
    ToastAndroid.show(content, ToastAndroid.SHORT);
  };