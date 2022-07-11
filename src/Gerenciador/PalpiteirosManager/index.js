import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ItemPalpiteirosManager from '../../Components/ItemPalpiteirosManager';
import Pb from '../../Components/Pb';
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import { colorPreto } from '../../Styles/Cores';

const css = StyleSheet.create({
    pb: {
        marginTop: 20
    },
    footer: {
        height: 10
    }
});

export default function PalpiteirosManager({navigation}) {


    const { getPalpiteiros, loading } = useContext(FirebaseContext);
    const [palpiteiros, setPalpiteiros] = useState(null);


    useEffect(() => {

        getPalpiteiros(list => {
            if(list != null) {
                setPalpiteiros(list);
            }
        });
    
    }, []);

    if(palpiteiros == null) return <Pb style={css.pb} cor={colorPreto} />

    console.log(JSON.stringify(palpiteiros))

    return (
        <FlatList
            data={palpiteiros}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => <View style={css.footer} />}
            ListFooterComponent={() => <View style={css.footer} />}
            renderItem={({ item }) => <ItemPalpiteirosManager cadastro={item.dataCadastro} email={item.email} nome={item.nome} numero={item.phone} />}
            keyExtractor={item => item.uid}
        />
    );
}