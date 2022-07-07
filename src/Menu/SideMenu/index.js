import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text } from 'react-native';
import { createDrawerNavigator, DrawerContent, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import Home from '../../Layout/Home';
import MeuPerfil from '../../Layout/MeuPerfil';
import { colorVerdeClaro } from '../../Styles/Cores';
import Logo from '../../Components/Logo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colorVerdePadrao } from '../../Styles/Paleta/Paleta_cores';
import MinhaCarteira from '../../Layout/MinhaCarteira';
import MeusPalpites from '../../Layout/MeusPalpites';


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
                        <Ionicons style={{ marginRight: 15 }} size={20} name='log-out-outline' />
                        <Text>Sair da conta</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default function SideMenu({ navigation }) {

    const Drawer = createDrawerNavigator();
    const GoToNotification = () => {
        navigation.navigate("Notificacoes")
    }

    return (
        <Drawer.Navigator screenOptions={{
            headerShadowVisible: true,
            drawerActiveBackgroundColor: colorVerdeClaro,
            drawerActiveTintColor: 'black',
            drawerInactiveTintColor: '#888888',
            drawerLabelStyle: {
                marginLeft: -20,
            }
        }}
            drawerContent={(props) => <CostumDrawer {...props} />}>

            <Drawer.Screen
                name="Home"
                component={Home}
                options={{
                    title: 'Inicio',
                    headerShadowVisible: false,
                    headerTitle: 'Inicio',
                    headerStyle: {
                        backgroundColor: 'white',
                    },
                    headerTintColor: 'black',
                    headerTitleStyle: {
                    },
                    headerRight: () => (
                        <Ionicons
                            onPress={() => GoToNotification()}
                            style={{ marginRight: 20 }}
                            name='notifications' color={"#2b2b2b"} size={25} />

                    ),
                    drawerIcon: ({ color }) => (
                        <Ionicons size={20} color={color} name='home-outline' />
                    ),
                }} />

            <Drawer.Screen
                name="MeusPalpites"
                component={MeusPalpites}
                options={{
                    title: 'Meus palpites',
                    headerTitle: 'Meus palpites',
                    drawerIcon: ({ color }) => (
                        <Ionicons size={20} color={color} name='clipboard-outline' />
                    ),
                    headerShadowVisible: false
                }} />

            <Drawer.Screen
                name="MinhaCarteira"
                component={MinhaCarteira}
                options={{
                    title: 'Minha carteira',
                    headerTitle: 'Minha carteira',
                    drawerIcon: ({ color }) => (
                        <Ionicons size={20} color={color} name='wallet-outline' />
                    ),
                    headerShadowVisible: false
                }} />

            <Drawer.Screen
                name="MeuPerfil"
                component={MeuPerfil}
                options={{
                    title: 'Meu perfil',
                    headerTitle: 'Meu perfil',
                    drawerIcon: ({ color }) => (
                        <Ionicons size={20} color={color} name='person-outline' />
                    ),
                    headerShadowVisible: false
                }} />

        </Drawer.Navigator>
    );
}