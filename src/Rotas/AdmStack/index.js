import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AdmMenu from '../../Gerenciador/AdmMenu'; 
import LigaManager from '../../Gerenciador/LigaManager';
import Step1 from '../../Gerenciador/LigaCreator/Step1';
import Step2 from '../../Gerenciador/LigaCreator/Step2';
import Step3 from '../../Gerenciador/LigaCreator/Step3';
import LigaCreator from '../../Gerenciador/LigaCreator';
import DetalhesLiga from '../../Gerenciador/DetalhesLiga';
import PalpiteirosManager from '../../Gerenciador/PalpiteirosManager';




const Stack = createNativeStackNavigator();

export default function AdmStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Menu' options={{headerShown: false}} component={AdmMenu} />
      <Stack.Screen name='Ligas' component={LigaManager} />
      <Stack.Screen name='Liga creator' component={LigaCreator} /> 
      <Stack.Screen name="Palpiteiros" component={PalpiteirosManager} />
      <Stack.Screen name="Atributos finais" component={Step3} />
      <Stack.Screen name="Detalhes liga" component={DetalhesLiga} />
    </Stack.Navigator>
  );
}