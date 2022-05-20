import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updatePhoneNumber, updateCurrentUser, updateProfile } from 'firebase/auth';
import {collection, getFirestore, doc, setDoc} from 'firebase/firestore';
import firebase from '../../../config/firebase';
import { novoUsuario } from '../../Objects/Usuario';

const auth = getAuth(firebase);
const db = getFirestore(firebase);

async function updateUser(nome) {
    return updateProfile(auth.currentUser, { displayName: nome });
}


export async function criarUser(email, senha, telefone, nome) {
    
    
    return createUserWithEmailAndPassword(auth, email, senha).then(async ({user}) => {

        let novo = novoUsuario(user.uid, nome, telefone, email);
        
        let ref = doc(db, 'Usuario', user.uid);
        return await setDoc(ref, novo).then(() => {
                return updateUser(nome).then(() => {
                    user.reload();
                    return {
                        sucess: true,
                        user: user
                    };
                });

            }).catch(error => {
            return {
                sucess: false,
                msg: error
            };
        });
        
    }).catch(error => {

      if (error.code === 'auth/email-already-in-use') {
        return {
            sucess: false,
            msg: 'Email em uso. Já existe uma conta com o endereço de e-mail fornecido'
        };
      }

      if (error.code === 'auth/invalid-email') {
        return {
            sucess: false,
            msg: 'Digite um e-mail real. Esse e-mail que você digitou é invalido'
        };
      }

      if (error.code === 'auth/weak-password') {
        return {
            sucess: false,
            msg: 'Senha Fraca. Insira uma senha maior e mais segura'
        };
      }

      return {
          sucess: false,
          msg: error
      };

    });
};

export function logOut() {
    return auth.signOut();
}

export async function logarUser(email, senha) {
    return signInWithEmailAndPassword(auth, email, senha).then(async ({user}) => {
        return {
            sucess: true
        }
    }).catch(error => {
          if (error.code === 'auth/invalid-email') {
            return {
                sucess: false,
                msg: 'Digite um e-mail real. Esse e-mail que você digitou é invalido'
            };
          }
  
          if (error.code === 'auth/user-disabled') {
            return {
                sucess: false,
                msg: 'Usuário bloqueado. Usuário correspondente ao e-mail fornecido foi desabilitado'
            };
          }
  
          if (error.code === 'auth/user-not-found') {
            //nenhum usuario encontrado 
            return {
                sucess: false,
                msg: 'Nenhum Usuário encontrado'
            };
          }
  
          if (error.code === 'auth/wrong-password') {
            return {
                sucess: false,
                msg: 'Senha incorreta. Você inseriu a senha errada. Tente novamente'
            };
          }
    });
}