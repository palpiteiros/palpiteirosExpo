import React, { useState, useContext } from 'react';
import { View, SafeAreaView, StyleSheet, Text, ScrollView, ImageBackground, Alert } from 'react-native';
import { Headline } from 'react-native-paper';
import { colorBranco, colorCinza, colorPreto, colorVerde, colorVerdeClaro } from '../../Styles/Cores';
import EditText from '../../Components/EditText';
import Botao from '../../Components/Botao';
import { criarUser } from '../../Services/UserServices';
import Pb from '../../Components/Pb';
import { UserContext } from '../../Rotas/UserProvider';



const gramado = require('../../Img/gramado.jpg');

const BottomComponent = ({isLoading, click}) => {
    if(isLoading) {
        return <Pb />
    } else {
        return (
            <Botao
                titulo={'Cadastrar'}
                click={click}
                cor={colorVerdeClaro}
            />
        );
    }
    
    
};

export default function Cadastro({navigation}) {

    const [email, setEmail] = useState('raphael12@gmail.com');
    const [nome, setNome] = useState('Raphael');
    const [senha, setSenha] = useState('12345678');
    const [contato, setContato] = useState('92991933525');
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(UserContext);

    async function clickCadastro() {
        if(email.length < 6) {
            Alert.alert('Email Incorreto', 'Insira seu email completo para efetuar o seu cadastro');
            return;
        }
        if(senha.length < 6) {
            Alert.alert('Senha Curta', 'Insira uma senha de no minimo 6 digitos');
            return;
        }
        setIsLoading(true);
        const result = await criarUser(email, senha, contato, nome);
        console.log(result);

        if(!result.sucess) {
            Alert.alert('Erro no Cadastro', `${result.msg}`);
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView  style={css.container}>
            <ImageBackground source={gramado} style={css.back}>
                <ScrollView>
                
                    <Headline style={css.headline}>
                        Completar Cadastro
                    </Headline>
                    <EditText
                        titulo={'Nome'}
                        valor={nome}
                        funcao={setNome}
                        icone={'account'}
                        inputNome={'Digite seu nome'}
                    />
                    <EditText
                        titulo={'Email'}
                        valor={email}
                        funcao={setEmail}
                        icone={'email'}
                        inputNome={'Digite seu email'}
                    />
                    <EditText
                        titulo={'Senha'}
                        valor={senha}
                        funcao={setSenha}
                        icone={'security'}
                        senha
                        inputNome={'Digite sua senha'}
                    />
                    <EditText
                        titulo={'Contato'}
                        valor={contato}
                        funcao={setContato}
                        icone={'cellphone'}
                        inputNome={'Digite seu Telefone'}
                    />
                    
                    <View style={css.spacing} />
                    
                    
                    <View style={css.containerBtn}>
                        <BottomComponent isLoading={isLoading} click={clickCadastro} />
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}


const css = StyleSheet.create({
    container: {
        flex: 1
    },
    back: {
        flex: 1,
        padding: 10
    },
    headline: {
        fontSize: 24,
        fontWeight: 'bold',
        marginLeft: 8,
        marginRight: 8,
        marginTop: 40,
        color: colorBranco
    },
    spacing: {
        height: 16
    }
});