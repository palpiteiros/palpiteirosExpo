
import React, { useState, useEffect, useContext } from 'react';
import { Text, SafeAreaView, View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Card, Title } from 'react-native-paper';
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

    card: { height: 190, },

    body: { marginTop: 20 },

    footer: {
        marginTop: 10,
        marginBottom: 20
    },

    ViewIcon: { height: '100%', justifyContent: 'center', alignItems: 'center' },

    img: { height: '100%' }


});




export default function Step3({ onSucess, liga, setLiga}) {

    const {titulo, descricao, banner, horaFechamento, horaResultado, valorEntrada, valorPremio, listaDeJogos} = liga;

    const setFechamento = (value) => {
        setLiga((prevState) => ({
            ...prevState,
            horaFechamento: value
        }));
    };

    const setBanner = (value) => {
        setLiga((prevState) => ({
            ...prevState,
            banner: value
        }));
    };

    const setResultado = (value) => {
        setLiga((prevState) => ({
            ...prevState,
            horaResultado: value
        }));
    };

    const setNomeLiga = (value) => {
        setLiga((prevState) => ({
            ...prevState,
            titulo: value
        }));
    };

    const setDescLiga = (value) => {
        setLiga((prevState) => ({
            ...prevState,
            descricao: value
        }));
    };

    const setPremio = (value) => {
        setLiga((prevState) => ({
            ...prevState,
            valorPremio: value
        }));
    };

    const setEntrada = (value) => {
        setLiga((prevState) => ({
            ...prevState,
            valorEntrada: value
        }));
    };

    const { salvar_dados, loadingSave } = useContext(FirebaseContext);

    

    const GoChooseFotos = async () => {


        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        setBanner(result.uri);



    }


    const cria_nova_liga = () => {


        if (titulo == '' || titulo == undefined) return Alert.alert("Atenção", "Campo nome vazio");
        if (descricao == '' || descricao == undefined) return Alert.alert("Atenção", "Campo descrição vazio");
        if (horaResultado == '' || horaResultado == undefined) return Alert.alert("Atenção", "Campo resultado vazio");
        if (valorEntrada == '' || valorEntrada == undefined) return Alert.alert("Atenção", "Campo entrada vazio");
        if (valorPremio == '' || valorPremio == undefined) return Alert.alert("Atenção", "Campo prêmio vazio");
        if (banner == null || banner == undefined) return Alert.alert("Atenção", "O banner está vazio");


        

        salvar_dados(liga, banner, ({sucess, text}) => {
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
                            valor={titulo}
                            onChange={setNomeLiga}
                            senha={false}
                            iconeColor={'black'}
                            tipoTeclado={'default'}
                        />

                        <CardInput
                            titulo={'Descrição da liga'}
                            hint={'Digite uma breve descrição'}
                            icone={'pencil-outline'}
                            valor={descricao}
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
                            valor={horaFechamento}
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
                            valor={horaResultado}
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
                            valor={valorEntrada}
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
                            valor={valorPremio}
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
                                    <Ionicons name='camera-outline' size={50} />
                                    <Title>Adiconar Foto</Title>
                                </View>}


                        </Card>
                    </View>


                    {
                        loadingSave ?
                        <Pb cor={"#000"} />
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

