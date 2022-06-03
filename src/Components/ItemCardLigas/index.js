import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList } from 'react-native';
import BotaoVoltarAoInicio from '../BotaoVoltar';
import Fab from '../Fab';
import { Title, Card, Avatar, Subheading, Text, Button } from 'react-native-paper';
import { colorVerde } from '../../Styles/Cores';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'



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


    footer: {
        marginTop: 20
    }

})



export default function ItemCardLigas({ data , abreDetalhes}) {



    const data_criacao = data.data_criacao.toDate().toDateString();
    const hora_criacao = data.data_criacao.toDate().toLocaleTimeString('pt-BR');

    const data_formated = format(new Date(data_criacao), 'dd/MM/yyyy');


    let resultado = "Ainda não saiu";
    let data_fechamento = data.documento.dataHoraFechamento;
    let nomeLiga = data.documento.titulo;
    let descricaoLiga = data.documento.descricao;
    let valorEntrada = data.documento.valorEntrada;
    let valorPremio = data.documento.valorPremio;
    let avatar = data.documento.banner;
    let TotalPalpites = 0;



    return (
        <Card elevation={8} mode="elevated" style={css.container}>

            <View style={css.heardCard}>
                <Avatar.Image size={70} source={{ uri: avatar }} />

                <View>
                    <Title style={css.txt}>{nomeLiga}</Title>

                    <Subheading style={css.txt}>{descricaoLiga}</Subheading>
                </View>

            </View>


            <View style={css.bodyCard}>

                <View style={css.rowTitle}>

                    <Text style={css.txtBodyTitle}>Criação</Text>

                    <Text style={css.txtBodyTitle}>Fechamento</Text>

                    <Text style={css.txtBodyTitle}>Resultado</Text>



                </View>

                <View style={css.row}>

                    <Text style={css.txtBody}>{data_formated}</Text>

                    <Text style={css.txtBody}>{data_fechamento}</Text>

                    <Text style={css.txtBody}>{resultado}</Text>



                </View>






                <View style={css.rowTitle}>

                    <Text style={css.txtBodyTitle}>Entrada</Text>
                    <Text style={css.txtBodyTitle}>Prêmio</Text>
                    <Text style={css.txtBodyTitle}>Total palpites</Text>

                </View>


                <View style={css.row}>

                    <Text style={css.txtBody}>R$ {valorEntrada},00</Text>
                    <Text style={css.txtBody}>R$ {valorPremio},00</Text>
                    <Text style={css.txtBody}>{TotalPalpites}</Text>



                </View>




            </View>


            <View style={css.footer}>
                <Button onPress={() => abreDetalhes(data)} color={colorVerde} mode='contained'>Ver mais</Button>
            </View>

        </Card>
    );
}