import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { Title } from 'react-native-paper';
import Botao from '../../Components/Botao';
import ItemCardLigas from '../../Components/ItemCardLigas';
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import { UserContext } from '../../Rotas/UserProvider';
import { logOut } from '../../Services/UserServices';
import { colorCinza } from '../../Styles/Cores';

const css = StyleSheet.create({
  bg: {
    flex: 1,
    paddingTop: 10
  }
})

export default function Home({navigation}) {
  const { user, setUser } = useContext(UserContext);
  const [ligas, setLigas] = useState([]);
  const { recuperar_todos_dados_colecao, dadosRecuperados, loading } = useContext(FirebaseContext);


  useEffect(() => {
    recuperar_todos_dados_colecao('Ligas');
  }, []);

  useEffect(() => {
    setLigas(dadosRecuperados)
  }, [dadosRecuperados]);

  const navegaParaDetalhes = (data) =>{
    navigation.navigate('DetalhesLigasUser', {data: data})
  } 

  return (
    <SafeAreaView style={css.bg}>
      <FlatList
        data={ligas}
        renderItem={({ item }) => <ItemCardLigas data={item} abreDetalhes={navegaParaDetalhes}  />}
      />
    </SafeAreaView>
  );
}