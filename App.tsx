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

const json = require('./dummy.json');

function App(): React.JSX.Element {
  const {isNetwork, setNetwork} = useGlobalStore();

  const fetchDate = async () => {
    const response = await api.get<any>('top-headlines?country=in&pageSize=20');
    storeData('headlines', response.articles);
    console.log(response, 'headlines open');
    if (response.articles.length > 0) {
      onDisplayNotification({
        title: response.articles[0].title,
        content: 'Click to Open the News',
      });
    }
  };

  useEffect(() => {
    fetchDate();
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      if (!state.isConnected) {
        onDisplayNotification({
          title: 'No Network!',
          content: 'connect to network',
        });
        showToast('No Network! Offline mode enabled');
      }
      setNetwork(state.isConnected);
    });
    return () => unsubscribe(); // Cleanup function to remove listener
  }, []);

  const onEvent = async (taskId: any) => {
    if (isNetwork) {
      const response = await api.get<any>(
        'top-headlines?country=in&pageSize=5',
      );
      storeData('headlines', response.articles);
      if (response.articles.length > 0) {
        onDisplayNotification({
          title: response.articles[0].title,
          content: 'Click to Open the News',
        });
      }
    }

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
