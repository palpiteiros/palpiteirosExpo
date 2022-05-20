import React from 'react';
import { View, StyleSheet, TextInput} from 'react-native';
import { Card, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colorAmarelo, colorCinza } from '../../Styles/Cores';

export default function EditText({icone, titulo, inputNome, valor, funcao, senha}) {
    return (
        <Card elevation={6} style={css.card}>
            <View>
                <View style={css.row}>
                    <Icon style={css.icon} color="#4F4F4F" size={26} name={icone} />
                    <Title style={css.titulo}>{titulo}</Title>
                </View>
                <TextInput
                    style={css.input}
                    placeholder={inputNome}
                    value={valor}
                    selectionColor={colorCinza}
                    keyboardType={senha ? 'visible-password': 'default'}
                    secureTextEntry={!!senha}
                    onChangeText={(txt) => {
                        funcao(txt)
                    }}
                    
                />
            </View>
        </Card>
    );
}

const css = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        marginTop: 26,
        borderRadius: 12,
        padding: 3
    },
    row: {
        flexDirection: 'row',
    },
    input: {
        height: 60,
        marginBottom: 5,
        backgroundColor: '#ffffff',
        fontSize: 22,
        marginLeft: 14,
        marginRight: 14
        
    },
    titulo: {
        marginLeft: 14,
        marginTop: 12,
        fontSize: 18
    },
    icon: {
        marginLeft: 14,
        marginTop: 14
    }
});