import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity, Text, ScrollView, ImageBackground, Alert, FlatList } from 'react-native';
import { Card, List, Subheading, Title } from 'react-native-paper';
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import { UserContext } from '../../Rotas/UserProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colorVerdePadrao } from '../../Styles/Paleta/Paleta_cores';
import InputForm from '../../Components/InputForm';
import VariacaoBotao from '../../Components/VariacaoBotao';
import CardTransacao from '../../Components/CardTransacao';

const css = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: 10
  },

  Img: {
    height: 40,
    width: 40,
    borderRadius: 70,
    marginTop: 4,
    marginLeft: 15
  },

  card: {
    margin: 15,
    elevation: 10,
    height: 150,
    backgroundColor: colorVerdePadrao,
    paddingBottom: 10
  },

  containerHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: 'white',
    height: 230
  },

  espacoTop: {
    marginTop: 20
  },

  alinhamentoTxt: {
    textAlign: 'center'
  },

  botaoEdit: {
    position: 'absolute',
    right: 20,
    top: 15
  },

  botaoInfos: {
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center'
  },

  txtHeaderWallet: {
    color: 'black',
    marginLeft: 10,
    fontSize: 14,
  },

  txtFooterWallet: {
    marginLeft: 25
  },

  txtSaldo: {
    fontSize: 60,
    marginLeft: 10,
  },

  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    width: '100%'
  },

  contentBody: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },

  botaoMostrar: {
    position: 'absolute',
    right: 30
  },

  txtTopico: {
    marginLeft: 20,
    marginTop: 10,
  },

  cardDeposito: {
    elevation: 5,
    height: 60,
    margin: 15
  },

  form: {
    margin: 15
  }

});

function BoxHeader({ data, dataWallet, verificaVisibilidade, botaoEscondeSaldo }) {
  const { foto } = data;
  const { saldo } = dataWallet;
  let saldoFormat = saldo.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (
    <Card style={css.card}>
      <View style={css.contentHeader}>
        <Image
          style={css.Img}
          source={{ uri: foto }}
        />
        <Subheading style={css.txtHeaderWallet}>Saldo em conta</Subheading>
      </View>
      <View style={css.contentBody}>
        <Subheading style={css.txtFooterWallet}>R$</Subheading>
        <Text style={css.txtSaldo}>{verificaVisibilidade ? saldoFormat : "****"}</Text>

        <TouchableOpacity onPress={() => botaoEscondeSaldo()} style={css.botaoMostrar}>
          <MaterialCommunityIcons size={20} name={verificaVisibilidade ? 'eye-off' : 'eye'} />
        </TouchableOpacity>

      </View>
    </Card>
  );
}

function Topico({ titulo }) {
  return (
    <Title style={css.txtTopico}>{titulo}</Title>
  )
}

function CardNovoDeposito({ novoDeposito }) {
  return (
    <Card onPress={() => novoDeposito()} style={css.cardDeposito}>
      <List.Item
        title={'Fazer novo depósito'}
        left={props => <List.Icon {...props} icon={'arrow-up-thick'} color={colorVerdePadrao} />}
        right={props => <List.Icon {...props} icon={'cash-multiple'} color={colorVerdePadrao} />}
      />
    </Card>
  )
}

function FormNovoDeposito({ valorInput, setValorInput, salvaValorDeposito }) {

  return (
    <View style={css.form}>
      <InputForm
        hint={'Valor de depósito'}
        tipo={'numeric'}
        valor={valorInput}
        setValor={setValorInput}
      />
      {valorInput != '' && valorInput != 0 && valorInput != undefined ?
        <VariacaoBotao
          acao={salvaValorDeposito}
          icone={'chevron-forward-outline'}
          TituloBotao={'Proximo'}
        /> : null}
    </View>
  )
}

export default function MinhaCarteira() {
  const { dadosUser } = useContext(FirebaseContext);
  const [userData, setUserData] = useState(null);
  const [mostraSaldo, setMostraSaldo] = useState(true);
  const [cardDeposito, setCardDeposito] = useState(false);
  const [walletData, setWalletData] = useState({ saldo: 5000 });
  const [valorDeDeposito, setValorDeDeposito] = useState(0);

  useEffect(() => {
    setUserData(dadosUser)
  }, [dadosUser]);

  const esconde = () => {
    if (mostraSaldo == true) {
      setMostraSaldo(false);
    } else {
      setMostraSaldo(true);
    }
  }

  const novoDeposito = () => {
    setCardDeposito(true);
  }

  const salvaDeposito = () => {
    if (valorDeDeposito != '' && valorDeDeposito != 0 && valorDeDeposito != undefined) {
      console.log({valorDeDeposito: parseFloat(valorDeDeposito)})
    } else {
      Alert.alert('', '');
    }
  }

  const [trans, setTrans] = useState([]);

  useEffect(()=>{
    setTrans([
      {
        idTransacao:'Asdasd2a1d3sa15sd1',
        tipo: 'Entrada',
        valor: 150,
        date: '01/07/2022'
      },
      {
        idTransacao:'Bgas87s8da87sd11',
        tipo: 'Saida',
        valor: 50,
        date: '08/07/2022'
      },
    ])
  },[])


  return (
    <SafeAreaView style={css.bg}>
      <ScrollView>

        {userData != null && walletData != null ? <BoxHeader data={userData} dataWallet={walletData} botaoEscondeSaldo={esconde} verificaVisibilidade={mostraSaldo} /> : null}
        <Topico
          titulo={'Depósito via pix'}
        />

        {cardDeposito ?
          <FormNovoDeposito
            valorInput={valorDeDeposito}
            setValorInput={setValorDeDeposito}
            salvaValorDeposito={salvaDeposito}
          />
          :
          <CardNovoDeposito
            novoDeposito={novoDeposito} />}

        <Topico
          titulo={'Histórico'}
        />

        <FlatList
          data={trans}
          renderItem={({item})=> <CardTransacao data={item}/>}
        />

      </ScrollView>
    </SafeAreaView>
  );
}