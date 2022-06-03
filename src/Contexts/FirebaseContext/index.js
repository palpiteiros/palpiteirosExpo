import React, { createContext, useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, setDoc, getDoc, addDoc, updateDoc, query, where, deleteDoc, orderBy, onSnapshot } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Alert } from 'react-native';
import firebase from '../../../config/firebase';



export const FirebaseContext = createContext({});

const db = getFirestore(firebase);
const storage = getStorage(firebase);



export default function FirebaseProvider({ children }) {

    const [dadosRecuperados, setDadosRecuperados] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);






    //SALVAR FOTOS





    //FUNCS PARA SALVAR NO FIRESTORE

    //Salva uma nova liga no firebase
    async function salvar_dados(tituloDocumento, documento, imgBanner) {
        setLoadingSave(true);

        await addDoc(collection(db, tituloDocumento), {

            documento,
            data_criacao: new Date(),
            status: 1

        }).then(async (doc) => {


            const id_Liga = doc.id;

            const img = await fetch(imgBanner);
            const btes = await img.blob();
            const caminho = 'BannerLigas/' + `images_banner_ligas${id_Liga}.png`;


            const storageRef = ref(storage, caminho);
            uploadBytes(storageRef, btes)
                .then(() => {

                    Alert.alert("Sucesso", "A liga foi criada com sucesso...");
                    setLoadingSave(false);


                    /*
                    getDownloadURL(ref(storage, caminho)).
                    then(async (url) => {
    
                        const atualizaDoc = doc(db, "ligas", "documento", id_Liga);
                        await updateDoc(atualizaDoc, {
                            bannerImg: url
                        }).then(() => {
                         
                        })
    
                    }).catch((e) => {
                        Alert.alert(e);
                    });
    
                    */

                }).catch((e) => {
                    Alert.alert(e);
                });


        }).catch((x) => {
            Alert.alert(x);
        });

    }








    //FUNCS PARA RECUPERAR DOCS NO FIRESTORE

    //Recuperar todos os documentos em uma coleção
    async function recuperar_todos_dados_colecao(tituloDocumento) {

        setLoading(true);



        const q = query(collection(db, tituloDocumento), orderBy('data_criacao', 'asc'));
        const querySnapshot = onSnapshot(q, (querySnap) => {

            const list = ([]);

            querySnap.forEach(doc => {

                list.push({
                    ...doc.data(),
                    id: doc.id
                });
            });


            setDadosRecuperados(list);
            setLoading(false);



        });



    }










    return (
        <FirebaseContext.Provider value={{
            salvar_dados,
            recuperar_todos_dados_colecao,
            dadosRecuperados,
            loading,
            loadingSave
        }}>
            {children}
        </FirebaseContext.Provider>
    )
}