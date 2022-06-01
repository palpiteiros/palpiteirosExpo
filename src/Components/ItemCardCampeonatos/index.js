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


    return (
        <Card  elevation={8}  style={css.container}>

            <View style={css.heardCard}>
                <Image style={css.image}  size={70} source={{ uri: data.logo }} />

                <View>
                    <Title numberOfLines={2} style={[css.title]}>{data.nome}</Title>

                    <Subheading style={css.txt}>Edição: {data.edicao_atual.edicao_id}</Subheading>

                    <Subheading style={css.txt}>Temporada: {data.edicao_atual.temporada}</Subheading>

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

                    <Text style={css.txtBody}>{data?.rodada_atual?.rodada}</Text>

                    <Text style={css.txtBody}>{data.status}</Text>



                </View>
 
            </View>


            <View style={css.footer}>
                <Button onPress={() => click(data.campeonato_id)} color={colorVerde} mode='contained'>Selecionar campeonato</Button>
            </View>

        </Card>
    );
}