import React from 'react';
import { View } from 'react-native';

export default function DetalhesLiga({ route }) {

    const { documento } = route.params;

    console.log(documento.listadejogos);




    return (
        <View>

        </View>
    );
}