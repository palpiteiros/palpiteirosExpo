import React, { useContext, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import Botao from '../../Components/Botao';
import ItemCardLigas from '../../Components/ItemCardLigas';
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import { UserContext } from '../../Rotas/UserProvider';
import { logOut } from '../../Services/UserServices';
import { colorCinza, colorVerdeClaro } from '../../Styles/Cores';
import { Card, Paragraph, Title } from 'react-native-paper';
import { colorVerdePadrao } from '../../Styles/Paleta/Paleta_cores';

const css = StyleSheet.create({
  bg: {
    flex: 1,
    paddingTop: 70,
    backgroundColor: '#f7f7f7'
  },

  containerCard: {
    paddingLeft: 15,
    paddingRight: 30,
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center'
  },

  circuloVerde: {
    height: 10,
    width: 10,
    borderRadius: 30,
    backgroundColor: colorVerdePadrao
  },

  containerTxt: {
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between'
  },

  txtFontTitle: {
    fontSize: 15
  },

  txtFontSub: {
    fontSize: 13
  },

  card: {
    margin: 15,
    marginTop: -50,
    marginBottom: -0
  }

});

function MostraCardPalpite({nave}) {

  const GoToPalpites = () => {
    nave.navigate('MeusPalpites')
  }

  return (
    <Card onPress={() => GoToPalpites()} style={css.card}>
      <View style={css.containerCard}>
        <View style={css.circuloVerde} />
        <View style={css.containerTxt}>
          <Title style={css.txtFontTitle}>Você tem palpites ativos</Title>
          <Paragraph style={css.txtFontSub}>Ver mais</Paragraph>
        </View>
      </View>
    </Card>
  );
}

export default function Home({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [ligas, setLigas] = useState([]);
  const [palpites, setPalpites] = useState([]);
  const { recuperar_todos_dados_colecao, dadosRecuperados, loading, verifica_palpite_por_user, palpitesVerificacao } = useContext(FirebaseContext);

  useEffect(() => {
    recuperar_todos_dados_colecao('Ligas');
    verifica_palpite_por_user('Palpites', user.uid);
  }, []);

  useEffect(() => {
    setLigas(dadosRecuperados);
    setPalpites(palpitesVerificacao);

  }, [dadosRecuperados, palpitesVerificacao]);

  const navegaParaDetalhes = (data) => {
    navigation.navigate('DetalhesLigasUser', { data: data })
  }

  return (
    <SafeAreaView style={css.bg}>
      {palpites.length != 0 ?
        <MostraCardPalpite nave={navigation} />
        : null}
      <FlatList
        data={ligas}
        renderItem={({ item }) => <ItemCardLigas data={item} abreDetalhes={navegaParaDetalhes} />}
      />
    </SafeAreaView>
  );
}