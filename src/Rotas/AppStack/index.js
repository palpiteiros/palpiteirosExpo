import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';
import DetalhesJogosUser from '../../Layout/DetalhesJogosUser';
import DetalhesLigasUser from '../../Layout/DetalhesLigasUser';
import Home from '../../Layout/Home';
import Notificacoes from '../../Layout/Notificacoes';
import Recibo from '../../Layout/Recibo';
import SideMenu from '../../Menu/SideMenu';

const Stack = createStackNavigator();

export default function HomeStack({route}) {
  

  //console.log(JSON.stringify(route));

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SideMenu'
        component={SideMenu}
        options={{
          headerShown: false,
          title: 'Palpiteiros',
          headerTitle: 'Palpiteiros'
        }}
      />

      

      

    </Stack.Navigator>
  );
}