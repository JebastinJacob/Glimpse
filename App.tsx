/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import BackgroundFetch from 'react-native-background-fetch';

import Index from './src/screens/index';
import {
  onDisplayNotification,
  clearNotification,
} from './src/utils/notfication';
import NetInfo from '@react-native-community/netinfo';
import {useGlobalStore} from './src/store/global';
import {showToast} from './src/utils/toast';
import {storeData} from './src/database/asyncstorage';
import api from './src/utils/api';

function App(): React.JSX.Element {
  const {isNetwork, setNetwork} = useGlobalStore();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      console.log(state, state.isConnected, 'network status');
      if (!state.isConnected) {
        onDisplayNotification({
          title: 'No Network!',
          content: 'connect to network',
        });
        showToast('No Network');
      }
      onDisplayNotification({
        title: ' Network connected',
        content: 'Networ available',
      });
      setNetwork(state.isConnected);
    });
    return () => unsubscribe(); // Cleanup function to remove listener
  }, []);

  const onEvent = async (taskId: any) => {
    console.log('[BackgroundFetch] task: ', taskId);
    onDisplayNotification({
      title: 'Connected to internet!',
      content: 'Fetching Latest News',
    });
    const response = await api.get<any>('top-headlines?country=in&pageSize=20');
    storeData('headlines', response.articles);

    if (response.article.length > 0) {
      onDisplayNotification({
        title: response.article[0].title,
        content: 'Click to Open the News',
      });
    }
    // Do your background work...
    // await addEvent(taskId);
    // IMPORTANT:  You must signal to the OS that your task is complete.
    // setTimeout(() => {
    //   clearNotification()
    // }, 5000);
    BackgroundFetch.finish(taskId);
  };

  // Timeout callback is executed when your Task has exceeded its allowed running-time.
  // You must stop what you're doing immediately BackgroundFetch.finish(taskId)
  const onTimeout = async (taskId: any) => {
    console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
    onDisplayNotification({
      title: 'Task Timeout',
      content: 'Fetching Latest News',
    });
    BackgroundFetch.finish(taskId);
  };

  useEffect(() => {
    const registerBackgroundFetch = async () => {
      BackgroundFetch.configure(
        {minimumFetchInterval: 15, stopOnTerminate: false},
        onEvent,
        onTimeout,
      );
    };

    registerBackgroundFetch();
  }, []);

  return <Index />;
}

export default App;
