import React, { useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet } from 'react-native';
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

        navigation.navigate('Atributos finais', lista);

    }

   



    switch (steps) {
        case 0:
            return <Step1 setId={definirCampeonato} avancar={avancarStep} />
        case 1:
            return <Step2 id={liga.campeonatoId} setLista={avancar_com_lista_de_jogos} />
        case 2:
            return <Step3 />
        default:
            return <Pb />
    }
}

