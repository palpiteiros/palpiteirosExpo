import React from 'react';
import { SafeAreaView, View, StyleSheet, FlatList, Image } from 'react-native';
import BotaoVoltarAoInicio from '../BotaoVoltar';
import Fab from '../Fab';
import { Title, Card, Avatar, Subheading, Text, Button } from 'react-native-paper';
import { colorCinzaClaro, colorGrafite, colorVerde } from '../../Styles/Cores';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { dateToYMD } from '../../Objects/Datas';
import VariacaoBotao from '../VariacaoBotao';
import Botao from '../Botao';



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
        paddingLeft: 15,
    },

    txtBody: {
        width: 100,
        fontSize: 13
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
    },

    bt: {
        backgroundColor: colorGrafite
    }

})


let urlImg = 'https://i0.wp.com/www.linhaesportiva.com.br/wp-content/uploads/2017/02/16002904_1857749167828776_5108168482056053606_n.jpg?resize=759%2C315&ssl=1';


export default function ItemCardLigas({ data, abreDetalhes }) {

    const { titulo, descricao, banner, horaFechamento, horaResultado, valorEntrada, valorPremio, listaDeJogos, horaCriacao } = data;

    let avatar = (banner === '' ? urlImg : banner);
    let TotalPalpites = 0;

    return (
        <Card elevation={8} mode="elevated" style={css.container}>
            <Image style={css.img} source={{ uri: avatar }} />
            <View style={css.heardCard}>

                <View>
                    <Title style={css.txt}>{titulo}</Title>
                    <Subheading style={css.txt}>{descricao}</Subheading>
                </View>

            </View>

            <View style={css.bodyCard}>
                <View style={css.rowTitle}>
                    <Text style={css.txtBodyTitle}>Criação</Text>
                    <Text style={css.txtBodyTitle}>Fechamento</Text>
                    <Text style={css.txtBodyTitle}>Resultado</Text>
                </View>

                <View style={css.row}>
                    <Text style={css.txtBody}>{dateToYMD(new Date(horaCriacao))}</Text>
                    <Text style={css.txtBody}>{horaFechamento}</Text>
                    <Text style={css.txtBody}>{horaResultado}</Text>
                </View>

                <View style={css.rowTitle}>
                    <Text style={css.txtBodyTitle}>Entrada</Text>
                    <Text style={css.txtBodyTitle}>Prêmio</Text>
                    <Text style={css.txtBodyTitle}>Total palpites</Text>
                </View>


                <View style={css.row}>
                    <Text style={css.txtBody}>R$ {valorEntrada}</Text>
                    <Text style={css.txtBody}>R$ {valorPremio}</Text>
                    <Text style={css.txtBody}>{TotalPalpites}</Text>
                </View>
            </View>

            <View style={css.footer}>
                <VariacaoBotao
                    acao={() => abreDetalhes(data)}
                    TituloBotao={'Ver detalhes'}
                    style={css.bt}
                    icone={'return-up-forward-outline'}
                />
            </View>

        </Card>
    );
}