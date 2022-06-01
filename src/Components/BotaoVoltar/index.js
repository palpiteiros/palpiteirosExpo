import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { colorBranco, colorPretoFraco } from '../../Styles/Paleta/Paleta_cores';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function BotaoVoltarAoInicio({ acao, titulo }) {





  const css = StyleSheet.create({

    container_header: {
      marginBottom: 30,
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 15,
    },


    txtLobby: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colorPretoFraco,
      marginLeft: 15
    },


  })





  return (

    <View style={css.container_header}>

      <TouchableOpacity onPress={acao}>
        <Ionicons name='chevron-back-outline' size={35} color={colorPretoFraco} />
      </TouchableOpacity>

      <Text style={css.txtLobby}>{titulo}</Text>


    </View>

  );
}


