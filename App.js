import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FirebaseProvider from './src/Contexts/FirebaseContext';
import Rotas from './src/Rotas';



export default function App() {
  return (
    <FirebaseProvider>
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
