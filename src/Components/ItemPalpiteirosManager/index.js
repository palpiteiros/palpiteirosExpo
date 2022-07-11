import React from 'react';
import { ListViewBase, StyleSheet, Text, View } from 'react-native';
import { List, Avatar, Card, DefaultTheme } from 'react-native-paper';
import { dateToYMD } from '../../Objects/Datas';
import { colorCinza, colorGrafite } from '../../Styles/Cores';


const css = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 12,
        marginRight: 12,
        borderRadius: 6
    },
    avatar: {
        marginTop: 10,
        marginRight: 10,
        marginLeft: 10
    },
    title: {
        fontSize: 18
    }
});

const theme = {
    ...DefaultTheme,
    colors: {
      primary: colorCinza
    }
}

export default function ItemPalpiteirosManager({nome, numero, email, cadastro}) {
    return (
        <Card style={css.card}>
            <List.Item
                style={css.container}
                title={nome}
                titleStyle={css.title}
                description={`${email}\n${numero}`}
                right={() => <Text style={css.avatar}>{dateToYMD(new Date(cadastro))}</Text>}
                left={() => <Avatar.Text style={css.avatar} theme={theme} size={38} label={String(nome).substring(0, 2)} />}
            />
        </Card>
        
    );
}