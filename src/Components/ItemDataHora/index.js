import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { List } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colorCinza, colorVerdeEscuro } from '../../Styles/Cores';
import { colorAzulFosco } from '../../Styles/Paleta/Paleta_cores';

const css = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 4,
        marginRight: 16,
        
    },
    icone: {
        marginTop: 6
    },
    text: {
        marginLeft: 4
    },
    title: {
        color: colorCinza,
        fontSize: 13,
    },
    description: {
        fontSize: 12
    }
})

export default function ItemDataHora({titulo, descricao}) {
    return (
        <View style={css.container}>

            <List.Item
                left={() => (<Ionicons style={css.icone} name="calendar" size={25} />)}
                style={css.text}
                title={titulo}
                titleStyle={css.title}
                description={descricao}
                descriptionStyle={css.description}
            />

        </View>
    );
}
