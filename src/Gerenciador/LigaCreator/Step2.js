
import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, StyleSheet, FlatList, Alert } from 'react-native';
import ItemCardJogos from '../../Components/ItemCardJogos';
import Fab from '../../Components/Fab';
import Pb from '../../Components/Pb';
import { getInfoCampeonato, getJogosDoCampeonato, getMatchsRound, getRoundCurrent } from '../../Api';
import BarTop from '../../Components/BarTop';
import { colorVerdeClaro } from '../../Styles/Cores';



const css = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row'
    },

    heard: {
        height: 150,
    },
    footer: {
        height: 100
    }
});


export default function Step2({ id, avancar, setLista }) {

    const [jogos, setJogos] = useState(undefined);
    const [selecionados, setSelecionados] = useState([]);


    useEffect(() => {
        getRoundCurrent('2022', id, round => {

            getMatchsRound('2022', id, round, lista => {
                if(lista.length > 0) {
                    setJogos(lista);
                }
            });

        })

    }, []);




    if (jogos == undefined) return <Pb cor="#000" />



    const handlerClick = (jogoSelecionado) => {
        console.log(jogoSelecionado);
        let lista = [];

        if(selecionados.length === 0) {
            lista.push(jogoSelecionado);
            setSelecionados(lista);
            Alert.alert('Primeiro Jogo Selecionado ', `O jogo ${jogoSelecionado.teams.home.name} x ${jogoSelecionado.teams.away.name} foi adicionado na seleção!`);
        } else {
            let jogoJaEstaNosSelecionados = false;
            selecionados.map(data => {
                let idJogoSelecionado = jogoSelecionado.fixture.id;
                let idJogoAtualdoLooping = data.fixture.id;
                if(idJogoAtualdoLooping === idJogoSelecionado) {
                    jogoJaEstaNosSelecionados = true;
                } else {
                    lista.push(data);
                }
            });

            if(jogoJaEstaNosSelecionados) {
                setSelecionados(lista);
                Alert.alert('Jogo Removido', `O jogo ${jogoSelecionado.teams.home.name} x ${jogoSelecionado.teams.away.name} foi removido!`);
            } else {
                lista.push(jogoSelecionado);
                setSelecionados(lista);
                Alert.alert('Seleção dos jogos ', `O jogo ${jogoSelecionado.teams.home.name} x ${jogoSelecionado.teams.away.name} foi adicionado na seleção!`);
        
            }

        }


    }





    const proxTela = () => {
 
    
        if (selecionados.length == 0) {
            Alert.alert("Espera ai", "Escolha ao menos 1 jogo do campeonato para continuar !");
        } else {
            console.log(selecionados);
            setLista(selecionados);
        }


    }




    const apagaLista = () => {
        Alert.alert("Remover tudo", "Todos os jogos da lista foram removidos");

        setSelecionados([]);
    }


    const selecionaTodosOsJogos = () => {

        Alert.alert("Selecionar tudo", "Todos os jogos do campeonato foram selecionados");

        let lista = ([]);

        lista.push({
            ...selecionados,
            jogos,
            isSelected: true
        });

        setSelecionados(jogos);
    }



    


    return (
        <SafeAreaView style={css.container}>


            <FlatList
                ListHeaderComponent={() => <BarTop selecionaTudo={() => selecionaTodosOsJogos()} removeTudo={() => apagaLista()} />}
                ListFooterComponent={() => <View style={css.footer} />}
                data={jogos}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <ItemCardJogos jogosSelecionados={selecionados} data={item} click={handlerClick} />}
                keyExtractor={item => item.fixture.id} />


            {selecionados.length != 0 ?
                <Fab
                    icone={'arrow-right'}
                    acao={() => proxTela()}
                />
                : null}


        </SafeAreaView>
    );
}

