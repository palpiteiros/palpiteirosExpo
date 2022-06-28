import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import DetalhesJogosUser from '../../Layout/DetalhesJogosUser';
import DetalhesLigasUser from '../../Layout/DetalhesLigasUser';
import Home from '../../Layout/Home';
import SideMenu from '../../Menu/SideMenu';


export default function HomeStack() {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName='SideMenu'
    >
      <Stack.Screen
        name='SideMenu'
        component={SideMenu}
        options={{
          headerShown: false,
          title: 'Palpiteiros',
          headerTitle: 'Palpiteiros'
        }}
      />

      <Stack.Screen
        name='DetalhesLigasUser'
        component={DetalhesLigasUser}
        options={{
          title: 'Detalhes da liga',
          headerTitle: 'Detalhes da liga'
        }}
      />

      <Stack.Screen
        name='DetalhesJogosUser'
        component={DetalhesJogosUser}
        options={{
          title: 'Detalhes dos jogos',
          headerTitle: 'Detalhes dos jogos',
          headerShown: false
        }}
      />

    </Stack.Navigator>
  );
}