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

    console.log(loadingSave);



    //FUNCS PARA SALVAR NO FIRESTORE

    //Salva uma nova liga no firebase
    async function salvar_dados(documento, imgBanner, listener) {
        setLoadingSave(true);

        const refLiga = doc(collection(db, 'Ligas'));
        const idRefLiga = refLiga.id;

        Object.assign(documento, {id: idRefLiga});
        Object.assign(documento, {horaCriacao: Date.now()});


        const img = await fetch(imgBanner);
        const btes = await img.blob();
        const caminho = 'BannerLigas/' + `${idRefLiga}.png`;


        const storageRef = ref(storage, caminho);

        uploadBytes(storageRef, btes).then(() => {

                    
            getDownloadURL(storageRef).then(async (url) => {
    
                Object.assign(documento, {banner: url});

                

                await setDoc(refLiga, documento).then(() => {

                    setLoadingSave(false);

                    return listener({sucess: true, text: "Liga Salva com Sucesso!"});
        
        
        
                }).catch((e) => {
                    setLoadingSave(false);
                    return listener({sucess: false, text: e});
                });
                
    
            }).catch((e) => {
                setLoadingSave(false);
                return listener({sucess: false, text: e});
            });
    
                    

        }).catch((e) => {
            setLoadingSave(false);
            return listener({sucess: false, text: x});
        });

        

    };








    //FUNCS PARA RECUPERAR DOCS NO FIRESTORE

    //Recuperar todos os documentos em uma coleção
    function recuperar_todos_dados_colecao(tituloDocumento) {

        setLoading(true);



        const q = query(collection(db, tituloDocumento), orderBy('horaCriacao', 'asc'));
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