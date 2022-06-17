import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const css = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        marginTop: 20
    },

    botao: {
        height: '100%',
        width: '50%', 
        justifyContent: 'space-evenly',
        alignItems: 'center', 
    }
})

export default function BarTop({selecionaTudo, removeTudo}) {
    return (
        <View style={css.container}>

            <TouchableOpacity onPress={selecionaTudo} style={css.botao}>
                <Text>Selecionar tudo</Text>
            </TouchableOpacity>
 

            <TouchableOpacity onPress={removeTudo} style={css.botao}>
                <Text>Limpar lista</Text>
            </TouchableOpacity>

        </View>
    );
}