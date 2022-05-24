import React from 'react';
import { Text, SafeAreaView, Image, StyleSheet } from 'react-native';
import { Card, Headline, Subheading } from 'react-native-paper';

const css = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        borderRadius: 12,
        padding: 20,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    icon: {
        marginLeft: 14,
        marginTop: 14
    },
    titulo: {
        marginTop: 10,
        fontSize: 20,
        textAlign: 'center'
    }
});

export default function ItemGridMenu({img, titulo, click}) {
    //EM CONSTRUCAO
    return (
        <Card onPress={click} elevation={8} mode="elevated" style={css.container}>
            <Image source={img} />
            <Subheading style={css.titulo}>
                {titulo}
            </Subheading>
        </Card>
    );
}