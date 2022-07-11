import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, FlatList} from 'react-native';
import { Divider, Headline, List, Subheading } from 'react-native-paper';
import { getMatchsResult, getMatchsRound } from '../../Api';
import Fab from '../../Components/Fab';
import ItemDataHora from '../../Components/ItemDataHora';
import ItemJogoMasterAdm from '../../Components/ItemJogoMasterAdm';
import VariacaoBotao from '../../Components/VariacaoBotao';
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import { dateToYMD } from '../../Objects/Datas';
import { newMatch } from '../../Objects/Liga';
import { colorAmarelo, colorBranco, colorCinza, colorGrafite, colorVermelho, colorVermelhoClaro } from '../../Styles/Cores';

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
        flexDirection: 'row',
        flex: 1
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
        marginTop: 20,
        marginBottom: 20
    },
    btAmarelo: {
        backgroundColor: colorAmarelo
    },
    btVermelho: {
        backgroundColor: colorVermelhoClaro
    },
    bt: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 6,
        marginBottom: 10,
        backgroundColor: colorBranco
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
    const [pbFechar, setPbFechar] = useState(false);


    const { update_matchs, fechar_liga, abrir_liga } = useContext(FirebaseContext);

    const atualizarResultado = (persiste) => {

        let isAtualizado = estaAtualizada(data.listaDeJogos);

        if (persiste === true) {
            isAtualizado = false;
        }

        if(isAtualizado) {
            Alert.alert('Atualização completa', 'As partidas dessa liga ja foram atualizadas. Deseja Atualizar novamente ?', [
                {
                text: "Não",
                onPress: () => {},
                style: "cancel"
                },
                { text: "Sim", onPress: () => atualizarResultado(true) }
            ]);
            return;
        }

        if(pbResult) return;
        setPbResult(true);
        getMatchsResult('2022', data.campeonatoId, data.rodada, lista => {
            
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

    const fecharLiga = () => {
        if(data.status === 2) {
            Alert.alert('Liga Fechada', 'Essa Liga ja está fechada para palpites');
            return;
        }
        if(pbFechar) return;
        setPbFechar(true);
        fechar_liga(data.id, ({sucess}) => {
            setPbFechar(false);
            if(sucess) navigation.goBack();
        });
    };

    const abrirLiga = () => {
        if(data.status === 1) {
            Alert.alert('Liga Aberta', 'Essa Liga ja está aberta para palpites');
            return;
        }
        if(pbFechar) return;
        setPbFechar(true);
        abrir_liga(data.id, ({sucess}) => {
            setPbFechar(false);
            if(sucess) navigation.goBack();
        });
    };
    
    const isUpdate = estaAtualizada(data.listaDeJogos);

    return (
        <View style={css.footer}>
            
            <View>
                <VariacaoBotao
                    TituloBotao={'Contabilizar'}
                    acao={() => {}}
                    icone={'stats-chart-outline'}
                    style={css.bt}
                />
            </View>
            <View>
                <VariacaoBotao
                    TituloBotao={'Atualizar'}
                    acao={atualizarResultado}
                    icone={'repeat-outline'}
                    style={[css.bt]}
                    loading={pbResult}
                />
            </View>
            <View>
                {
                    data.status === 2 ?
                    <VariacaoBotao
                        TituloBotao={'Abrir Liga'}
                        acao={abrirLiga}
                        icone={'lock-open-outline'}
                        style={[css.bt]}
                        loading={pbFechar}
                    />
                    :
                    <VariacaoBotao
                        TituloBotao={'Fechar Liga'}
                        acao={fecharLiga}
                        icone={'close-circle-outline'}
                        style={[css.bt, css.btVermelho]}
                        loading={pbFechar}
                    />
                }
            </View>
        </View>
    )

    if(isUpdate) {
        return <Fab enabled={isUpdate} title={'Contabilizar Pontos'} />;
    } else {
        return <Fab acao={atualizarResultado} loading={pbResult} enabled={!estaAtualizada(data.listaDeJogos)} title={'Atualizar Resultado'} />;
    }

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
                data={data.listaDeJogos}
                ListFooterComponent={() => <FooterLigaUpdate navigation={navigation} data={data} />}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.idPartida}
                renderItem={({item}) => <ItemJogoMasterAdm data={item} />}
            />
            
        </View>
        
    );
}