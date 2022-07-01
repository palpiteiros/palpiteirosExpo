import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { List, Subheading, Title } from 'react-native-paper';
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import { UserContext } from '../../Rotas/UserProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';

const css = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: '#F5f5f5',
    paddingBottom: 10
  },

  Img: {
    height: 130,
    width: 130,
    borderRadius: 70
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
  }
});

function BoxHeader({ data }) {
  const { email, nome, phone, foto } = data;

  return (
    <View style={css.containerHeader}>
      <TouchableOpacity style={css.botaoEdit}>
        <Ionicons name="create-outline" size={25} />
      </TouchableOpacity>
      <Image
        style={css.Img}
        source={{ uri: foto }}
      />
      <Subheading style={[css.espacoTop, css.alinhamentoTxt]}>{nome}</Subheading>
      <Subheading style={css.alinhamentoTxt}>{phone}</Subheading>
    </View>
  );
}

function BoxBody({ titulo, iconeEsquerda, iconeDireita }) {
  return (
    <TouchableOpacity style={css.botaoInfos}>
      <List.Item
        title={titulo}
        left={props => <List.Icon {...props} icon={iconeEsquerda} />}
        right={props => <List.Icon {...props} icon={iconeDireita} />}
      />
    </TouchableOpacity>
  );
}

export default function MeuPerfil() {
  const { dadosUser } = useContext(FirebaseContext);
  const [userData, setUserData] = useState(null);
 
  useEffect(() => {
    setUserData(dadosUser)
  }, [dadosUser]);

  return (
    <SafeAreaView style={css.bg}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {userData != null ? <BoxHeader data={userData} /> : null}
        <BoxBody titulo={'Editar informações'} iconeEsquerda={'account'} iconeDireita={'arrow-right'} />
        <BoxBody titulo={'Minha carteira'} iconeEsquerda={'wallet'} iconeDireita={'arrow-right'} />
        <BoxBody titulo={'Notificações'} iconeEsquerda={'bell'} iconeDireita={'arrow-right'} />
        <BoxBody titulo={'Segurança'} iconeEsquerda={'shield-key'} iconeDireita={'arrow-right'} />
        <BoxBody titulo={'Regras'} iconeEsquerda={'ballot'} iconeDireita={'arrow-right'} />
        <BoxBody titulo={'Ajuda'} iconeEsquerda={'alert-circle-check'} iconeDireita={'arrow-right'} />
        <BoxBody titulo={'Convidar amigo'} iconeEsquerda={'account-multiple-plus'} iconeDireita={'arrow-right'} />
        <BoxBody titulo={'Sair da conta'} iconeEsquerda={'exit-to-app'} iconeDireita={''} />
      </ScrollView>
    </SafeAreaView>
  );
}