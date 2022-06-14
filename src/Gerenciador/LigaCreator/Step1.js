
import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, StyleSheet, FlatList } from 'react-native';
import { getCampeonatos } from '../../Api';
import ItemCardCampeonatos from '../../Components/ItemCardCampeonatos';
import Pb from '../../Components/Pb';


const css = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    row: {
        flexDirection: 'row'
    },

    heard: {
        height: 150,
    }
});




export default function Step1({ setId, avancar }) {

    const [campeonatos, setCampeonatos] = useState(undefined);

    useEffect(() => {

        getCampeonatos((list) => {
            setCampeonatos(list);
        });

    }, []);

    function proxTela(idCampeonato) {
        setId(idCampeonato);
        avancar();
    }

    if (campeonatos == undefined) return <Pb cor="#000" />

    return (
            <SafeAreaView style={css.container}>


                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={campeonatos}
                    renderItem={({ item }) => <ItemCardCampeonatos key={item.nome} click={proxTela} data={item} />}
                    keyExtractor={item => item.nome}
                />


            </SafeAreaView>
    );
}

