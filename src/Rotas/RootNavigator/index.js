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
    
    return (
      <NavigationContainer>
        <StatusBar  barStyle='light-content' />
        {user ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    );
  }