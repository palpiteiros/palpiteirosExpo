import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AdmMenu from '../../Gerenciador/AdmMenu';
import LigaCreator from '../../Gerenciador/LigaCreator';
import LigaManager from '../../Gerenciador/LigaManager';


const Stack = createNativeStackNavigator();

export default function AdmStack() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
      }}  headerMode='none'>
      <Stack.Screen name='Menu' component={AdmMenu} />
      <Stack.Screen name='Ligas' component={LigaManager} />
      <Stack.Screen name='Liga Editor' component={LigaCreator} />
    </Stack.Navigator>
  );
}