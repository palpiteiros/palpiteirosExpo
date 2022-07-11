import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { colorPreto, colorVerdeClaro } from '../../Styles/Cores';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pb from '../Pb';

const css = StyleSheet.create({
    botaostyle: {
        height: 48,
        backgroundColor: colorVerdeClaro,
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 8,
        elevation: 4
    },

    tituloBotao: {
        fontSize: 16,
        color: 'black',
        fontWeight: '500'
    }
});


export default function VariacaoBotao({ TituloBotao, acao, icone, loading, style }) {

    if(loading) return <Pb cor={colorPreto} />
    return (
        <TouchableOpacity style={[css.botaostyle, style]} onPress={acao} >
            <Text style={css.tituloBotao}>{String(TituloBotao).toLocaleUpperCase()}</Text>
            <Ionicons name={icone} size={28} color={'black'}/>
        </TouchableOpacity>
    );
}