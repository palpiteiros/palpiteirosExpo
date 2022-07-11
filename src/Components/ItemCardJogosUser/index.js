import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList, Dimensions, Image, Alert } from 'react-native';
import { Card, Button, Subheading, Paragraph, Headline, Title, } from 'react-native-paper';
import Botao from '../Botao';
import { format } from 'date-fns';
import { colorCinza, colorVerdeEscuro, colorVermelho } from '../../Styles/Cores/index';
import VariacaoBotao from '../../Components/VariacaoBotao';
import ModalPalpites from '../ModalPalpites';
import BottomSheet from '@gorhom/bottom-sheet';


const css = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 16,
        borderRadius: 5,
    },
    headerTxt: { fontSize: 15 },
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
        flexDirection: 'column',
        paddingTop: 18
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
        width: 40,
        height: 40
    },
    espaco: {
        height: 2
    },
    headerCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-between',
        height: 40,
        alignItems: 'center',
        paddingLeft: "16%",
        paddingRight: "13%"
    },
    bodyCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: "20%",
        paddingRight: "20%",
        marginTop: 10,
        marginBottom: 5
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: "15%",
        paddingRight: "15%"
    },
    cardPlacar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: "25%",
        paddingRight: "24%"
    },
    divisor: {
        height: 1,
        backgroundColor: "#f3f3f3",
        paddingLeft: 20,
        paddingRight: 20
    },
    cardInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 50,
        paddingRight: 50,
        marginBottom: 20
    },
    txtPadrao: { fontSize: 15 },
    columMain: { flexDirection: 'column', width: '40%', height: 150, alignItems: 'center', justifyContent: 'center' },
    columMeio: { flexDirection: 'column', width: '20%', height: 150, alignItems: 'center', justifyContent: 'center' },
    cont: { flexDirection: 'row' },
    txtTitle: { fontSize: 13, color: '#888888' },
    txtTitle2: { fontSize: 13, color: '#888888', marginTop: -10 },
    txtTitle3: { fontSize: 13, color: '#888888', marginTop: -10, marginBottom: -10 },
    status: { fontSize: 13, marginTop: -10, marginBottom: -10 },
    description: { textAlign: 'center', marginBottom: 5 },
    tmnhFont: { fontSize: 13 }
});

function TimePlacar({ escudo, placar, nome }) {
    return (
        <View style={css.columMain}>
            <Image
                style={css.image}
                source={{ uri: escudo }}
            />
            <Title style={css.txtPadrao}>{placar}</Title>
            <Title style={css.txtPadrao}>{nome}</Title>
        </View>
    );
}

function FooterCard({ data, hora, status }) {
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
        <View style={css.cardInfo}>
            <View>
                <Title style={css.txtTitle}>Data do jogo </Title>
                <Title style={css.txtTitle2}>Horário do jogo </Title>
                <Title style={css.txtTitle3}>Status </Title>
            </View>

            <View>
                <Title style={css.txtTitle}>{data}</Title>
                <Title style={css.txtTitle2}>{hora}</Title>
                <Title style={[css.status, getColor(status)]}>{getStatus(status)}</Title>
            </View>
        </View>
    );
}

export default function ItemCardJogosUser({
    palpites,
    data,
    abre }) {
    const {
        idPartida,
        escudoTimeMandante,
        nomeMandante,
        golsMandante,
        dateRealizacao,
        nomeVisitante,
        escudoTimeVisitante,
        golsVisitante } = data;

    let data_realizacao = format(new Date(dateRealizacao), 'dd/MM/yyyy');
    let hora_realizacao = format(new Date(dateRealizacao), 'HH:mm');
    let status = data.status;
    let [verificaSeTem, setVerificaSeTem] = useState(false);

    const [resultado, setResultado] = useState('');
    const [placarMandante, setPlacarMandante] = useState('');
    const [placarVisitante, setPlacarVisitante] = useState('');


    if (status == "Not Started") {
        status = "Pendente"
    }
    useEffect(() => {
        palpites.map((item) => {
            if (item.idJogo == data.idPartida) {
                setVerificaSeTem(true);
                setResultado(item.resultado.tipo);
                setPlacarMandante(item.golsMandante);
                setPlacarVisitante(item.golsVisitante);
            }
            //console.log(item);
        })
    }, [palpites])

    return (
        <Card mode="elevated" style={css.container}>
            <View style={css.headerCard}>
                <Title style={css.headerTxt}>Mandante</Title>
                <Title style={css.headerTxt}>Visitante</Title>
            </View>
            <View style={css.divisor} />

            <View style={css.cont} >
                <TimePlacar
                    nome={nomeMandante}
                    placar={golsMandante}
                    escudo={escudoTimeMandante}
                />
                <View style={css.columMeio}>
                    <Title style={css.txtPadrao}>x</Title>
                </View>
                <TimePlacar
                    nome={nomeVisitante}
                    placar={golsVisitante}
                    escudo={escudoTimeVisitante}
                />
            </View>
            <View style={css.divisor} />
            <FooterCard
                data={data_realizacao}
                hora={hora_realizacao}
                status={status}
            />
            <View style={{ margin: 15 }}>
                {verificaSeTem ?
                    <>
                        <Subheading style={css.description}>Você palpitou nesta partida</Subheading>
                        {resultado == "Empate" ?
                            <Subheading style={[css.description, css.tmnhFont]}>Seu palpite foi {resultado} de {placarMandante} x {placarVisitante}</Subheading> :
                            <>
                                {placarMandante > placarVisitante ?
                                    <Subheading style={[css.description, css.tmnhFont]}>Seu palpite foi {resultado} de {placarMandante} x {placarVisitante}</Subheading>
                                    :
                                    <Subheading style={[css.description, css.tmnhFont]}>Seu palpite foi {resultado} de {placarVisitante} x {placarMandante}</Subheading>
                                }

                            </>
                        }
                    </>
                    :
                    <VariacaoBotao
                        acao={abre}
                        TituloBotao={'Palpitar neste jogo'}
                        icone={'arrow-up-circle-outline'}
                        data={data}
                    />
                }

            </View>
        </Card>
    );
}