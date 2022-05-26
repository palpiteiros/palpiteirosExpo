import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { colorVerde } from '../../Styles/Cores';



export default function Fab({ icone, acao }) {
    return (
        <FAB
            style={css.fab}
            icon={icone}
            onPress={acao}
        />
    );
}



const css = StyleSheet.create({

    fab: {

        position: 'absolute',
        margin: 15,
        right: 0,
        bottom: 13,
        backgroundColor: colorVerde
    },
})