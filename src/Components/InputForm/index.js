import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colorVerdePadrao } from '../../Styles/Paleta/Paleta_cores';

const css = StyleSheet.create({
    input: {
        height: 50,
        marginBottom: 10
    }
})

export default function InputForm({ hint, tipo, valor, setValor }) {
 


    return (
        <TextInput
            activeUnderlineColor={colorVerdePadrao}
            style={css.input}
            placeholder={hint}
            keyboardType={tipo}
            value={valor}
            onChangeText={setValor}
        />
    );
}