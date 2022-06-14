import React from 'react';
import { View, Text, SafeAreaView , StyleSheet, ImageBackground, TextInput } from 'react-native';
import { colorBranco, colorPretoFraco, colorPretoMaisFraco } from  '../../Styles/Paleta/Paleta_cores';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function CardInput({ widAdapter ,titulo, hint, icone, valor, onChange, senha,iconeColor, tipoTeclado, qntdLetras, bool}) {

    return (
        <View style={{ 
            height: 100,
            backgroundColor: colorBranco,
            borderRadius: 10, 
            marginBottom: 15,
            height: 100,
            width: widAdapter
            }} >

            <View style={css.headerCard}>


                <Ionicons name={icone} color={iconeColor} size={25} />
                <Text style={css.fontCard}>{titulo}</Text>



            </View>


            <View style={css.body}>
                <TextInput
                    editable={bool}
                    style={css.textInput}
                    placeholder={hint}
                    secureTextEntry={senha}
                    keyboardType={tipoTeclado}
                    maxLength={qntdLetras}
                    value={valor}
                    onChangeText={(txt)=> onChange(txt)}
                />
            </View>

        </View>

    );
}







const css = StyleSheet.create({
 

    textInput: {fontSize: 17},


    headerCard: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        paddingLeft: 15,

    },


    fontCard: {
        marginLeft: 15,
        fontSize: 15,
        fontWeight: 'bold',
        color: colorPretoMaisFraco,

    },
 
    body: { flexDirection: 'column', marginLeft: 20, marginRight: 15,  }
 
})