import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import firebase from '../../../config/firebase';
import { UserContext } from '../UserProvider';
import { getAuth} from "firebase/auth";

import AppStack from '../AppStack';
import AuthStack from '../AuthStack';
import { StatusBar } from 'expo-status-bar';
import { colorAmarelo, colorVerde, colorVerdeEscuro } from '../../Styles/Cores';
import Pb from '../../Components/Pb';
import AdmStack from '../AdmStack';

const auth = getAuth(firebase);

export default function RootNavigator() {
    const { user, setUser } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      // onAuthStateChanged returns an unsubscriber
      const unsubscribeAuth = auth.onAuthStateChanged(async u => {
        console.log(u);
        setUser(u);
        setIsLoading(false)
        
      });
  
      // unsubscribe auth listener on unmount
      return unsubscribeAuth;
    }, []);
  
    if (isLoading) {
      return (
        <Pb />
      );
    }

    //Para o app do cliente
    //let ComponentStack = <AppStack />;
    let ComponentStack = <AdmStack />;
    
    return (
      <NavigationContainer>
        <StatusBar  barStyle='light-content' />
        {user ? ComponentStack : <AuthStack />}
      </NavigationContainer>
    );
  }