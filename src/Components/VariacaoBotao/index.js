import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { colorVerdeClaro } from '../../Styles/Cores';
import Ionicons from 'react-native-vector-icons/Ionicons';

const css = StyleSheet.create({
    botaostyle: {
        height: 45,
        width: '100%',
        backgroundColor: colorVerdeClaro,
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 8
    },

    tituloBotao: {
        fontSize: 16,
        color: 'black'
    }
});


export default function VariacaoBotao({ TituloBotao, acao, icone, data }) {
    return (
        <TouchableOpacity style={css.botaostyle} onPress={() => acao(0, data)} >
            <Text style={css.tituloBotao}>{String(TituloBotao).toLocaleUpperCase()}</Text>
            <Ionicons name={icone} size={25} color={'black'}/>
        </TouchableOpacity>
    );
}