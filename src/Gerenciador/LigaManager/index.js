import React, { useState, useEffect, useContext } from 'react';
import { Text, SafeAreaView, View, StyleSheet, FlatList } from 'react-native';
import BotaoVoltarAoInicio from '../../Components/BotaoVoltar';
import Fab from '../../Components/Fab';
import { Title } from 'react-native-paper';
import ItemCardLigas from '../../Components/ItemCardLigas';
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import Pb from '../../Components/Pb';




const css = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 60
  },
  row: {
    flexDirection: 'row'
  },

  heard: {
    height: 80,
  },

  body: {

  },

  font: {
    paddingLeft: 20,
    marginTop: 10,
    marginBottom: 10
  }
});



function getTitle(ligas, loading) {
  if(ligas.length == 0 && loading) {
    return 'Carregando...'
  } else if (ligas.length > 0) {
    return 'Ligas Recentes';
  } else {
    return 'Nenhuma Liga criada';
  }
};


export default function LigaManager({ navigation }) {

  const { recuperar_todos_dados_colecao, dadosRecuperados, loading } = useContext(FirebaseContext);
  const [ligas, setLigas] = useState([]);




  useEffect(() => {

    const getData = recuperar_todos_dados_colecao("ligas");

    return () => {
      
    };

  }, []);


  useEffect(() => {

    setLigas(dadosRecuperados);

    return () => {
      setLigas([]);
    };

  }, [dadosRecuperados]);





  const DetalhesLiga = (data) => {
    navigation.navigate('Detalhes liga', data);
  }









  return (
    <SafeAreaView style={css.container}>


      <View style={css.body}>

        <Title style={css.font}>{getTitle(ligas, loading)}</Title>


        {loading ?
          <Pb cor={"#000000"} />
          :
          <FlatList
            data={ligas}
            renderItem={({ item }) => <ItemCardLigas data={item} abreDetalhes={DetalhesLiga}/>}
            keyExtractor={item => item.id}
          />
        }



      </View>



      <Fab
        icone={'plus'}
        acao={() => navigation.navigate('Liga creator')}
      />



    </SafeAreaView>
  );
}

