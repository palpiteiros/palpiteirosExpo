import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FirebaseProvider from './src/Contexts/FirebaseContext';
import Rotas from './src/Rotas';

import 'react-native-gesture-handler';

export default function App() {
  return (
    <FirebaseProvider>
    <StatusBar hidden={true}/>
      <Rotas />
    </FirebaseProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
