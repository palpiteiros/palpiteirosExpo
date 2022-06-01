
import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, StyleSheet, FlatList, Alert } from 'react-native';
import ItemCardJogos from '../../Components/ItemCardJogos';
import Fab from '../../Components/Fab';
import Pb from '../../Components/Pb';
import { getInfoCampeonato, getJogosDoCampeonato } from '../../Api';



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



export default function Step2({ id }) {

    const [jogos, setJogos] = useState(undefined);

    useEffect(() => {
        getInfoCampeonato(id, (partidas) => {
            setJogos(partidas);
        });

    }, []);




    if(jogos == undefined) return <Pb cor="#000" />


    return (
        <SafeAreaView style={css.container}>

            <FlatList
                data={jogos}
                renderItem={({ item }) => <ItemCardJogos data={item} click={() => handlerClick(item)} />}
                keyExtractor={item => item.id}
            />



            <View style={{ flexDirection: 'row' }}>



                <Fab
                    icone={'arrow-right'}
                    acao={() => proxTela()}
                />

            </View>

        </SafeAreaView>
    );
}

