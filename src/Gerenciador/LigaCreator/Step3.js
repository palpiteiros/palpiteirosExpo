
import React, { useState, useEffect, useContext } from 'react';
import { Text, SafeAreaView, View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Card } from 'react-native-paper';
import CardInput from '../../Components/CardInput';
import Botao from '../../Components/Botao'
import { colorVerdePadrao } from '../../Styles/Paleta/Paleta_cores';
import { colorVerde, colorVerdeClaro } from '../../Styles/Cores';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import Pb from '../../Components/Pb';
import * as ImagePicker from 'expo-image-picker';




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




export default function Step3({ onSucess, jogos }) {

    const [fechamento, setFechamento] = useState('');
    const [resultado, setResultado] = useState('');
    const [nomeLiga, setNomeLiga] = useState('');
    const [descLiga, setDescLiga] = useState('');
    const [entrada, setEntrada] = useState('');
    const [premio, setPremio] = useState('');
    const [banner, setBanner] = useState(null);
    const [lista, setLista] = useState([]);

    const { salvar_dados, loadingSave } = useContext(FirebaseContext);




    
    console.log(jogos);
    let data_fechamento = "";
    let hora_fechamento = "";
    let data_hora_close = "";
    let nomeCampeonato = "";
    let idCampeonato = "";

    const GoChooseFotos = async () => {


        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        setBanner(result.uri);



    }



    const cria_nova_liga = () => {


        if (nomeLiga == '' || nomeLiga == undefined) return Alert.alert("Atenção", "Campo nome vazio");
        if (descLiga == '' || descLiga == undefined) return Alert.alert("Atenção", "Campo descrição vazio");
        if (resultado == '' || resultado == undefined) return Alert.alert("Atenção", "Campo resultado vazio");
        if (entrada == '' || entrada == undefined) return Alert.alert("Atenção", "Campo entrada vazio");
        if (premio == '' || premio == undefined) return Alert.alert("Atenção", "Campo prêmio vazio");
        //if (banner == null || banner == undefined) return Alert.alert("Atenção", "O banner está vazio");



        let Liga = {
            data_criacao: new Date(),
            status: 1,
            titulo: nomeLiga,
            descricao: descLiga,
            banner: (!banner ? '' : banner),
            tipo: 1,
            status: 1,
            dataHoraFechamento: fechamento,
            horaResultado: resultado,
            listaDeJogos: jogos,
            regras: [],
            valorEntrada: entrada,
            valorPremio: premio,
            campeonatoId: idCampeonato,//id do campeonato retornado pelo api
            nomeCampeonato: nomeCampeonato,
            //v--- serao atualizados no fechamento da rodada
            topClubes: [], //clubes teve mais palpite de vitoria
            topJogadores: [], //jogadores mais palpitados a marcar gol 
            numPalpiteiros: 0,
            numPalpites: 0,
            //v--- serao atualizados no resultado da rodada
            topPalpiteiros: [],
            rankingMedia: [],
            rankingPonto: [],
            vencedores: [],
            theBest: {}, //jogador que mais pontuou
            theChampion: {}, //clube que mais pontuou
        };

        salvar_dados("ligas", Liga, banner, ({sucess, text}) => {
            if(sucess) {
                onSucess();
            } else {
                Alert.alert("Erro ao salvar Liga", text);
            }
        });
        //navigation.navigate("Ligas");
        

    }








    return (
        <SafeAreaView style={css.container}>

            <View style={css.body}>
                <ScrollView>


                    <View style={css.containerColuna}>


                        <CardInput
                            titulo={'Nome da liga'}
                            hint={'Digite o nome'}
                            icone={'pencil'}
                            valor={nomeLiga}
                            onChange={setNomeLiga}
                            senha={false}
                            iconeColor={'black'}
                            tipoTeclado={'default'}
                        />

                        <CardInput
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

                        <CardInput
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



                        <CardInput
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



                        <CardInput
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



                        <CardInput
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
                        <Card elevation={6} onPress={() => GoChooseFotos()} mode='elevated' style={css.card}>

                            {banner ?
                                <Image resizeMode='cover' style={css.img} source={{ uri: banner }} />
                                :
                                <View style={css.ViewIcon}>
                                    <Ionicons name='camera-outline' size={80} />

                                </View>}


                        </Card>
                    </View>


                    {loadingSave ?
                        <Pb cor={"#000000"} />
                        :
                        <View style={css.footer}>
                            <Botao click={() => cria_nova_liga()} cor={colorVerde} titulo={'Criar liga'} />

                        </View>
                    }




                </ScrollView>

            </View>




        </SafeAreaView>
    );
}

