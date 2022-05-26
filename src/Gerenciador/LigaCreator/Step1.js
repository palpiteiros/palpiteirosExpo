
import React from 'react';
import { Text, SafeAreaView, View, StyleSheet, FlatList } from 'react-native';
import ItemCardCampeonatos from '../../Components/ItemCardCampeonatos';


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




export default function Step1({ navigation }) {


    return (
        <SafeAreaView style={css.container}>

            <FlatList
                data={[
                    {
                        "id": 1,
                        "banner": 'https://2.bp.blogspot.com/-DtuSGo7zfHw/VduFxAAVLAI/AAAAAAAAxn0/huRCDzObDoc/s1600/Vazco%2Bda%2BGama%2BRJ.png',
                       "Campeonato": "Copa do mundo",
                        "edicao": 20,
                        "temporada": 2022,
                        "tipo": "mata-mata",
                        "rodada": 10,
                        "status":"0",


                    },

                    {
                        "id": 2,
                        "banner": 'https://2.bp.blogspot.com/-DtuSGo7zfHw/VduFxAAVLAI/AAAAAAAAxn0/huRCDzObDoc/s1600/Vazco%2Bda%2BGama%2BRJ.png',
                       "Campeonato": "Brasileirão",
                        "edicao": 20,
                        "temporada": 2022,
                        "tipo": "Rodada 1",
                        "rodada": 10,
                        "status":"0",


                    }
                ]}
                renderItem={({ item }) => <ItemCardCampeonatos data={item} />}
                keyExtractor={item => item.id}
            />





        </SafeAreaView>
    );
}

