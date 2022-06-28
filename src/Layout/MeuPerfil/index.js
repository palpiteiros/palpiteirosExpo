import React from 'react';
import { View, StyleSheet,SafeAreaView } from 'react-native';
import { Title } from 'react-native-paper';



const css = StyleSheet.create({
    bg: {flex: 1}
  })

export default function MeuPerfil() {
 return (
   <SafeAreaView>
    <Title>Perfil</Title>
   </SafeAreaView>
  );
}