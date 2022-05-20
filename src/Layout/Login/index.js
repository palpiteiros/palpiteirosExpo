import React, {useState} from 'react';
import { View, SafeAreaView, ImageBackground, StyleSheet, Alert } from 'react-native';
import { Button, DefaultTheme, Headline } from 'react-native-paper';
import Botao from '../../Components/Botao';
import EditText from '../../Components/EditText';
import Pb from '../../Components/Pb';
import { logarUser } from '../../Services/UserServices';
import { colorBranco, colorCinza, colorPreto, colorVerde, colorVerdeClaro } from '../../Styles/Cores';



const gramado = require('../../Img/gramado.jpg');

const BottomComponent = ({isLoading, click}) => {
    if(isLoading) {
        return <Pb />
    } else {
        return (
            <Botao
                titulo={'Entrar'}
                click={click}
                cor={colorVerdeClaro}
            />
        );
    }
    
    
};

export default function Login({navigation}) {

    const [email, setEmail] = useState('raphael12@gmail.com');
    const [senha, setSenha] = useState('12345678');
    const [isLoading, setIsLoading] = useState(false);

    async function clickLogin() {
        if(email.length < 6) {
            Alert.alert('Email Incorreto', 'Insira seu email completo para efetuar o seu login');
            return;
        }
        if(senha.length < 6) {
            Alert.alert('Senha Curta', 'Insira uma senha completa');
            return;
        }
        setIsLoading(true);
        const result = await logarUser(email, senha);
        console.log(result);
        if(!result.sucess) {
            Alert.alert('Erro no Login', result.msg);
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView  style={css.container}>
            <ImageBackground source={gramado} style={css.back}>
                <Headline style={css.headline}>
                    Fazer Login
                </Headline>
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
                <View style={css.viewEsqueci}>
                    <Button theme={theme} mode='text'>Esqueci minha senha</Button>
                </View>
                
                <View style={css.spacing} />
                <View style={css.containerBtn}>
                    <BottomComponent isLoading={isLoading} click={clickLogin} />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}

const theme = {
    ...DefaultTheme,
    colors: {
      primary: colorBranco,
    }
};

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
    viewEsqueci: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        alignContent: 'flex-end',
        marginTop: 22
    },
    spacing: {
        height: 16
    }
});