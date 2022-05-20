import React from 'react';
import Intro from '../../Layout/Intro';
import Cadastro from '../../Layout/Cadastro';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../Layout/Login';


const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }} headerMode='none'>
      <Stack.Screen name='Intro' component={Intro} />
      <Stack.Screen name='Cadastro' component={Cadastro} />
      <Stack.Screen name='Login' component={Login} />
    </Stack.Navigator>
  );
}