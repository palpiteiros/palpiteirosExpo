import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { colorCinzaClaro, colorVerde } from '../../Styles/Cores';
import { colorVerdePadrao } from '../../Styles/Paleta/Paleta_cores';



export default function Fab({ icone, acao, title, enabled, loading}) {
    return (
        <FAB
            style={enabled !== false ? css.fab : css.fabOff}
            icon={icone}
            loading={loading}
            onPress={acao}
            label={title}
        />
    );
}



const css = StyleSheet.create({

    fab: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 20,
        right: 0,
        fontSize: 20,
        fontWeight: '800',
        backgroundColor: colorVerdePadrao
    },

    fabOff: {
        marginTop: 10,
        marginBottom: 10,
        marginRight: 20,
        marginLeft: 20,
        right: 0,
        backgroundColor: colorCinzaClaro
    },
})