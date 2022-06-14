import React, { useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Alert } from 'react-native';
import Pb from '../../Components/Pb';
import { novaLiga } from '../../Objects/Liga';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const css = StyleSheet.create({});



export default function LigaCreator({ navigation }) {

    const [steps, setSteps] = useState(0);
    const [liga, setLiga] = useState(novaLiga());
    const [listaJogos, setListaJogos] = useState([]);


    const definirCampeonato = (id) => {
        setLiga((prevState) => ({
            ...prevState,
            campeonatoId: id
        }));
    };

    const avancarStep = () => {
        if (steps === 2) return;
        let novoStep = steps + 1;
        setSteps(novoStep);
    };

    const voltarStep = () => {
        if (steps === 0) return;
        let novoStep = steps - 1;
        setSteps(novoStep);
    };


 

    const avancar_com_lista_de_jogos = (lista) => {

        let listaEditada = [];
        console.log(lista);
        lista.forEach((data) => {

            let { data_realizacao, hora_realizacao } = data;
            let { placar_mandante, placar_visitante } = data;
            let { status, estadio, time_mandante, time_visitante } = data;
    
            let nomeEstadio = (estadio.nome_popular == undefined ? "" : estadio.nome_popular);
    
            let nomeMandante = time_mandante.nome_popular;
            let escudoTimeMandante = time_mandante.escudo;
            let siglaMandante = time_mandante.sigla;
    
            let nomeVisitante = time_visitante.nome_popular;
            let escudoTimeVisitante = time_visitante.escudo;
            let siglaVisitante = time_visitante.sigla;
    
            const jogoObjt = {
                data_realizacao,
                hora_realizacao,
                placar_mandante,
                placar_visitante,
                status,
                nomeEstadio, 
                nomeMandante,
                escudoTimeMandante,
                siglaMandante,
                nomeVisitante,
                escudoTimeVisitante,
                siglaVisitante
            };

            listaEditada.push(jogoObjt);
    
        });

        setListaJogos(listaEditada);
        avancarStep();

    }

   
    const saveSucess = () => {
        Alert.alert("Tudo Certo", 'Liga Salva com sucesso, mas ainda falta salvar o baner no storage e sua url no firestore');
        navigation.navigate("Ligas");
    };


    switch (steps) {
        case 0:
            return <Step1 setId={definirCampeonato} avancar={avancarStep} />
        case 1:
            return <Step2 id={liga.campeonatoId} setLista={avancar_com_lista_de_jogos} />
        case 2:
            return <Step3 jogos={listaJogos} onSucess={saveSucess} />
        default:
            return <Pb />
    }
}

