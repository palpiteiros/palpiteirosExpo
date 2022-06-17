import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, Image } from 'react-native';
import BotaoVoltarAoInicio from '../BotaoVoltar';
import Fab from '../Fab';
import { Title, Card, Avatar, Subheading, Text, Button } from 'react-native-paper';
import { colorVerde } from '../../Styles/Cores';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'



const css = StyleSheet.create({

    container: {
        margin: 10,
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 12,
        justifyContent: 'center',
        alignContent: 'center',

    },

    heardCard: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 20
        
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
        padding: 10
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
        marginTop: 20,
        marginBottom: 20,
        marginRight: 20,
        marginLeft: 20
    },
    img: {
        width: '100%',
        height: 190,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12
    }

})


let urlImg = 'https://i0.wp.com/www.linhaesportiva.com.br/wp-content/uploads/2017/02/16002904_1857749167828776_5108168482056053606_n.jpg?resize=759%2C315&ssl=1';


export default function ItemCardLigas({ data , abreDetalhes}) {



    const data_criacao = data.data_criacao.toDate().toDateString();
    const hora_criacao = data.data_criacao.toDate().toLocaleTimeString('pt-BR');

    const data_formated = format(new Date(data_criacao), 'dd/MM/yyyy');


    let resultado = "Ainda não saiu";
    let data_fechamento = data.dataHoraFechamento;
    let nomeLiga = data.titulo;
    let descricaoLiga = data.descricao;
    let valorEntrada = data.valorEntrada;
    let valorPremio = data.valorPremio;
    let avatar = (data.banner === '' ? urlImg : data.banner);
    let TotalPalpites = 0;



    return (
        <Card elevation={8} mode="elevated" style={css.container}>

            <Image style={css.img} source={{ uri: avatar }} />

            <View style={css.heardCard}>
                

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