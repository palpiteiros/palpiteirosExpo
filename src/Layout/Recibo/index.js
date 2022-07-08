import { View, SafeAreaView, Image, StyleSheet, Share, Alert, TouchableOpacity, PixelRatio } from 'react-native';
import React, { useContext, useEffect, useRef, useState, useCallback } from 'react';
import { StackActions, useNavigation, NavigationAction } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import { Divider, Subheading, Title } from 'react-native-paper';
import VariacaoBotao from '../../Components/VariacaoBotao';
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import { UserContext } from '../../Rotas/UserProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const css = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },

  BgColor: {
    backgroundColor: 'white',
    padding: 10
  },

  rowAlinhada: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingLeft: 20,
    paddingRight: 30,
    marginTop: 10
  },

  rowAlinhadaContent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingLeft: 20,
    paddingRight: 30,
    marginTop: -10
  },

  fontTitle: {
    fontSize: 13,
    color: '#333333',
    width: 130,
    textAlign: 'center'
  },

  fontContent: {
    fontSize: 14,
    color: '#171717',
    width: 130,
    textAlign: 'center'
  },

  header: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 15,
  },

  spaceBottom: {
    marginBottom: 10
  },

  txtFooter: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 20
  },

  divisor: {
    marginTop: 10,
    marginBottom: 10
  },

  botaoDownload: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 15,
    top: 60
  },

  txtComVariacao: {
    margin: 10,
    marginTop: 10
  },


})

function ListaPalpites({ data }) {
  const { HoraCriacaoPalpite, IdJogo, IdLiga, TimeMandante, TimeVisitante, IdTimeMandante, IdTimeVisitante, IdUser, golsMandante, golsVisitante, resultado } = data;

  return (
    <View style={css.BgColor} key={IdJogo}>
      <Title style={css.header}>Palpite</Title>
      <View style={css.rowAlinhada}>
        <Subheading style={css.fontTitle}>Mandante</Subheading>
        <Subheading style={css.fontTitle}>Visitante</Subheading>
      </View>
      <View style={css.rowAlinhadaContent}>
        <Subheading style={css.fontContent}>{TimeMandante}</Subheading>
        <Subheading style={css.fontContent}>{TimeVisitante}</Subheading>
      </View>
      <Subheading style={css.txtFooter}>Seu palpite foi {resultado.tipo == "Empate" ? resultado.tipo : resultado.nomeTime} de {golsMandante > golsVisitante ? golsMandante + " - " + golsVisitante : golsVisitante + " - " + golsMandante}</Subheading>
      <Divider style={css.divisor} />
    </View>
  )
}

function HeaderRecibo({ detalhesPalpites }) {
  const { HoraCriacaoPalpite,HoraCriacaoPalpiteFormat, IdPalpite, Partidas } = detalhesPalpites;

  return (
    <View style={css.BgColor}> 
      <Title style={css.header}>Recibo do palpite</Title>
      <Subheading style={css.txtComVariacao}>Código palpite: {String(IdPalpite).substring(0, 8)}</Subheading>
      <Subheading style={{ margin: 10 }}>Data: {HoraCriacaoPalpiteFormat}</Subheading>
      <Divider style={css.divisor} />

    </View>
  )
}

export default function Recibo() {
  const { verifica_palpite_por_user, palpitesVerificacao, recibo_palpite } = useContext(FirebaseContext);
  const [selectedPrinter, setSelectedPrinter] = useState();
  const { user } = useContext(UserContext);
  const [palpite, setPalpite] = useState([]);
  const navigation = useNavigation();


  useEffect(() => {
    recibo_palpite('Palpites', user.uid)
  }, []);

  useEffect(() => {
    setPalpite(palpitesVerificacao);
  }, [palpitesVerificacao]);

  

  const voltarAoInicio = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'SideMenu' }]
    })
  }

  return (
    <SafeAreaView style={css.bg}>
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <HeaderRecibo detalhesPalpites={palpite} />}
        data={palpite.Partidas}
        key={item => item.IdJogo}
        renderItem={({ item }) => <ListaPalpites data={item} />}
      />
      <View style={css.BgColor}>
        <VariacaoBotao
          acao={voltarAoInicio}
          icone={''}
          TituloBotao={'Voltar ao inicio'}
        />
      </View>
    </SafeAreaView>
  );
}



