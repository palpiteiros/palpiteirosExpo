
import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, StyleSheet, FlatList, Alert } from 'react-native';
import ItemCardJogos from '../../Components/ItemCardJogos';
import Fab from '../../Components/Fab';
import Pb from '../../Components/Pb';
import { getInfoCampeonato, getJogosDoCampeonato } from '../../Api';
import BarTop from '../../Components/BarTop';



const css = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
    },
    row: {
        flexDirection: 'row'
    },

    heard: {
        height: 150,
    }
});


export default function Step2({ id, avancar, setLista }) {

    const [jogos, setJogos] = useState(undefined);
    const [jogosSelecionados, setJogosSelecionados] = useState([]);


    useEffect(() => {
        getInfoCampeonato(id, (partidas) => {
            setJogos(partidas);
        });

    }, []);




    if (jogos == undefined) return <Pb cor="#000" />



    const handlerClick = (jogos) => {
        let lista = [];

        lista.push({
            ...jogosSelecionados,
            jogos,
        });



        setJogosSelecionados(lista);
        Alert.alert('Escalação dos jogos ', `O jogo ${jogos.time_mandante.nome_popular} x ${jogos.time_visitante.nome_popular} foi selecionando!`)



    }





    const proxTela = () => {
 
    
        if (jogosSelecionados.length == 0) {
            Alert.alert("Espera ai", "Escolha ao menos 1 jogo do campeonato para continuar !");
        } else {
            setLista(jogosSelecionados);
        }


    }




    const apagaLista = () => {
        Alert.alert("Remover tudo", "Todos os jogos da lista foram removidos");

        setJogosSelecionados([]);
    }


    const selecionaTodosOsJogos = () => {

        Alert.alert("Selecionar tudo", "Todos os jogos do campeonato foram selecionados");

        let lista = ([]);

        lista.push({
            ...jogosSelecionados,
            jogos,
            isSelected: true
        });

        setJogosSelecionados([lista]);
    }







    return (
        <SafeAreaView style={css.container}>

            <BarTop selecionaTudo={() => selecionaTodosOsJogos()} removeTudo={() => apagaLista()} />



            <FlatList
                data={jogos}
                renderItem={({ item }) => <ItemCardJogos data={item} click={() => handlerClick(item)} />}
                keyExtractor={item => item.id} />





            {jogosSelecionados.length != 0 ?
                <Fab
                    icone={'arrow-right'}
                    acao={() => proxTela()}
                />
                : null}


        </SafeAreaView>
    );
}

