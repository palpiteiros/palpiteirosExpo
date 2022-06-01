
import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, View, StyleSheet, FlatList, Alert } from 'react-native';
import ItemCardJogos from '../../Components/ItemCardJogos';
import Fab from '../../Components/Fab';




const css = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        paddingLeft: 10,
        paddingRight: 10,
    },
    row: {
        flexDirection: 'row'
    },

    heard: {
        height: 150,
    }
});



export default function Step2({ navigation }) {






    const [jogos, setJogos] = useState([]);











    useEffect(() => {

        setJogos([

            {
                id: 1,
                nJogo: "1",
                casa: "Brasil",
                visitante: 'Alemanha',
                data: "05/02 as 20h",
                status: "Em andamento",
                logo1: "https://s3.static.brasilescola.uol.com.br/be/2021/11/bandeira-do-brasil.jpg",
                logo2: "https://s5.static.brasilescola.uol.com.br/be/2020/10/bandeira-da-alemanha.jpg",
                Campeonato: "Copa do mundo",
                selected: false

            },

            {
                id: 2,
                nJogo: "2",
                casa: "Croacia",
                visitante: 'Argentina',
                data: "08/03 as 15h",
                status: "Em andamento",
                logo1: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Croatia.svg/1280px-Flag_of_Croatia.svg.png",
                logo2: "https://images.educamaisbrasil.com.br/content/banco_de_imagens/guia-de-estudo/D/bandeira-da-argentina-oficial.jpg",
                Campeonato: "Copa do mundo",
                selected: false



            },

            {
                id: 3,
                nJogo: "3",
                casa: "Mongolia",
                visitante: 'Dinamarca',
                data: "22/03 as 21h",
                status: "Em andamento",
                logo1: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Flag_of_Croatia.svg/1280px-Flag_of_Croatia.svg.png",
                logo2: "https://images.educamaisbrasil.com.br/content/banco_de_imagens/guia-de-estudo/D/bandeira-da-argentina-oficial.jpg",
                Campeonato: "Copa do mundo",
                selected: false



            },
        ])

    }, [])






    function handlerClick(item) {

        const newItem = jogos.map((val) => {
            if (val.id == item.id) {
                return { ...val, selected: !val.selected }
            } else {
                return val;
            }
        });

        setJogos(newItem)

    }





    function proxTela() {

        const jogosSelecionados = jogos.filter(item => item.selected == true);

        if (jogosSelecionados.length == 0) {
            return Alert.alert("Atenção", 'Você precisa escolher pelo menos 1 jogo');
        }

        let msg = '';
        jogosSelecionados.forEach(item => {
            msg = msg + item.nJogo + ' - ' + item.casa + ' x ' + item.visitante + '\n';
        });
        Alert.alert("Confirme os jogos escolhidos", msg, [
            {
                text: 'Cancelar',
                onPress: () => { },
                style: 'cancel',
            },
            { text: 'Confirmar', onPress: () => navigation.navigate('Atributos finais', jogosSelecionados) },
        ]);


    }







    return (
        <SafeAreaView style={css.container}>

            <FlatList
                data={jogos}
                renderItem={({ item }) => <ItemCardJogos data={item} click={() => handlerClick(item)} />}
                keyExtractor={item => item.id}
            />



            <View style={{ flexDirection: 'row' }}>



                <Fab
                    icone={'arrow-right'}
                    acao={() => proxTela()}
                />

            </View>







        </SafeAreaView>
    );
}

