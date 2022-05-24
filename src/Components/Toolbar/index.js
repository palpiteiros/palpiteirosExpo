import React from 'react';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
import { Headline, Subheading } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const css = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center'
    },
    icon: {
        marginLeft: 14,
        marginTop: 14
    },
    titulo: {
        fontWeight: 'bold',
        marginLeft: 12,
        marginRight: 10,
    }
});

export default function Toolbar({corText, icone, titulo}) {

    //EM CONSTRUCAO

    let corTextoPadrao = "#4F4F4F";
    if(corText) {
        corTextoPadrao = corText;
    }

    let iconEsq = null;
    if(icone) {
        iconEsq = <Icon style={css.icon} color={corTextoPadrao} size={26} name={icone} />;
    }

    return (
        <View style={css.container}>
            {iconEsq}
            <Headline style={css.titulo}>
                {titulo}
            </Headline>
        </View>
    );
}