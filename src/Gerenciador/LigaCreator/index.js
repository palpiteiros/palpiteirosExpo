import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { colorVerde } from '../../Styles/Cores';


const Tab = createMaterialTopTabNavigator();

export default function LigaCreator() {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarIndicatorStyle:{ backgroundColor: colorVerde}
    }}
    >
      <Tab.Screen  name="Campeonatos" component={Step1} /> 
      <Tab.Screen name="Jogos" component={Step2} /> 
      <Tab.Screen name="Atributos finais" component={Step3} /> 

    </Tab.Navigator>
  );
}