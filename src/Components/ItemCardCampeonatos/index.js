import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, Image } from 'react-native';
import BotaoVoltarAoInicio from '../BotaoVoltar';
import Fab from '../Fab';
import { Title, Card, Avatar, Subheading, Text , Button } from 'react-native-paper';
import { colorVerde } from '../../Styles/Cores';


const css = StyleSheet.create({

        container: { 
            margin: 16,
            borderRadius: 12,
            padding: 20,
            justifyContent: 'center',
            alignContent: 'center',
            flex: 1
        },

        heardCard: {
            flexDirection: 'row',
            width: '100%',
            alignItems: 'flex-start', 

        },

        txt: {
            paddingLeft: 25,
            
        },

        txtBody: {
            width: 100

        },

        txtBodyTitle: {
            width: 100,
            fontWeight: 'bold'
        },

        bodyCard: {
            width: '100%',
            marginTop: 15

        },

        row: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',

        },

        rowTitle: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 15
        },

        image:{
            paddingTop: 9, 
            backgroundColor: 'white',
            width: 85,
            height: 85
        },


        footer:{
            marginTop: 20
        },
        title: {
            paddingLeft: 25,
            maxWidth: 250,
            flex: 1
        }

});



export default function ItemCardCampeonatos({ data, click }) {

    const {country, league, seasons} = data;

    const temporadas = seasons.length > 1 ? `${seasons.length} Temporadas` : `${seasons[0].year}`;

    return (
        <Card  elevation={8}  style={css.container}>

            <View style={css.heardCard}>
                <Image style={css.image}  size={70} source={{ uri: league.logo }} />

                <View>
                    <Title numberOfLines={2} style={[css.title]}>{league.name}</Title>

                    <Subheading style={css.txt}>País: {country.name}</Subheading>

                    <Subheading style={css.txt}>Temporada: {temporadas}</Subheading>

                </View>

            </View>


            <View style={css.bodyCard}>

                <View style={css.rowTitle}>

                    <Text style={css.txtBodyTitle}>Tipo</Text>


                </View>

                <View style={css.row}>

                    <Text style={css.txtBody}>{league.type}</Text>


                </View>
 
            </View>


            <View style={css.footer}>
                <Button onPress={() => click(league.id)} color={colorVerde} mode='contained'>Selecionar campeonato</Button>
            </View>

        </Card>
    );
}