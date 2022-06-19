import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, FlatList} from 'react-native';
import { Divider, Headline, List, Subheading } from 'react-native-paper';
import ItemDataHora from '../../Components/ItemDataHora';
import ItemJogoMasterAdm from '../../Components/ItemJogoMasterAdm';
import { dateToYMD } from '../../Objects/Datas';
import { colorCinza } from '../../Styles/Cores';

const css = StyleSheet.create({
    container: {
      flex: 1,
    },
    containerHeader: {
        flex: 1,
        backgroundColor: '#fff'
    },
    row: {
      flexDirection: 'row'
    },
  
    heard: {
      height: 80,
    },
    img: {
        width: '100%',
        height: 190
    },
    headline: {
        fontWeight: 'bold',
        marginLeft: 16,
        marginTop: 16
    },
    subhead: {
        marginLeft: 16,
    },
    row: {
        flexDirection: 'row'
    },
    divider: {
        marginTop: 20,
    },
    btView: {
        borderWidth: 1,
        borderColor: colorCinza,
        borderRadius: 8,
        flex: 1,
        marginLeft: 8,
        marginRight: 8
    },
    contentBtView: {
        
    },
    espacingRow: {
        paddingLeft: 8,
        paddingRight: 8,
        marginTop: 16,
        marginBottom: 16
    }
});

function ButtonView({title, description, click}) {

    return(
        <TouchableOpacity onPress={click} style={css.btView}>
            <List.Item
                style={css.contentBtView}
                title={title}
                description={description}
            />
        </TouchableOpacity>
    )
}

function HeaderDetalhes({ data }) {

    const {horaCriacao, horaFechamento, horaResultado, valorEntrada} = data;

    const alerta = (title, text) => {
        Alert.alert(title, text);
    };
 
    return (
        <View style={css.containerHeader}>
            <Image source={{uri: data.banner}} style={css.img} />
            <Headline style={css.headline}>
                {data.titulo}
            </Headline>
            <Subheading style={css.subhead}>
                {data.descricao}
            </Subheading>
            <View style={css.row}>
                <ItemDataHora titulo={horaFechamento} descricao={'Fechamento'} />
                <ItemDataHora titulo={horaResultado} descricao={'Resultado'} />
            </View>
            <View style={[css.row, css.espacingRow]}>
                <ButtonView
                    title={'R$ 1.000'}
                    description={'Faturado'}
                    click={() => alerta('Abrir LigaMasterTransacoes', 'Extrado de transações com detalhes do pagamento dos palpites dos users')}
                />
                <ButtonView
                    title={'200'}
                    description={'Palpites'}
                    click={() => alerta('Abrir LigaMasterPalpites', 'Lista com todos os palpites por ordem decrescente')}
                />
                <ButtonView
                    title={'170'}
                    description={'Palpiteiros'}
                    click={() => alerta('Abrir LigaMasterRanking', 'Abre a tela de gerenciamento de Ranking da liga')}
                />
            </View>
            <Divider style={css.divider} />
        </View>
    );
}

export default function DetalhesLiga({ route }) {

    const { data } = route.params;

    //fazer a requisição detalhada de cada jogo vai retornar mais dados detalhados de cada partica
    //dados como: statisticas como chutes, faltas, cartoes, substituicao, gols, assistencias, 
    //escalao de cada time, banco de reserva
 
    return (
        <View style={css.container}>
            <FlatList
                ListHeaderComponent={() => <HeaderDetalhes data={data} />}
                data={data.listaDeJogos}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => <ItemJogoMasterAdm data={item} />}
            />
        </View>
        
    );
}