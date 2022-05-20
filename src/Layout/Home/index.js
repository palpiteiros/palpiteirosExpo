import React,{useContext} from 'react';
import { View, Text } from 'react-native';
import Botao from '../../Components/Botao';
import { UserContext } from '../../Rotas/UserProvider';
import { logOut } from '../../Services/UserServices';
import { colorCinza } from '../../Styles/Cores';

export default function Home() {
    const { user, setUser } = useContext(UserContext);
    return (
      <Botao
        titulo={`Deslogar ${user.email}`}
        cor={colorCinza}
        click={logOut}
      />
    );
}