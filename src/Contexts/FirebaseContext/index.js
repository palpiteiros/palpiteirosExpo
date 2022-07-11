import React, { createContext, useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, setDoc, getDoc, addDoc, updateDoc, query, where, deleteDoc, orderBy, onSnapshot } from 'firebase/firestore';
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
    async function salvar_Palpite(documento, id, idLiga, idCampeonato, listener) {
        setLoadingSave(true);

        const refPalpite = doc(collection(db, 'Palpites'));
        const idRefPalpite = refPalpite.id;
        /*
        Object.assign(documento, { IdPalpite: idRefPalpite });
        Object.assign(documento, { HoraCriacaoPalpite: Date.now() });*/


        let bodyPalpite = {
            idPalpite: idRefPalpite,
            idUser: id,
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

        await setDoc(refPalpite, bodyPalpite).then(() => {
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

    //Recuperar todos os documentos em uma coleção
    function recuperar_todos_dados_colecao(tituloDocumento) {
        setLoading(true);

        const q = query(collection(db, tituloDocumento), orderBy('horaCriacao', 'desc'));
        const querySnapshot = onSnapshot(q, (querySnap) => {
            const list = ([]);
            querySnap.forEach(doc => {
                list.push(doc.data());
            });
            setDadosRecuperados(list);
            setLoading(false);
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
            verifica_palpite_por_user,
            recupera_dados_perfil,
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