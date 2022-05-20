import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView, Image, ImageBackground } from 'react-native';
import { TextInput, Button, Headline, Subheading } from 'react-native-paper';
import Botao from '../../Components/Botao';
import { colorBranco, colorCinza, colorCinzaClaro, colorPreto, colorVerde, colorVerdeClaro, colorVerdeEscuro } from '../../Styles/Cores';

const gif = require('../../Img/animacao.gif');
const gramado = require('../../Img/gramado.jpg');




export default function Intro({navigation}) {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');



    const handler_entrar = () =>{
        setEmail('');
        setPass('');

    }




    return (
        <SafeAreaView style={css.bg}>

            <ImageBackground source={gramado} style={{ flex: 1, padding: 10 }}>
                <ScrollView>

                    <Image 
                    style={css.img}
                    source={gif}/> 

                    <Headline style={css.headline}>
                        Fãs de Futebol recebem recompensas todos os dias aqui
                    </Headline>

                    <Subheading style={css.subHead}>
                        Palpite em jogos, acumule pontos e troque por recompensas
                    </Subheading>

                    <View style={css.container} />
            
                        <Botao
                            titulo={'Entrar'}
                            click={() => navigation.navigate('Login')}
                            cor={colorVerdeClaro}
                        />
                        <Botao
                            titulo={'Cadastrar'}
                            click={() => navigation.navigate('Cadastro')}
                            cor={colorPreto}
                        />

                    
                </ScrollView>


            </ImageBackground>



        </SafeAreaView>
    );
}



const css = StyleSheet.create({
    bg: {
        flex: 1,
    },
    input: {
        height: 60,
        marginBottom: 5,
        backgroundColor: '#ffffff',
        fontSize: 15
    },
    headline: {
        fontSize: 28,
        fontWeight: 'bold',
        marginLeft: 8,
        marginRight: 8,
        color: colorBranco
    },
    subHead: {
        marginBottom: 40,
        marginTop: 8,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 8,
        marginRight: 8,
        color: colorBranco
    },
    img: { 
        height: 350, 
        resizeMode:'contain',
        width: '100%', 
        marginBottom: 10, 
        marginTop: 30
    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    spacing: {
        width: 10
    }, 
    container: {
        flex: 1
    }
});