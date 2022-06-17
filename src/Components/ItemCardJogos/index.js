import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Title, Card, Avatar, Subheading, Text, Button, Headline } from 'react-native-paper';
import { colorVerde } from '../../Styles/Cores';
import CheckBox from "expo-checkbox";

const css = StyleSheet.create({

    container: {
        margin: 10,
        borderRadius: 12,
    },

    txt: {
        fontSize: 14
    },

    row: {
        flexDirection: 'row',
        flex: 1
    },

    containerColuna: {
        height: 150,
        paddingTop: 5,
        width: 100,
        height: '100%',
        margin: 10
    },

    cardItens: {
        padding: 2,
        width: '100%',
        height: 35,
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
        marginTop: 16,
        marginBottom: 16
    },

    colunas: {
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

    let { data_realizacao, hora_realizacao } = data;
    const {fixture, teams, goals, score} = data;
    const {id, date, timestamp, venue} = fixture;
    const golsHome = goals.home;
    const golsAway = goals.away;
    const timeMandante = teams.home;
    const timeVisitante = teams.away;




    return (

        <Card elevation={8} onPress={() => click()} mode="elevated" style={css.container}>

            <View style={css.row}>

                <View style={css.containerTimes}>

                    <View style={css.colunas}>
                        <Title>Casa</Title>

                        <Image style={css.image} size={50} source={{ uri: timeMandante.logo }} />
                        <Subheading>{timeMandante.name.substring(0, 14)}</Subheading>
                        <View style={css.espaco} />
                        <Headline>{`ID: ${timeMandante.id}`}</Headline>

                    </View>

                    <View style={css.colunaMeio}>
                        <Title>X</Title>
                    </View>

                    <View style={css.colunas}>
                        <Title>Visitante</Title>

                        <Image style={css.image} source={{ uri: timeVisitante.logo }} />
                        <Subheading>{timeVisitante.name.substring(0, 10)}</Subheading>
                        <View style={css.espaco} />
                        <Headline>{`ID: ${timeVisitante.id}`}</Headline>

                    </View>


                </View>

                <View style={css.containerColuna} >

                    <View style={css.cardItens}>

                        <Text style={css.txt}>{`${date}`}</Text>

                    </View>


                    <View style={css.cardItens}>

                        <Text style={css.txt}>{`${golsHome} x ${golsAway}`}</Text>


                    </View>


                    <View style={css.cardItens}>
                        <Text style={css.txt}>{venue.name}</Text>


                    </View>



                    <View style={css.cardItens}>

                        <View
                            style={{ height: 15, width: 15, borderRadius: 50, backgroundColor: "red" }}
                        />

                    </View>



                </View>

            </View>


        </Card>

    );
}