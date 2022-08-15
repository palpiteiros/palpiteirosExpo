import React, { createContext, useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, setDoc, getDoc, addDoc, updateDoc, query, where, deleteDoc, orderBy, onSnapshot, limit, writeBatch } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Alert } from 'react-native';
import firebase from '../../../config/firebase';
import { format } from 'date-fns';

export const FirebaseContext = createContext({});

const db = getFirestore(firebase);
const storage = getStorage(firebase);

export default function FirebaseProvider({ children }) {
    const [dadosRecuperados, setDadosRecuperados] = useState([]);
    const [palpitesVerificacao, setPalpitesVerificacao] = useState([]);
    const [dadosUser, setDadosUser] = useState(null);

    const [loading, setLoading] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);


    //Salva uma nova liga no firebase
    async function salvar_dados(documento, imgBanner, listener) {
        setLoadingSave(true);

        const refLiga = doc(collection(db, 'Ligas'));
        const idRefLiga = refLiga.id;

        Object.assign(documento, { id: idRefLiga });
        Object.assign(documento, { horaCriacao: Date.now() });


        const img = await fetch(imgBanner);
        const btes = await img.blob();
        const caminho = 'BannerLigas/' + `${idRefLiga}.png`;


        const storageRef = ref(storage, caminho);

        uploadBytes(storageRef, btes).then(() => {


            getDownloadURL(storageRef).then(async (url) => {

                Object.assign(documento, { banner: url });



                await setDoc(refLiga, documento).then(() => {

                    setLoadingSave(false);

                    return listener({ sucess: true, text: "Liga Salva com Sucesso!" });



                }).catch((e) => {
                    setLoadingSave(false);
                    return listener({ sucess: false, text: e });
                });


            }).catch((e) => {
                setLoadingSave(false);
                return listener({ sucess: false, text: e });
            });



        }).catch((e) => {
            setLoadingSave(false);
            return listener({ sucess: false, text: x });
        });



    };

    //Salva um novo palpite no firebase
    async function salvar_Palpite(documento, id, nome, idLiga, idCampeonato, listener) {
        setLoadingSave(true);

        const batch = writeBatch(db);

        const refPalpite = doc(collection(db, 'Palpites'));
        const idRefPalpite = refPalpite.id;
        const refPalpitePorLiga = doc(collection(db, 'PalpitesDaLiga', 'Ligas', idLiga), idRefPalpite);
        /*
        Object.assign(documento, { IdPalpite: idRefPalpite });
        Object.assign(documento, { HoraCriacaoPalpite: Date.now() });*/


        let bodyPalpite = {
            idPalpite: idRefPalpite,
            idUser: id,
            nomeUser: nome,
            idLiga: idLiga,
            idCampeonato: idCampeonato,
            horaResultado: 0,
            horaCriacaoPalpiteFormat: format(new Date(), ['dd/MM/yyyy'+' - '+'HH:mm']),
            horaCriacaoPalpite: Date.now(),
            partidas: documento,
            status: 0,
            ranking: {
                pontos: 0,
                media: 0,
                colocacao: 0
            }
        };

        batch.set(refPalpite, bodyPalpite);
        batch.set(refPalpitePorLiga, bodyPalpite);

        batch.commit().then(() => {
            setLoadingSave(false);
            return listener({ sucess: true, text: "Palpite salvo com Sucesso!" });

        }).catch((e) => {
            setLoadingSave(false);
            return listener({ sucess: false, text: e });
        });
    };

    async function update_matchs(id, list, listener) {
        updateDoc(doc(db, 'Ligas', id), {
            listaDeJogos: list
        }).then(() => {
            return listener({sucess: true});
        }).catch(error => {
            return listener({sucess: false});
        });
    }

    async function fechar_liga(id, listener) {
        updateDoc(doc(db, 'Ligas', id), {
            status: 2
        }).then(() => {
            return listener({sucess: true});
        }).catch(error => {
            return listener({sucess: false});
        });
    };

    async function abrir_liga(id, listener) {
        updateDoc(doc(db, 'Ligas', id), {
            status: 1
        }).then(() => {
            return listener({sucess: true});
        }).catch(error => {
            return listener({sucess: false});
        });
    };

    async function getMatchsByLeague(idLiga, listener) {
        const palpitesRef = collection(db, "Palpites");
        const q = query(palpitesRef, where("idLiga", "==", idLiga), where("status", "==", 0), limit(200));
        getDocs(q).then((querySnapshot) => {
            let list = [];

            if(querySnapshot.empty) {
                return listener({list: list});
            }
            querySnapshot.forEach(doc => {
                list.push(doc.data());
            });

            return listener({list: list});

        }).catch(error => {
            return listener(null);
        });
    };

    async function getRankingPalpiteByLegue(idLiga, listener) {
        const palpitesRef = collection(db, 'PalpitesDaLiga', 'Ligas', idLiga);
        const q = query(palpitesRef, orderBy('ranking', 'desc'), limit(10));
        getDocs(q).then((querySnapshot) => {
            let list = [];

            if(querySnapshot.empty) {
                return listener({list: list});
            }
            querySnapshot.forEach(doc => {
                list.push(doc.data());
            });

            return listener({list: list});

        }).catch(error => {
            console.log(error)
            return listener(null);
        });
    };

    async function atualizarPontosPalpites(palpites, jogosAtualizados, listener) {
        const batch = writeBatch(db);

        palpites.map(palpite => {
            const {partidas, idPalpite, idLiga} = palpite;

            let pontosTotalPalpite = 0;

            let novaLista = [];

            partidas.map(match => {

                let objPartida = match;

                const {golsMandante, golsVisitante, idJogo, resultado} = match;
                const indice = jogosAtualizados.findIndex(x => x.idPartida === idJogo);

                if(indice !== -1) {
                    const jogoAtual = jogosAtualizados[indice];

                    let pontosJogoAtual = 0;

                    const resultadoGolsMandante = jogoAtual.golsMandante;
                    const resultadoGolsVisitante = jogoAtual.golsVisitante;

                    //PONTUACAO
                    //acertou os gols mandante = 15 pontos
                    //acertou os gols visitante = 15 pontos
                    //acertou o resultado = 10 pontos
                    //acertou nmr de gols do mandante, do visitante e o resultando = +30 pontos

                    if(golsMandante === resultadoGolsMandante) {
                        //user palpitou certo o nmr de gols do mandante
                        pontosJogoAtual = pontosJogoAtual + 15;
                        pontosTotalPalpite = pontosTotalPalpite + 15;
                    }

                    if(golsVisitante === resultadoGolsVisitante) {
                        pontosJogoAtual = pontosJogoAtual + 15;
                        pontosTotalPalpite = pontosTotalPalpite + 15;
                    }


                    if(resultadoGolsMandante === resultadoGolsVisitante && resultado.tipo === 'Empate') {
                        //palpitou empate e acertou
                        pontosJogoAtual = pontosJogoAtual + 10;
                        pontosTotalPalpite = pontosTotalPalpite + 10;
                    } else if(resultadoGolsMandante > resultadoGolsVisitante && resultado.tipo === 'Mandante') {
                        //palpitou mandante e acertou
                        pontosJogoAtual = pontosJogoAtual + 10;
                        pontosTotalPalpite = pontosTotalPalpite + 10;
                    } else if(resultadoGolsMandante < resultadoGolsVisitante && resultado.tipo === 'Visitante'){
                        //palpitou visitante e acertou
                        pontosJogoAtual = pontosJogoAtual + 10;
                        pontosTotalPalpite = pontosTotalPalpite + 10;
                    }


                    if(pontosJogoAtual === 40) {
                        //acertou nmr de gols do mandante, do visitante e o resultando
                        pontosJogoAtual = pontosJogoAtual + 30;
                        pontosTotalPalpite = pontosTotalPalpite + 30;
                    }

                    Object.assign(objPartida, {ranking: pontosJogoAtual});
                    novaLista.push(objPartida);
                }

            });

            const objRank = {
                pontos: pontosTotalPalpite,
                media: (pontosTotalPalpite / partidas.length).toFixed(0),
                colocacao: 0
            };

            const refPalpite = doc(db, 'Palpites', idPalpite);
            const refPalpitePorLiga = doc(collection(db, 'PalpitesDaLiga', 'Ligas', idLiga), idPalpite);
            batch.update(refPalpite, {partidas: novaLista, ranking: pontosTotalPalpite , status: 1});
            batch.update(refPalpitePorLiga, {partidas: novaLista, ranking: pontosTotalPalpite , status: 1});

        });

        batch.commit().then(() => {
            return listener({sucess: true});
        }).catch(error => {
            return listener({sucess: false});
        });
    };

    async function rankerPalpites(ranking, listener) {
        const batch = writeBatch(db);
        let idL = '';
        ranking.map((item, i) => {
            const {idPalpite, idLiga} = item;

            idL = idLiga;

            if(i < 10) {
                const position = i + 1;
                const refPalpite = doc(db, 'Palpites', idPalpite);
                const refPalpitePorLiga = doc(collection(db, 'PalpitesDaLiga', 'Ligas', idLiga), idPalpite);
                batch.update(refPalpite, {posicao: position, premio: 10});
                batch.update(refPalpitePorLiga, {posicao: position, premio: 10});
            }
        });

        
        batch.update(doc(db, 'Ligas', idL), {status: 3});

        batch.commit().then(() => {
            return listener({sucess: true});
        }).catch(error => {
            return listener({sucess: false});
        });
    };

    //Recuperar todos os documentos em uma coleção
    function recuperar_todos_dados_colecao(tituloDocumento, listener) {
        setLoading(true);

        const q = query(collection(db, tituloDocumento), orderBy('horaCriacao', 'desc'));
        const querySnapshot = onSnapshot(q, (querySnap) => {
            let list = ([]);
            querySnap.forEach(doc => {
                list.push(doc.data());
            });
            setDadosRecuperados(list);
            setLoading(false);
            if(listener !== undefined) {
                listener(list);
            }
        }, error => {
            setDadosRecuperados([]);
            setLoading(false);
            if(listener !== undefined) {
                listener(null);
            }
        });
        return () => {
            setDadosRecuperados([]);
        };
    }


    function getPalpiteiros(listener) {
        setLoading(true);

        const q = query(collection(db, 'Usuario'), orderBy('dataCadastro', 'desc'));
        const querySnapshot = onSnapshot(q, (querySnap) => {
            const list = ([]);
            querySnap.forEach(doc => {
                list.push(doc.data());
            });
            setDadosRecuperados(list);
            setLoading(false);
            if(listener !== undefined) {
                listener(list);
            }
        }, error => {
            setDadosRecuperados([]);
            setLoading(false);
            if(listener !== undefined) {
                listener(null);
            }
        });
        return () => {
            setDadosRecuperados([]);
        };
    }

    function verifica_palpite_por_user(tituloDocumento, id) {
        setLoading(true);
        const q = query(collection(db, tituloDocumento), where('IdUser', '==', id), orderBy('HoraCriacaoPalpite', 'asc'));
        const querySnapshot = onSnapshot(q, (querySnap) => {
            const list = ([]);
            querySnap.forEach(doc => {
                list.push(doc.data());
            });
            setPalpitesVerificacao(list);
            setLoading(false);
        });
    }

    function recibo_palpite(tituloDocumento, id) {
        setLoading(true);
        const q = query(collection(db, tituloDocumento), where('IdUser', '==', id), orderBy('HoraCriacaoPalpite', 'asc'));
        const querySnapshot = onSnapshot(q, (querySnap) => {
            querySnap.forEach(doc => {
                setPalpitesVerificacao(doc.data());
            });
        });
    }

    function recupera_dados_perfil(tituloDocumento, id) {
        const q = query(collection(db, tituloDocumento), where('uid', '==', id));
        const queryS = onSnapshot(q, (querySnap) => {
            querySnap.forEach(doc => { 
                setDadosUser(doc.data());
                //console.log(doc.data());
            });
        });
    } 


    return (
        <FirebaseContext.Provider value={{
            salvar_dados,
            salvar_Palpite,
            update_matchs,
            fechar_liga,
            abrir_liga,
            recuperar_todos_dados_colecao,
            getPalpiteiros,
            getMatchsByLeague,
            atualizarPontosPalpites,
            rankerPalpites,
            verifica_palpite_por_user,
            recupera_dados_perfil,
            getRankingPalpiteByLegue,
            dadosUser,
            recibo_palpite,
            palpitesVerificacao,
            dadosRecuperados,
            loading,
            loadingSave
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}