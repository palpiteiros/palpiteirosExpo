import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Home from '../../Layout/Home';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  );
}