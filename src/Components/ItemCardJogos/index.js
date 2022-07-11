import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Title, Card, Avatar, Subheading, Text, Button, Headline } from 'react-native-paper';
import { colorCinzaClaro, colorVerde, colorVerdeEscuro } from '../../Styles/Cores';
import CheckBox from "expo-checkbox";
import { dateToYMD } from '../../Objects/Datas';

const css = StyleSheet.create({

    container: {
        margin: 10,
        borderRadius: 12,
        marginLeft: 20,
        marginRight: 20,
        height: 200
    },

    txt: {
        fontSize: 14,
        marginTop: 8,
        textAlign: 'center'
    },

    txtEstadio: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center'
    },

    row: {
        flexDirection: 'row',
        flex: 1
    },

    containerColuna: {
        height: 150,
        paddingTop: 5,
        width: 90,
        height: '100%',
        margin: 10
    },

    cardItens: {
        padding: 2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    },

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        padding: 5,
        paddingLeft: 30
    },

    containerTimes: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 16
    },

    colunas: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    colunaMeio: {
        height: '100%',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },

    image: {
        paddingTop: 9,
        backgroundColor: 'white',
        width: 50,
        height: 50
    },

    espaco: {
        height: 2
    }

});

export default function ItemCardJogos({ data, click, jogosSelecionados }) {

    const {fixture, teams, goals, score} = data;
    const {id, date, timestamp, venue} = fixture;
    const golsHome = goals.home;
    const golsAway = goals.away;
    const timeMandante = teams.home;
    const timeVisitante = teams.away;

    let jogoJaEstaNosSelecionados = false;

    jogosSelecionados.map(jSelect => {
        const idJogoSelect = jSelect.fixture.id;
        if(idJogoSelect === id) {
            jogoJaEstaNosSelecionados = true;
        }
    });


    return (

        <Card elevation={2} onPress={() => click(data)} mode="elevated" style={css.container}>

            <View style={css.row}>

                <View style={css.containerTimes}>

                    <View style={css.colunas}>
                        <Title>Casa</Title>

                        <Image style={css.image} size={50} source={{ uri: timeMandante.logo }} />
                        <Subheading>{timeMandante.name.substring(0, 10)}</Subheading>
                        <View style={css.espaco} />
                        <Text>{`ID: ${timeMandante.id}`}</Text>

                    </View>

                    <View style={css.colunaMeio}>
                        <Title>X</Title>
                    </View>

                    <View style={css.colunas}>
                        <Title>Visitante</Title>

                        <Image style={css.image} source={{ uri: timeVisitante.logo }} />
                        <Subheading>{timeVisitante.name.substring(0, 10)}</Subheading>
                        <View style={css.espaco} />
                        <Text>{`ID: ${timeVisitante.id}`}</Text>

                    </View>


                </View>

                <View style={css.containerColuna} >

                    <View style={css.cardItens}>

                        <View
                            style={{marginTop: 18, marginBottom: 12, height: 15, width: 15, borderRadius: 30, backgroundColor: (jogoJaEstaNosSelecionados ? colorVerdeEscuro : colorCinzaClaro) }}
                        />

                    </View>

                    <View style={css.cardItens}>

                        <Text style={css.txt}>{`${dateToYMD(new Date(date))}`}</Text>

                    </View>

                    <View style={css.cardItens}>
                        <Text style={css.txtEstadio}>{venue.name}</Text>


                    </View>

                </View>

            </View>


        </Card>

    );
}