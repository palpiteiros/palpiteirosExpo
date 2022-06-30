import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, FlatList, BackHandler } from 'react-native';
import { Divider, Headline, List, Subheading } from 'react-native-paper';
import Botao from '../../Components/Botao';
import ItemDataHora from '../../Components/ItemDataHora';
import ItemJogoMasterAdm from '../../Components/ItemJogoMasterAdm';
import ItemJogoUser from '../../Components/ItemJogoUser';
import VariacaoBotao from '../../Components/VariacaoBotao';
import { dateToYMD } from '../../Objects/Datas';
import { colorCinza, colorVerdeClaro } from '../../Styles/Cores';

const css = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerHeader: {
        flex: 1,
        backgroundColor: '#fff'
    },
    row: {
        flexDirection: 'row'
    },

    heard: {
        height: 80,
    },
    img: {
        width: '100%',
        height: 190
    },
    headline: {
        fontWeight: 'bold',
        marginLeft: 16,
        marginTop: 16
    },
    subhead: {
        marginLeft: 16,
    },
    row: {
        flexDirection: 'row',
        marginBottom: -22
    },
    divider: {
        marginTop: 20,
    },
    btView: {
        margin: 5,
        height: 60,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10
    },

    containerButtons: {
        backgroundColor: '#f3f3f3',
        height: 75,
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2
    },


    espacingRow: {
        paddingLeft: 8,
        paddingRight: 8,
        marginTop: 16,
        marginBottom: 16
    },

    contentBtView: {
        backgroundColor: 'white',
        borderRadius: 8,
        elevation: 2,
        marginBottom: 5,
        marginTop: 5
    },

    corBg: {
        backgroundColor: '#f3f3f3',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },

    botaoCont: { 
        margin: 20
     }

});

function ButtonView({ title, description, click }) {
    return (
        <View style={css.btView} >
            <Text>{title}</Text>
            <Text>{description}</Text>
        </View>
    )
}

function HeaderDetalhes({ data , compraTicket}) {
    const { horaCriacao, horaFechamento, horaResultado, valorEntrada, valorPremio } = data;

    const alerta = (title, text) => {
        Alert.alert(title, text);
    };

    return (
        <View style={css.containerHeader}>
            <Image source={{ uri: data.banner }} style={css.img} />
            <Headline style={css.headline}>
                {data.titulo}
            </Headline>
            <Subheading style={css.subhead}>
                {data.descricao}
            </Subheading>
            <View style={css.row}>
                <ItemDataHora titulo={horaFechamento} descricao={'Fechamento'} />
                <ItemDataHora titulo={horaResultado} descricao={'Resultado'} />
            </View>

            <Divider style={css.divider} />

            <View style={css.containerButtons}>

                <ButtonView
                    title={'R$ ' + valorEntrada}
                    description={'Entrada'}
                />

                <ButtonView
                    title={'R$ ' + valorPremio}
                    description={'Premiação'}
                />


                <ButtonView
                    title={'500'}
                    description={'Palpites'}
                />
            </View>



            <View style={css.botaoCont}>
                <VariacaoBotao
                    icone={'return-up-forward-outline'}
                    TituloBotao={"R$ "+valorEntrada+' para palpitar nesta liga'}
                    acao={compraTicket}
                />
            </View>

        </View>
    );
}



export default function DetalhesLigasUser({ route, navigation }) {

    const { data } = route.params; 

    let dataLiga ={
        campeonatoId: data.campeonatoId,
        listaDeJogos: data.listaDeJogos
    }
    const ComprarTicketPalpite = () => { 
        navigation.navigate('DetalhesJogosUser', {data: dataLiga, dataLeagueCompleta:data})
    } 

    BackHandler.addEventListener('hardwareBackPress', function(){
        navigation.navigate('SideMenu')
    })

    return (
        <View style={css.container}>
            <FlatList
                ListHeaderComponent={() => <HeaderDetalhes data={data} compraTicket={ComprarTicketPalpite}/>}
                data={data.listaDeJogos}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => <ItemJogoUser data={item} verificaAdm={false} />}
            />
        </View>

    );
}