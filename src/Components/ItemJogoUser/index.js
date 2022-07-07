import React from 'react';
import { View, StyleSheet, Image, Text, Alert } from 'react-native';
import { Avatar, Button, Card, Headline, Title } from 'react-native-paper';
import { dateToYMD } from '../../Objects/Datas';
import { colorAmarelo, colorBranco, colorCinza, colorVerde, colorVerdeEscuro, colorVermelho } from '../../Styles/Cores';
import Botao from '../Botao';


const css = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 2,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 8,
        paddingTop: 12,
        paddingBottom: 12,
        backgroundColor: colorBranco
    },
    content: {
        flex: 1,
    },
    contentRight: {
        flex: 0.6,
        paddingTop: 15,
        paddingBottom: 6
    },
    txtRight: {
        flex: 1,
        textAlign: 'right',
        marginRight: 20,
        marginBottom: 4
    },
    timePlacar: {
        flexDirection: 'row',
        marginLeft: 5,
        marginRight: 16,
        marginBottom: 6,
        marginTop: 6
    },
    img: {
        width: 35,
        height: 35,
    },
    txtCenter: {
        textAlign: 'center',
        marginLeft: 8,
        marginRight: 12,
        fontSize: 15
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 20
    },
    row: {
        flexDirection: 'row'
    },
    botao: {
        marginLeft: 16,
        marginRight: 16,
        marginTop: 10,
        marginBottom: 10
    }
});

function TimePlacar({ logo, nome, gols }) {


    let txtGols = gols;
    if (txtGols == null || txtGols == undefined) txtGols = '0';

    return (
        <View style={css.timePlacar}>
            <Headline style={[css.txtCenter, css.bold]}>
                {txtGols}
            </Headline>
            <Image
                style={css.img}
                source={{ uri: logo }}
            />
            <Title style={css.txtCenter}>
                {nome.substring(0, 17)}
            </Title>

        </View>
    )
}

export default function ItemJogoUser({ data }) {

    const { nomeVisitante, escudoTimeVisitante, golsVisitante, nomeMandante, escudoTimeMandante, golsMandante, idPartida, status, dateRealizacao } = data;


    const getStatus = (s) => {
        switch (s) {
            case 'Not Started':
                return 'Pendente';
            case 'Match Finished':
                return 'Encerrado';
            default:
                return s;
        }
    };

    const getColor = (s) => {
        switch (s) {
            case 'Not Started':
                return { color: colorVermelho };
            case 'Match Finished':
                return { color: colorVerdeEscuro };
            default:
                return { color: colorCinza };
        }
    }

    return (
        <View style={css.container}>
            <View style={css.row}>

                <View style={css.content}>
                    <TimePlacar
                        nome={nomeMandante}
                        logo={escudoTimeMandante}
                        gols={golsMandante}
                    />
                    <TimePlacar
                        nome={nomeVisitante}
                        logo={escudoTimeVisitante}
                        gols={golsVisitante}
                    />
                </View>
                <View style={[css.contentRight]}>
                    <Text style={css.txtRight}>
                        {dateToYMD(new Date(dateRealizacao))}
                    </Text>
                     
                    <Text style={[css.txtRight, getColor(status)]}>
                        {getStatus(status)}
                    </Text>
                </View>
            </View>
        </View>
    );
}