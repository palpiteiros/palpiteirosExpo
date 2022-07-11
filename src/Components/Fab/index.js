import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, DefaultTheme } from 'react-native-paper';
import { colorBranco, colorCinzaClaro, colorPreto, colorVerde } from '../../Styles/Cores';
import { colorVerdePadrao } from '../../Styles/Paleta/Paleta_cores';



export default function Fab({ icone, acao, title, enabled, loading, style}) {
    return (
        <FAB
            style={enabled !== false ? [css.fab, style] : [css.fabOff, style]}
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
        marginBottom: 18,
        marginRight: 28,
        marginLeft: 28,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute',
        backgroundColor: colorVerdePadrao
    },

    fabOff: {
        marginTop: 10,
        marginBottom: 18,
        marginRight: 28,
        marginLeft: 28,
        right: 0,
        bottom: 0,
        left: 0,
        position: 'absolute',
        backgroundColor: colorCinzaClaro
    },

    fabStyle: {
        fontSize: 30
    }
})