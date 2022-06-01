
import React, {useState, useEffect} from 'react';
import { Text, SafeAreaView, View, StyleSheet, FlatList } from 'react-native';
import ItemCardCampeonatos from '../../Components/ItemCardCampeonatos';


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




export default function Step1({ navigation }) {

    const [data, setData] = useState();


    useEffect(()=>{

        setData([
            {
                "id": 1,
                "banner": 'https://placar.abril.com.br/wp-content/uploads/2021/09/esporte-copa-taca-20180614-001-1.jpg',
                "Campeonato": "Copa do mundo",
                "edicao": 20,
                "temporada": 2022,
                "tipo": "mata-mata",
                "rodada": 10,
                "status": "0",
                "jogos":
               {
                    "id": 1,
                    "nJogo": "1",
                    "casa": "Brasil",
                    "visitante": 'Alemanha',
                    "data":"05/02 as 20h",
                    "status": "Em andamento",
                    "logo1":"https://s3.static.brasilescola.uol.com.br/be/2021/11/bandeira-do-brasil.jpg",
                    "logo2":"https://s5.static.brasilescola.uol.com.br/be/2020/10/bandeira-da-alemanha.jpg",

                }, 

            },
            
          
        ])

    },[])




    function proxTela() {
        navigation.navigate('Jogos' );
    }






    return (
        <SafeAreaView style={css.container}>

            <FlatList
                data={data}
                renderItem={({ item }) => <ItemCardCampeonatos click={proxTela} data={item} />}
                keyExtractor={item => item.id}
            />





        </SafeAreaView>
    );
}

