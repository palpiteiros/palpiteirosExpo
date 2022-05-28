import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Title, Card, Avatar, Subheading, Text, Button } from 'react-native-paper';
import { colorVerde } from '../../Styles/Cores';
import CheckBox from "expo-checkbox";



export default function ItemCardJogos({ data, click }) {
 


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
        },

        containerColuna: {
            height: 150,
            width: '30%',
            alignItems: 'flex-end',
            paddingTop: 5
        },

        cardItens: {
            padding: 2, width: '100%', height: 35, justifyContent: 'center',
            alignItems: 'center', flexDirection: 'column'
        },

        footer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
            padding: 5,
            paddingLeft: 30
        },

        containerTimes: { flexDirection: 'row', height: 150, width: '70%' },

        colunas: { height: '100%', alignItems: 'center', justifyContent: 'center', width: 140 },

        colunaMeio: { height: '100%', width: 40, justifyContent: 'center', alignItems: 'center' }





    })


    let timeCasa = data.casa;
    let LogotimeCasa = data.logo1;


    let timeVisitante = data.visitante;
    let LogotimeVisitante = data.logo2;


    let dataJogo = data.data;
    let Status = data.status;
    let campeonato = data.Campeonato;
    let selected = data.selected;






    return (

        <Card elevation={8} onPress={() => click()} mode="elevated" style={css.container}>

            <View style={css.row}>

                <View style={css.containerTimes}>

                    <View style={css.colunas}>
                        <Title>Casa</Title>

                        <Avatar.Image source={{ uri: LogotimeCasa }} />
                        <Subheading>{timeCasa}</Subheading>

                    </View>




                    <View style={css.colunaMeio}>
                        <Title>X</Title>
                    </View>





                    <View style={css.colunas}>
                        <Title>Visitante</Title>

                        <Avatar.Image source={{ uri: LogotimeVisitante }} />
                        <Subheading>{timeVisitante}</Subheading>


                    </View>


                </View>

                <View style={css.containerColuna} >

                    <View style={css.cardItens}>

                        <Text style={css.txt}>{dataJogo}</Text>

                    </View>


                    <View style={css.cardItens}>

                        <Text style={css.txt}>{Status}</Text>


                    </View>


                    <View style={css.cardItens}>
                        <Text style={css.txt}>{campeonato}</Text>


                    </View>



                    <View style={css.cardItens}>

                        <View
                            style={{ height: 15, width: 15, borderRadius: 50, backgroundColor: selected ? 'green' :  'red'}}
                        />

                    </View>



                </View>

            </View>


        </Card>

    );
}