import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function Botao({cor, click, titulo}) {
    return (
        <Button
            mode="contained"
            color={cor}
            style={css.botaoCadastro}
            uppercase={false} 
            labelStyle={css.txtBt}
            onPress={click}>
                {titulo}
        </Button>
    );
}

const css = StyleSheet.create({
    container: {
        flex: 1
    },
    botao: {
        height: 55,
        justifyContent: 'center',
        borderRadius: 6,
        marginTop: 12
    },
    botaoCadastro: {
        height: 55,
        justifyContent: 'center',
        borderRadius: 15,
        marginTop: 12
    },
    txtBt: {
        fontSize: 18
    },
});