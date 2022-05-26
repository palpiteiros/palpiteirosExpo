import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList } from 'react-native';
import BotaoVoltarAoInicio from '../BotaoVoltar';
import Fab from '../Fab';
import { Title, Card, Avatar, Subheading, Text , Button } from 'react-native-paper';
import { colorVerde } from '../../Styles/Cores';






export default function ItemCardLigas({ data }) {


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
            alignItems: 'flex-start'

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


        footer:{
            marginTop: 20
        }

    })





    return (
        <Card onPress={'click'} elevation={8} mode="elevated" style={css.container}>

            <View style={css.heardCard}>
                <Avatar.Image size={70} source={{ uri: data.banner }} />

                <View>
                    <Title style={css.txt}>{data.nomeLiga}</Title>

                    <Subheading style={css.txt}>{data.descLiga}</Subheading>
                </View>

            </View>


            <View style={css.bodyCard}>

                <View style={css.rowTitle}>

                    <Text style={css.txtBodyTitle}>Criação</Text>

                    <Text style={css.txtBodyTitle}>Fechamento</Text>

                    <Text style={css.txtBodyTitle}>Resultado</Text>



                </View>

                <View style={css.row}>

                    <Text style={css.txtBody}>{data.DataCriacao}</Text>

                    <Text style={css.txtBody}>{data.Fechamento}</Text>

                    <Text style={css.txtBody}>Ainda não saiu</Text>



                </View>



                <View style={css.rowTitle}>

                    <Text style={css.txtBodyTitle}>Jogos p/ mesa</Text>
                    <Text style={css.txtBodyTitle}>Nº mesas</Text>
                    <Text style={css.txtBodyTitle}>Nº jogadores</Text>

                </View>


                <View style={css.row}>

                    <Text style={css.txtBody}>{data.jogoPmesa}</Text>
                    <Text style={css.txtBody}>{data.nMesas}</Text>
                    <Text style={css.txtBody}>{data.nJogadores}</Text>



                </View>




                <View style={css.rowTitle}>

                    <Text style={css.txtBodyTitle}>Entrada</Text>
                    <Text style={css.txtBodyTitle}>Total palpites</Text>
                    <Text style={css.txtBodyTitle}>Prêmio</Text>

                </View>


                <View style={css.row}>

                    <Text style={css.txtBody}>{data.Entrada}</Text>
                    <Text style={css.txtBody}>{data.TotalPalpites}</Text>
                    <Text style={css.txtBody}>{data.Premio}</Text>



                </View>




            </View>


            <View style={css.footer}>
                <Button onPress={()=> alert('Abre um modal com informações mais detalhadas sobre a liga')} color={colorVerde} mode='contained'>Ver mais</Button>
            </View>

        </Card>
    );
}