
import React , {useState, useEffect} from 'react';
import { Text, SafeAreaView, View, StyleSheet, FlatList } from 'react-native';  
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

    heard:{
        height: 150,
    }
});
 


export default function Step2(props, {navigation}) {
 

    let items = props.route.params;

    const [checked, setChecked] = useState(false);

 
   
    const trueCheck = () => setChecked(!checked);



    


    function proxTela() {
        navigation.navigate('Atributos finais', items, checked );
    }



    


    return (
        <SafeAreaView style={css.container}>
 
            <FlatList
                data={items}
                renderItem={({item})=> <ItemCardJogos acao={trueCheck} seleciona={checked} data={item}/>}
                keyExtractor={item => item.id}
            />

        {checked ? 
            <Fab
            icone={'arrow-right'}
            acao={proxTela}
            />:
            null
        }

       


        </SafeAreaView>
    );
}

