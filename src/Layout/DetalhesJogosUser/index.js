import React, { useEffect, useState, useCallback, useMemo, useRef, useContext } from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList, Dimensions, Alert } from 'react-native';
import { Card, Button, Subheading, Paragraph, Title, } from 'react-native-paper';
import ItemCardJogosUser from '../../Components/ItemCardJogosUser';
import BottomSheet, { useBottomSheetTimingConfigs } from '@gorhom/bottom-sheet';
import { Easing } from 'react-native-reanimated';
import ModalPalpites from '../../Components/ModalPalpites';
import VariacaoBotao from '../../Components/VariacaoBotao';
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import { UserContext } from '../../Rotas/UserProvider';
import Pb from '../../Components/Pb';
import { StackActions } from '@react-navigation/native';
import Fab from '../../Components/Fab';

const css = StyleSheet.create({
    bg: {
        flex: 1
    },

    margin: {
        height: 100
    },

    headerTitle: {
        height: 200,
        backgroundColor: 'white',
        width: '100%',
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    card: {
        flexDirection: 'column', height: 50,
        backgroundColor: 'white', marginTop: 5, borderRadius: 5,
        alignItems: 'center', justifyContent: 'center'
    },

    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },

    container: {
        flex: 1,
    },

    headePalpite: {
        marginTop: 0
    }
})


function HeaderPalpite() {
    return(
        <View style={css.headePalpite}>

        </View>
    )
}

function FooterComponent({confirmar, completo, loading}) {

    if(!completo) return <View style={{height: 40}} />;

    return(
        <View>
            <View style={css.margin}>
                <Fab
                    loading={loading}
                    icone={'check'}
                    title={'Confirmar palpites'}
                    acao={confirmar}
                />
            </View>
        </View>
    )
}

export default function DetalhesJogosUser({ route, navigation }) {
    const { salvar_Palpite, loadingSave } = useContext(FirebaseContext);
    const { user } = useContext(UserContext)
    const { dataLeagueCompleta } = route.params.data;
    let listadejogos = route.params.data.listaDeJogos;
    let ligaId = route.params.data.id;
    let campeonatoId = route.params.data.campeonatoId;
    let IdUser = user.uid;

    const [matchSelected, setMatchSelected] = useState([]);
    const [palpites, setPalpites] = useState([]);
    const [palpitesVerificacao, setPalpitesVerificacao] = useState([]);

    const sheetRef = useRef(null);
    const [index, setIndex] = useState(-1);


    const snapPoints = useMemo(() => ['95%'], []);

    const handleSheetChange = useCallback((i) => {
        setIndex(i);
    }, []);

    const handleSnapPress = (index, data) => {
        sheetRef.current.expand({duration: 500});
        setMatchSelected(data);
    }

    useEffect(() => {
        setPalpitesVerificacao(palpites);
    }, [palpites]);


    const confirmar = () => {
        if(loadingSave) return;
        
        salvar_Palpite(palpites, IdUser, ligaId, campeonatoId, ({ sucess, text }) => {
            if (sucess) {
                setPalpites([]);
                Alert.alert("Palpites confirmados", "Seus palpites foram realizados com sucesso!");
                navigation.navigate('Recibo');
            } else {
                Alert.alert("Erro ao fazer palpite", text.message);
            }
        })
    };

    console.log('Faltam: ' + (listadejogos.length - palpites.length));


    return (
        <SafeAreaView style={css.bg}>
            <View style={css.container}>
                <View>
                    {
                        loadingSave ?
                        <Pb cor={'black'} /> :
                        <FlatList
                            data={listadejogos}
                            ListHeaderComponent={() => <HeaderPalpite />}
                            keyExtractor={(item) => item.idPartida}
                            ListFooterComponent={() => <FooterComponent confirmar={confirmar} loading={loadingSave} completo={palpites.length === listadejogos.length} />}
                            renderItem={({ item }) =>
                                <ItemCardJogosUser
                                    data={item}
                                    palpites={palpitesVerificacao}
                            abre={handleSnapPress} />}
                        />
                    }
                    
                </View>
                

                <BottomSheet
                    enablePanDownToClose={true}
                    ref={sheetRef}
                    snapPoints={snapPoints}
                    index={index}
                    onChange={handleSheetChange}
                >
                    <ModalPalpites
                        idLiga={ligaId}
                        data={matchSelected}
                        refer={sheetRef}
                        armazenaPalpites={setPalpites}
                        PalpitesArmazenados={palpites}
                        fechar={() => {if(sheetRef.current !== undefined) sheetRef.current.close({duration: 300})}}
                    />
                </BottomSheet>

            </View>
        </SafeAreaView>
    );
}