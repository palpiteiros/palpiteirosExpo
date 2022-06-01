
import React, { useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import CardInputForm from '../../Components/CardInput';
import Botao from '../../Components/Botao'
import { colorVerdePadrao } from '../../Styles/Paleta/Paleta_cores';
import { colorVerde, colorVerdeClaro } from '../../Styles/Cores';
import Ionicons from 'react-native-vector-icons/Ionicons';



const css = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },

    containerColuna: { paddingLeft: 5, paddingRight: 5 },

    containerRow: { flexDirection: 'row', justifyContent: 'space-evenly' },

    card: { height: 150, },

    body: { marginTop: 20 },

    footer: {
        marginTop: 10,
        marginBottom: 20
    },

    ViewIcon: { height: '100%', paddingTop: 30, alignItems: 'center' },

    img: { height: '100%' }


});




export default function Step3(props) {

    const img = "https://s2.glbimg.com/r4CZQTiHwK7bBwhYTTZwrxkyUYU=/0x0:3511x2398/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2022/f/t/uKk05BQESbKdBsS7CAPQ/17.jpg";

    const [fechamento, setFechamento] = useState('');
    const [nJogadores, setNJogadores] = useState('');
    const [resultado, setResultado] = useState('');
    const [jogoPMesa, setJogoPMesa] = useState('');
    const [nomeLiga, setNomeLiga] = useState('');
    const [descLiga, setDescLiga] = useState('');
    const [entrada, setEntrada] = useState('');
    const [premio, setPremio] = useState('');
    const [banner, setBanner] = useState(null);





    return (
        <SafeAreaView style={css.container}>

            <View style={css.body}>
                <ScrollView>


                    <View style={css.containerColuna}>


                        <CardInputForm
                            titulo={'Nome da liga'}
                            hint={'Digite o nome'}
                            icone={'pencil-outline'}
                            valor={nomeLiga}
                            onChange={setNomeLiga}
                            senha={false}
                            iconeColor={'black'}
                            tipoTeclado={'default'}
                        />

                        <CardInputForm
                            titulo={'Descrição da liga'}
                            hint={'Digite uma breve descrição'}
                            icone={'pencil-outline'}
                            valor={descLiga}
                            onChange={setDescLiga}
                            senha={false}
                            iconeColor={'black'}
                            tipoTeclado={'default'}
                        />


                    </View>




                    <View style={css.containerRow}>

                        <CardInputForm
                            titulo={'Fechamento'}
                            hint={'Fechamento'}
                            icone={'time-outline'}
                            valor={fechamento}
                            onChange={setFechamento}
                            senha={false}
                            iconeColor={'black'}
                            tipoTeclado={'default'}
                            widAdapter={'48%'}
                        />



                        <CardInputForm
                            titulo={'Resultado'}
                            hint={'Resultado'}
                            icone={'trending-up-outline'}
                            valor={resultado}
                            onChange={setResultado}
                            senha={false}
                            iconeColor={'black'}
                            tipoTeclado={'default'}
                            widAdapter={'48%'}
                        />


                    </View>



                    <View style={css.containerRow}>

                        <CardInputForm
                            titulo={'Jogo p/ mesa'}
                            hint={'Qntd de jogos'}
                            icone={'football-outline'}
                            valor={jogoPMesa}
                            onChange={setJogoPMesa}
                            senha={false}
                            iconeColor={'black'}
                            tipoTeclado={'default'}
                            widAdapter={'48%'}
                        />



                        <CardInputForm
                            titulo={'Nº jogadores'}
                            hint={'Qntd de jogadores'}
                            icone={'people-outline'}
                            valor={nJogadores}
                            onChange={setNJogadores}
                            senha={false}
                            iconeColor={'black'}
                            tipoTeclado={'default'}
                            widAdapter={'48%'}
                        />


                    </View>



                    <View style={css.containerRow}>



                        <CardInputForm
                            titulo={'Entrada'}
                            hint={'Entrada'}
                            icone={'cash-outline'}
                            valor={entrada}
                            onChange={setEntrada}
                            senha={false}
                            iconeColor={'black'}
                            tipoTeclado={'default'}
                            widAdapter={'48%'}
                        />



                        <CardInputForm
                            titulo={'Prêmio'}
                            hint={'Prêmio'}
                            icone={'trophy-outline'}
                            valor={premio}
                            onChange={setPremio}
                            senha={false}
                            iconeColor={'black'}
                            tipoTeclado={'default'}
                            widAdapter={'48%'}
                        />





                    </View>



                    <View style={css.containerColuna}>
                        <Card elevation={6} onPress={() => Alert.alert('Abre picker')} mode='elevated' style={css.card}>

                            {banner ?
                                <Image resizeMode='cover' style={css.img} source={{ uri: banner }} />
                                :
                                <View style={css.ViewIcon}>
                                    <Ionicons name='camera-outline' size={80} />

                                </View>}


                        </Card>
                    </View>



                    <View style={css.footer}>
                        <Botao cor={colorVerdeClaro} titulo={'Criar liga'} />

                    </View>


                </ScrollView>

            </View>




        </SafeAreaView>
    );
}

