import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, FlatList} from 'react-native';
import { Divider, Headline, List, Subheading } from 'react-native-paper';
import { getMatchsResult, getMatchsRound } from '../../Api';
import Fab from '../../Components/Fab';
import ItemDataHora from '../../Components/ItemDataHora';
import ItemJogoMasterAdm from '../../Components/ItemJogoMasterAdm';
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import { dateToYMD } from '../../Objects/Datas';
import { newMatch } from '../../Objects/Liga';
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
    },
    footer: {
        paddingBottom: 20,
        paddingTop: 20
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

function estaAtualizada(list) {

    let x = true;

    list.map(item => {
        if(item.status === 'Not Started') {
            x = false;
            return x;
        }
    });

    return x;

};

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
                <ItemDataHora titulo={'Fechamento'} descricao={horaFechamento} />
                <ItemDataHora titulo={'Resultado'} descricao={horaResultado} />
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

function FooterLigaUpdate({data, navigation}) {

    const [pbResult, setPbResult] = useState(false);

    const { update_matchs } = useContext(FirebaseContext);

    const atualizarResultado = () => {
        if(pbResult) return;
        setPbResult(true);
        getMatchsResult('2022', data.campeonatoId, 'Regular Season - 14', lista => {
            
            if(lista.length > 0) {
                console.log(lista);

                let listaEditada = [];

                lista.forEach((data) => {

                    const {fixture, teams, goals, score} = data;
                    const {id, date, timestamp, venue, status} = fixture;
                    const golsHome = goals.home;
                    const golsAway = goals.away;
                    const timeMandante = teams.home;
                    const timeVisitante = teams.away;
            
                    const jogoObjt = newMatch(date, timestamp, id, golsHome, golsAway, status.long, venue.name, timeMandante.name, timeMandante.logo, timeMandante.id, timeVisitante.name, timeVisitante.logo, timeVisitante.id);

                    listaEditada.push(jogoObjt);
            
                });

                update_matchs(data.id, listaEditada, ({sucess}) => {
                    setPbResult(false);
                    if(sucess) navigation.goBack();
                });

            } else {
                setPbResult(false);
                console.log('lista Vazia');
            }
        });
    };


    return(
        <View style={css.footer}>
            <Fab acao={atualizarResultado} loading={pbResult} enabled={!estaAtualizada(data.listaDeJogos)} title={'Atualizar Resultado'} />
            <Fab enabled={estaAtualizada(data.listaDeJogos)} title={'Contabilizar Pontos'} />
        </View>
    );
}

export default function DetalhesLiga({ route, navigation }) {

    const { data } = route.params;

    //fazer a requisição detalhada de cada jogo vai retornar mais dados detalhados de cada partica
    //dados como: statisticas como chutes, faltas, cartoes, substituicao, gols, assistencias, 
    //escalao de cada time, banco de reserva

    return (
        <View style={css.container}>
            <FlatList
                ListHeaderComponent={() => <HeaderDetalhes data={data} />}
                ListFooterComponent={() => <FooterLigaUpdate navigation={navigation} data={data} />}
                data={data.listaDeJogos}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => <ItemJogoMasterAdm data={item} />}
            />
        </View>
        
    );
}