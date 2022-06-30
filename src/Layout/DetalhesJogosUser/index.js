import React, { useEffect, useState, useCallback, useMemo, useRef, useContext } from 'react';
import { SafeAreaView, Text, StyleSheet, View, FlatList, Dimensions, Alert, BackHandler } from 'react-native';
import { Card, Button, Subheading, Paragraph, Title, } from 'react-native-paper';
import ItemCardJogosUser from '../../Components/ItemCardJogosUser';
import BottomSheet, { useBottomSheetTimingConfigs } from '@gorhom/bottom-sheet';
import { Easing } from 'react-native-reanimated';
import ModalPalpites from '../../Components/ModalPalpites';
import VariacaoBotao from '../../Components/VariacaoBotao';
import { FirebaseContext } from '../../Contexts/FirebaseContext';
import { UserContext } from '../../Rotas/UserProvider';
import Pb from '../../Components/Pb';
import { StackActions, useNavigation } from '@react-navigation/native';
const css = StyleSheet.create({
    bg: {
        flex: 1
    },

    margin: {
        margin: 15
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
        paddingTop: 10,
    },

})


export default function DetalhesJogosUser({ route }) {
    const { salvar_Palpite, loadingSave } = useContext(FirebaseContext);
    const { user } = useContext(UserContext)
    const { dataLeagueCompleta } = route.params.data;
    const navigation = useNavigation();
    var listadejogos = route.params.data.listaDeJogos;
    var ligaId = route.params.data.campeonatoId;
    let IdUser = user.uid;

    const [matchSelected, setMatchSelected] = useState([]);
    const [palpites, setPalpites] = useState([]);
    const [palpitesVerificacao, setPalpitesVerificacao] = useState([]);

    const sheetRef = useRef(null);
    const snapPoints = useMemo(() => ["1%", "50%", "90%"], []);

    const handleSheetChange = useCallback((index) => {
    }, []);

    const handleSnapPress = (index, data) => {
        sheetRef.current?.snapToIndex(index);
        setMatchSelected(data);
    }

    BackHandler.addEventListener('hardwareBackPress', function () {
        Alert.alert("Termine de palpitar", "Você só pode voltar após finalizar a sequência de palpites");
        return true;
    });

    useEffect(() => {
        setPalpitesVerificacao(palpites);
    }, [palpites]);

    const confirmar = () => {
        salvar_Palpite(palpites, IdUser, ligaId, ({ sucess, text }) => {
            if (sucess) {
                setPalpites([]);
                Alert.alert("Palpites confirmados", "Seus palpites foram realizados com sucesso!");
                navigation.dispatch(StackActions.replace('Recibo'));
            } else {
                Alert.alert("Erro ao fazer palpite", text.message);
            }
        })
    }

    return (
        <SafeAreaView style={css.bg}>
            <View style={css.container}>
                {loadingSave ?
                    <Pb cor={'black'} /> :
                    <FlatList
                        data={listadejogos}
                        renderItem={({ item }) =>
                            <ItemCardJogosUser
                                data={item}
                                palpites={palpitesVerificacao}
                                abre={handleSnapPress} />}
                    />
                }
                {palpites.length == listadejogos.length ?
                    <View style={css.margin}>
                        <VariacaoBotao
                            TituloBotao={'Confirmar sequência de palpites'}
                            acao={confirmar}
                        />
                    </View>
                    : null}

                <BottomSheet
                    enablePanDownToClose={true}
                    ref={sheetRef}
                    snapPoints={snapPoints}
                    onChange={handleSheetChange}
                >
                    <ModalPalpites
                        idLiga={ligaId}
                        data={matchSelected}
                        refer={sheetRef}
                        armazenaPalpites={setPalpites}
                        PalpitesArmazenados={palpites}
                    />
                </BottomSheet>

            </View>
        </SafeAreaView>
    );
}