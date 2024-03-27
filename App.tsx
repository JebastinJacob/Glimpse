/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import Index from './src/screens/index';
import Splashscreen from './src/screens/splashscreen';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {addPlugin} from 'react-native-flipper';

function App(): React.JSX.Element {
  const [status, setStatus] = useState('Waiting for Flipper Desktop Player...');
  const [gameState, setGameState] = useState({
    cells: [],
    turn: ' ',
    winner: ' ',
  });
  const [connection, setConnection] = useState(null);
  
  useEffect(() => {
    addPlugin({
      getId() {
        return 'ReactNativeTicTacToe';
      },
      onConnect(connection:any) {
        setStatus('Desktop player present');
        setConnection(connection);

        // listen to updates
        connection.receive('SetState', (gameState:any, responder:any) => {
          if (gameState.winner !== ' ') {
            setStatus(
              `Winner is ${gameState.winner}! Waiting for a new game...`,
            );
          } else {
            setStatus(
              gameState.turn === 'X'
                ? 'Your turn...'
                : 'Awaiting desktop players turn...',
            );
          }
          setGameState(gameState);
          responder.success();
        });

        // request initial state
        connection.send('GetState');
      },
      onDisconnect() {
        setConnection(null);
        setStatus('Desktop player gone...');
      },
    });
  }, []);


  return <Index />;
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
