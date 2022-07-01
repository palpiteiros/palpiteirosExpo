import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Card, Subheading } from 'react-native-paper';
import { colorVerdePadrao } from '../../Styles/Paleta/Paleta_cores';
import { colorVermelho } from '../../Styles/Cores';

const css = StyleSheet.create({
    card: {
        height: 60,
        borderRadius: 5,
        backgroundColor: 'white',
        elevation: 4,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 15,
        paddingLeft: 15,
        paddingRight: 15,
    }
})

export default function CardTransacao({ data }) {
    0
    const { date, idTransacao, tipo, valor } = data;
    return (
        <View style={css.card}>
            <MaterialCommunityIcons size={25} color={tipo == 'Entrada' ? colorVerdePadrao : colorVermelho} name={tipo == 'Entrada' ? 'arrow-top-left-bold-box' : 'arrow-bottom-right-bold-box'} />
            <Subheading style={{paddingLeft: 10}}>Houve uma {tipo} de R$ {valor}</Subheading>
        </View>

    );
}