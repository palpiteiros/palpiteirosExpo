import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList } from 'react-native';
import BotaoVoltarAoInicio from '../BotaoVoltar';
import Fab from '../Fab';
import { Title, Card, Avatar, Subheading, Text , Button } from 'react-native-paper';
import { colorVerde } from '../../Styles/Cores';






export default function ItemCardCampeonatos({ data, click }) {
 

    const css = StyleSheet.create({

        container: { 
            margin: 10,
            borderRadius: 12,
            padding: 20,
            justifyContent: 'center',
            alignContent: 'center',
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

        image:{paddingTop: 9, backgroundColor: 'white'},


        footer:{
            marginTop: 20
        }

    })





    return (
        <Card  elevation={8} mode="elevated" style={css.container}>

            <View style={css.heardCard}>
                <Avatar.Image style={css.image}  size={70} source={{ uri: data.banner }} />

                <View>
                    <Title style={css.txt}>{data.Campeonato}</Title>

                    <Subheading style={css.txt}>Edição: {data.edicao}</Subheading>

                    <Subheading style={css.txt}>Temporada: {data.temporada}</Subheading>

                </View>

            </View>


            <View style={css.bodyCard}>

                <View style={css.rowTitle}>

                    <Text style={css.txtBodyTitle}>Tipo</Text>

                    <Text style={css.txtBodyTitle}>Rodada</Text>

                    <Text style={css.txtBodyTitle}>Status</Text>



                </View>

                <View style={css.row}>

                    <Text style={css.txtBody}>{data.tipo}</Text>

                    <Text style={css.txtBody}>{data.rodada}</Text>

                    <Text style={css.txtBody}>Ainda não saiu</Text>



                </View>
 
            </View>


            <View style={css.footer}>
                <Button onPress={()=> click()} color={colorVerde} mode='contained'>Selecionar campeonato</Button>
            </View>

        </Card>
    );
}