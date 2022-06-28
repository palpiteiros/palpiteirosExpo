import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import { createDrawerNavigator, DrawerContent, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import Home from '../../Layout/Home';
import MeuPerfil from '../../Layout/MeuPerfil';
import { colorVerdeClaro } from '../../Styles/Cores';
import Logo from '../../Components/Logo';




const css = StyleSheet.create({
    footer: {
        paddingLeft: 15,
        backgroundColor: colorVerdeClaro,
        flexDirection: 'row',
        height: 50,
        alignContent: 'center',
        alignItems: 'center'
    },

})

const alertaMensage = (titulo, msg, acao) => {
    Alert.alert(titulo, msg,
        [
            {
                text: "Voltar",
                onPress: () => { },
                style: "cancel",
            },
            {
                text: "Confirmar",
                onPress: () => acao(),
                style: "confirm",
            },
        ],
    )
}


const sairConta = () => {
    alertaMensage("Confirmar saida", "Você tem certeza que deseja sair do app?")
}


const CostumDrawer = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>

                <Logo />
                <DrawerItemList {...props}>
                </DrawerItemList>
            </DrawerContentScrollView>
            <View>
                <TouchableOpacity onPress={() => sairConta()}>
                    <View style={css.footer}>
                        <Text>Sair da conta</Text>
                    </View>
                </TouchableOpacity>

            </View>

        </View>

    );
}

export default function SideMenu() {

    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator screenOptions={{
            headerShadowVisible:true,
            drawerActiveBackgroundColor: colorVerdeClaro,
            drawerActiveTintColor: 'black',
            drawerInactiveTintColor: '#888888',
            drawerLabelStyle: {
                //  marginLeft: -20,
            }
        }}
            drawerContent={(props) => <CostumDrawer {...props} />}
            initialRouteName="Home">

            <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Inicio',
                    headerTitle: 'Inicio',
                    headerStyle: {
                        backgroundColor: colorVerdeClaro
                    },
                    headerTintColor: 'black',
                    headerTitleStyle: {
                    },
                }} />

            <Drawer.Screen
                name="MeuPerfil"
                component={MeuPerfil}
                options={{
                    title: 'Meu perfil',
                    headerTitle: 'Meu perfil'
                }} />

        </Drawer.Navigator>
    );
}