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
                {String(titulo).toLocaleUpperCase()}
        </Button>
    );
}

const css = StyleSheet.create({
    container: {
        flex: 1
    },
    botaoCadastro: {
        height: 50,
        justifyContent: 'center',
        borderRadius: 15,
        marginTop: 12,
    },
    txtBt: {
        fontSize: 18,
    },
});