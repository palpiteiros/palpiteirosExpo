import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, StatusBar, Image, StyleSheet, Dimensions, TouchableOpacity, Platform, ScrollView, Alert } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Modal from "react-native-modal";
import { Button, Subheading, Title, DefaultTheme } from 'react-native-paper';
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import { UserContext } from '../../Rotas/UserProvider';
import { colorCinza, colorVerdeClaro } from '../../Styles/Cores';
import VariacaoBotao from '../VariacaoBotao';
import Pb from '../../Components/Pb';
import { novoPalpite } from '../../Objects/Palpite';

const css = StyleSheet.create({
    containerModal: {
        
        backgroundColor: 'white',
    },

    containerTopico: {
        height: 45,
        justifyContent: 'center'
    },

    row: {
        flexDirection: 'row'
    },

    rowFull: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 25,
        alignItems: 'center'
    },

    alinhamento: {
        alignItems: 'center'
    },

    columMain: {
        flexDirection: 'column',
        width: '30%',
        height: 90,
        marginTop: 15,
        paddingTop: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginBottom: 15
    },

    containerDefinePlacar: {
        flexDirection: 'column',
        width: '45%',
        height: 190,
        marginTop: 15,
        paddingTop: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginBottom: 15
    },

    image: {
        paddingTop: 9,
        backgroundColor: 'white',
        width: 30,
        height: 30,
    },

    txtPadrao: {
        fontSize: 13,
        color: '#3b3b3b'
    },

    txPlacar: {
        fontSize: 13,
        color: '#3b3b3b',
        marginTop: -8,
        marginBottom: 8

    },

    cont: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#f6f6f6'
    },

    containerMontagem: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#f6f6f6'
    },

    columMeio: {
        flexDirection: 'column',
        width: '20%',
        height: 112,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    variacao: {
        marginTop: -10,
        color: 'black'
    },

    txtTopico: {
        fontSize: 16,
        paddingLeft: 25
    },

    botoes: {
        height: 25,
        width: 30,
        backgroundColor: '#f6f6f6',
        alignItems: 'center',
        justifyContent: 'center'
    },

    containerCentral: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        marginBottom: 10
    },

    indicador: {
        position: 'absolute',
        borderRadius: 30,
        top: 5,
        right: 10,
        height: 12,
        width: 12,
        backgroundColor: colorVerdeClaro
    },

    txtHeaderModal: {
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 15
    },

    btVoltar: {
        margin: 8
    }
});

const theme = {
    ...DefaultTheme,
    colors: {
        primary: colorCinza,
        
    }
};

function TimePlacar({ id, escudo, tipo, placar, nome, clickSelecionaTime, resultado }) {

    let id_time = '';
    if (resultado != null) {
        const { idTime } = resultado;
        id_time = idTime;
    }

    return (
        <TouchableOpacity
            //onPress={() => clickSelecionaTime({ id, escudo, placar, nome, tipo })}
            style={css.columMain}>
            {resultado != null ?
                (
                    <>
                        {id_time == id ?
                            <View style={css.indicador} />
                            : null}
                    </>
                )
                :
                null}
            {tipo == 'Empate' ?
                <View style={css.row}>
                    <Image
                        style={css.image}
                        source={{ uri: escudo[0] }}
                    />
                    <Image
                        style={css.image}
                        source={{ uri: escudo[1] }}
                    />
                </View>
                :
                <Image
                    style={css.image}
                    source={{ uri: escudo }}
                />
            }

            <Title numberOfLines={1} style={css.txtPadrao}>{tipo}</Title>
        </TouchableOpacity>
    );
}

function DefinePlacar({ tipo, nome, escudo, placar, acaoDiminuir, acaoAdd }) {
    return (
        <View style={css.containerDefinePlacar}>

            <View style={css.alinhamento}>
                {tipo == 'Empate' ?
                    <>
                        <View style={css.row}>
                            <Image
                                style={css.image}
                                source={{ uri: escudo[0] }}
                            />
                            <Image
                                style={css.image}
                                source={{ uri: escudo[1] }}
                            />
                        </View>
                        <Title numberOfLines={1} style={css.txtPadrao}>{nome}</Title>
                    </>
                    :
                    <>
                        <Image
                            style={css.image}
                            source={{ uri: escudo }}
                        />
                        <Title numberOfLines={1} style={css.txtPadrao}>{nome}</Title>
                    </>
                }
                <Subheading numberOfLines={1} style={css.txPlacar}>{placar}</Subheading>
            </View>

            <View style={css.containerCentral}>
                <TouchableOpacity
                    onPress={() => acaoDiminuir()}
                    style={css.botoes}>
                    <Text>-</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => acaoAdd()}
                    style={css.botoes}>
                    <Text>+</Text>

                </TouchableOpacity>
            </View>

            <Subheading style={css.txtPadrao}>{'Defina placar'}</Subheading>
            <Subheading style={[css.txtPadrao, css.variacao]}>{tipo}</Subheading>

        </View>
    );
}

function Topico({ titulo }) {
    return (
        <View style={css.containerTopico}>
            <Title style={css.txtTopico}>{titulo}</Title>
        </View>
    );
}

function TituloHeader({ titulo }) {
    return (
        <Title style={css.txtHeaderModal}>{titulo}</Title>
    );
}

function BotaoLimpar({ titulo, acao }) {
    return (
        <TouchableOpacity onPress={() => acao()}>
            <Subheading style={{ fontSize: 12 }}>{titulo}</Subheading>
        </TouchableOpacity>
    );
}

export default function ModalPalpites({
    idLiga,
    data,
    refer,
    armazenaPalpites,
    PalpitesArmazenados,
    fechar
}) {
    const {
        idPartida,
        idMandante,
        escudoTimeMandante,
        nomeMandante,
        golsMandante,
        dateRealizacao,
        idVisitante,
        nomeVisitante,
        escudoTimeVisitante,
        golsVisitante
    } = data;

    const [esconderDefinicaoPlacar, setEsconderDefinicaoPlacar] = useState(true);
    const [escolheResultado, setEscolheResultado] = useState(null);
    const [placarVisitante, setPlacarVisitante] = useState(0);
    const [placarMandante, setPlacarMandante] = useState(0);
    const { salvar_Palpite, loadingSave } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (placarMandante > placarVisitante) {
            setEscolheResultado({
                idTime: idMandante,
                escudoTime: escudoTimeMandante,
                nomeTime: nomeMandante,
                tipo: 'Mandante'
            })
        } else if (placarMandante < placarVisitante) {
            setEscolheResultado({
                idTime: idVisitante,
                escudoTime: escudoTimeVisitante,
                nomeTime: nomeVisitante,
                tipo: 'Visitante'
            })
        } else if (placarMandante != 0 && placarVisitante != 0 && placarMandante == placarVisitante) {
            setEscolheResultado({
                idTime: 'Empate',
                escudoTime: [escudoTimeVisitante, escudoTimeMandante],
                nomeTime: [nomeVisitante, nomeMandante],
                tipo: 'Empate'
            })
        }
    }, [placarMandante, placarVisitante])

    const HandlerFazerPalpite = useCallback(() => {
        if (idPartida != undefined && escolheResultado != null) {
            salvarPalpite(idPartida, placarMandante, placarVisitante, escolheResultado)
        } else {
            Alert.alert("Erro ao palpitar", "Você precisa definir o placar da partida...")
        }
    }, [escolheResultado, placarMandante, placarVisitante]);

    const salvarPalpite = (
        idPartida,
        placarMandante,
        placarVisitante,
        escolheResultado,
    ) => {

        let palpite = novoPalpite(idLiga, idPartida, null, placarMandante, escolheResultado.tipo == "Empate" ? placarMandante : placarVisitante, escolheResultado, user.uid, idMandante, idVisitante, nomeMandante, nomeVisitante)
        armazenaPalpites([
            ...PalpitesArmazenados,
            palpite]);
        setEscolheResultado(null);
        setPlacarMandante(0);
        setPlacarVisitante(0);
        setEsconderDefinicaoPlacar(true);
        refer.current?.close();
    }

    const selecionaTime = ({ id, escudo, placar, nome, tipo }) => {
        const data = {
            idTime: id,
            escudoTime: escudo,
            nomeTime: nome,
            tipo: tipo
        }
        setEscolheResultado(data);
    }

    const addGolMandante = () => {
        const add = 1 + placarMandante
        setPlacarMandante(add);
    }

    const diminuiGolMandante = () => {
        if (placarMandante == 0) {
            return;
        } else {
            const remove = placarMandante - 1
            setPlacarMandante(remove);
        }
    }

    const addGolVisitante = () => {
        const add = 1 + placarVisitante
        setPlacarVisitante(add);
    }

    const diminuiGolVisitante = () => {
        if (placarVisitante == 0) {
            return;
        } else {
            const remove = placarVisitante - 1
            setPlacarVisitante(remove);
        }
    }

    const limpaPalpite = () => {
        setEsconderDefinicaoPlacar(true)
        setEscolheResultado(null);
        setPlacarMandante(0);
        setPlacarVisitante(0);
    }

    return (
        <>
            {data != null ?
                <View style={css.containerModal}>
                    <ScrollView>
                        <TituloHeader
                            titulo={'Monte seu palpite'}
                        />
                        <View>
                            <View style={css.rowFull}>
                                <Topico
                                    titulo={'Escolha o resultado'}
                                />
                                <BotaoLimpar
                                    titulo={'Limpar palpite'}
                                    acao={limpaPalpite}
                                />
                            </View>

                            <View style={css.cont} >
                                <TimePlacar
                                    clickSelecionaTime={selecionaTime}
                                    placar={placarMandante}
                                    id={idMandante}
                                    tipo={'Mandante'}
                                    nome={nomeMandante}
                                    escudo={escudoTimeMandante}
                                    resultado={escolheResultado}
                                />
                                <TimePlacar
                                    clickSelecionaTime={selecionaTime}
                                    tipo={'Empate'}
                                    nome={[nomeMandante, nomeVisitante]}
                                    escudo={[escudoTimeMandante, escudoTimeVisitante]}
                                    id={'Empate'}
                                    resultado={escolheResultado}
                                />
                                <TimePlacar
                                    clickSelecionaTime={selecionaTime}
                                    id={idVisitante}
                                    placar={placarVisitante}
                                    nome={nomeVisitante}
                                    tipo={'Visitante'}
                                    escudo={escudoTimeVisitante}
                                    resultado={escolheResultado}
                                />
                            </View>
                        </View>
                        <View>
                            <Topico
                                titulo={'Defina o placar da partida'}
                            />
                            <View style={css.cont} >
                                <>
                                    <DefinePlacar
                                        escudo={escudoTimeMandante}
                                        nome={nomeMandante}
                                        tipo={'Mandante'}
                                        placar={placarMandante}
                                        acaoAdd={addGolMandante}
                                        acaoDiminuir={diminuiGolMandante}
                                    />
                                    <DefinePlacar
                                        escudo={escudoTimeVisitante}
                                        nome={nomeVisitante}
                                        tipo={'Visitante'}
                                        placar={placarVisitante}
                                        acaoAdd={addGolVisitante}
                                        acaoDiminuir={diminuiGolVisitante}
                                    />
                                </>
                            </View>

                        </View>
                        <View style={{ margin: 20 }}>
                            {loadingSave ?
                                <Pb cor={'black'} /> :
                                <>
                                    <VariacaoBotao
                                        TituloBotao={'Confirmar palpite'}
                                        icone={'checkmark-circle-outline'}
                                        acao={HandlerFazerPalpite}
                                    />
                                    <Button onPress={fechar} style={css.btVoltar} theme={theme} mode='text'>Fechar</Button>
                                </>
                            }

                        </View>
                    </ScrollView>
                </View>
                : null}
        </>
    );

}