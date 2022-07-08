import React, { useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, Alert } from 'react-native';
import Pb from '../../Components/Pb';
import { newMatch, novaLiga } from '../../Objects/Liga';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const css = StyleSheet.create({});



export default function LigaCreator({ navigation }) {

    const [steps, setSteps] = useState(0);
    const [liga, setLiga] = useState(novaLiga());
    
    const listaJogos = liga.listaDeJogos;
    const setListaJogos = (value) => {
        setLiga((prevState) => ({
            ...prevState,
            listaDeJogos: value
        }));
    };


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


    const setRodada = (round) => {
        setLiga((prevState) => ({
            ...prevState,
            rodada: round
        }));
    };
 

    const avancar_com_lista_de_jogos = (lista) => {

        let listaEditada = [];
        //console.log(lista);
        lista.forEach((data) => {

            const {fixture, teams, goals, score} = data;
            const {id, date, timestamp, venue, status} = fixture;
            const golsHome = goals.home;
            const golsAway = goals.away;
            const timeMandante = teams.home;
            const timeVisitante = teams.away;
    
            const jogoObjt = newMatch(date, timestamp, id, golsHome, golsAway, status.long, venue.name, timeMandante.name, timeMandante.logo, timeMandante.id, timeVisitante.name, timeVisitante.logo, timeVisitante.id);

            listaEditada.push(jogoObjt);
    
        });

        setListaJogos(listaEditada);
        avancarStep();

    }

   
    const saveSucess = () => {
        Alert.alert("Tudo Certo", 'Liga Salva com sucesso');
        navigation.navigate("Ligas");
    };


    switch (steps) {
        case 0:
            return <Step1 setId={definirCampeonato} avancar={avancarStep} />
        case 1:
            return <Step2 id={liga.campeonatoId} setLista={avancar_com_lista_de_jogos} setRound={setRodada} />
        case 2:
            return <Step3 onSucess={saveSucess} liga={liga} setLiga={setLiga} />
        default:
            return <Pb />
    }
}

