import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, StyleSheet, FlatList } from 'react-native';
import BotaoVoltarAoInicio from '../../Components/BotaoVoltar';
import Fab from '../../Components/Fab';
import { Title } from 'react-native-paper';
import ItemCardLigas from '../../Components/ItemCardLigas';




const css = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  row: {
    flexDirection: 'row'
  },

  heard: {
    height: 80,
  },

  body: {
    paddingLeft: 20

  }
});






export default function LigaManager({ navigation }) {



  const [dados, setDados] = useState();


  useEffect(()=>{
    setDados([
      {
        "id": 1,
        "banner": 'https://2.bp.blogspot.com/-DtuSGo7zfHw/VduFxAAVLAI/AAAAAAAAxn0/huRCDzObDoc/s1600/Vazco%2Bda%2BGama%2BRJ.png',
        "nomeLiga": "Liga dos Milionarios",
        "descLiga": "Descricao aqui",
        "Campeonatos": "Copa do mundo",
        "Fechamento": "26/05 ás 15:26",
        "DataCriacao": "12/04 ás 12:00",
        "Resultado": "Brasil" ,
        "jogoPmesa": 15,
        "nMesas": 20,
        "nJogadores": 125,
        "TotalPalpites": 250,
        "Entrada": "R$ 10,00",
        "Premio": "R$ 2.500,00"

      }

    ])


  },[])






  return (
    <SafeAreaView style={css.container}>


      <View style={css.body}>

        <Title>Ligas criadas</Title>


      </View>

      <FlatList
        data={dados}
        renderItem={({ item }) => <ItemCardLigas data={item} />}
        keyExtractor={item => item.id}
      />

      <Fab
        icone={'plus'}
        acao={()=> navigation.navigate('Liga creator')}
      />



    </SafeAreaView>
  );
}

