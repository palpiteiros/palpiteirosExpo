import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert, Text, ScrollView, SafeAreaView } from 'react-native';
import { createDrawerNavigator, DrawerContent, DrawerItemList, DrawerContentScrollView } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";
import Home from '../../Layout/Home';
import MeuPerfil from '../../Layout/MeuPerfil';
import { colorCinzaClaro, colorPreto, colorVerde, colorVerdeClaro } from '../../Styles/Cores';
import Logo from '../../Components/Logo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colorVerdePadrao } from '../../Styles/Paleta/Paleta_cores';
import MinhaCarteira from '../../Layout/MinhaCarteira';
import MeusPalpites from '../../Layout/MeusPalpites';
import DetalhesLigasUser from '../../Layout/DetalhesLigasUser';
import Recibo from '../../Layout/Recibo';
import Notificacoes from '../../Layout/Notificacoes';
import DetalhesJogosUser from '../../Layout/DetalhesJogosUser';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const css = StyleSheet.create({
    footer: {
        paddingLeft: 15,
        backgroundColor: colorVerdeClaro,
        flexDirection: 'row',
        height: 50,
        alignContent: 'center',
        alignItems: 'center'
    },
    itemIcon: {
        marginLeft: 16
    },
    itemText: {
        marginLeft: 16,
        fontSize: 18,
        color: colorPreto,
    },
    activeStyle: {
        backgroundColor: colorVerdePadrao,
        borderRadius: 4
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowRadius: 8,
        shadowOpacity: 0.2
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 12,
        paddingBottom: 12,
        borderTopWidth: 1,
        height: 55,
        borderColor: colorCinzaClaro
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



function ItemDrawer ({navigation,focused, title, icone, ...rest}) {


    return(

        <TouchableOpacity onPress={() => {navigation.navigate(title)}}>
            <View style={[
                css.item, 
                focused ? [css.activeStyle, css.shadow] : null
            ]}>
                <Ionicons style={css.itemIcon} color="#4F4F4F" size={25} name={icone} />
                <Text style={css.itemText}>{title}</Text>
            </View>
        </TouchableOpacity>
        

    );

}

const CostumDrawer = ({state, navigation, ...props}) => {

    let screen = [
        {name: 'Inicio', icon: 'home-outline'},
        {name: 'Meus Palpites', icon: 'clipboard-outline'},
        {name: 'Minha Carteira', icon: 'wallet-outline'},
        {name: 'Meu Perfil', icon: 'person-outline'},
    ];

    const sairConta = () => {
        Alert.alert("Confirmar saida", "Você tem certeza que deseja sair do app?")
    };

    return (
        <SafeAreaView style={{ flex: 1, marginTop: 26 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Logo />
                {screen.map((item, index) => {
                    return(
                        <ItemDrawer 
                            key={index}
                            navigation={navigation}
                            focused={state.index === index ? true : false}
                            title={item.name} 
                            icone={item.icon} 
                            {...props} />
                    );
                })}
            </ScrollView>
            <View>
                <TouchableOpacity onPress={() => sairConta()}>
                    <View style={css.footer}>
                        <Ionicons style={{ marginRight: 15 }} size={20} name='log-out-outline' />
                        <Text>Sair da conta</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

function HomeStack({route, navigation}) {

    
  
    return(
      <Stack.Navigator mode="card"  headerMode="none">

            <Stack.Screen 
                name="Home"
                component={Home}
                options={{
                    headerShown: false
                }}
            />
  
            <Stack.Screen
                name='Detalhes Da Liga'
                component={DetalhesLigasUser}
                options={{
                    headerShown: false
                }}

                
            />

            <Stack.Screen
                name='Jogos Da Liga'
                component={DetalhesJogosUser}
                options={{
                    headerShown: false
                }}
            />

            
          
      </Stack.Navigator>
    );
  }

export default function SideMenu({ navigation, route }) {

    

    const screenIndex = useNavigationState((state) => state?.routes[state.index]?.state?.routes[0]?.state?.index)

    const getTitle = () => {
        switch(screenIndex) {
            case 1:
                return 'Detalhes Da Liga';
            case 2:
                return 'Jogos Da Liga';
            default:
                return 'Inicio';
        }
    };

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
                name="Inicio"
                component={HomeStack}
                options={{
                    title: getTitle(),
                    headerShadowVisible: false,
                    headerTitle: getTitle(),
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

                    )
                }} />

            <Drawer.Screen
                name="Meus Palpites"
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
                name="Minha Carteira"
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
                name="Meu Perfil"
                component={MeuPerfil}
                options={{
                    title: 'Meu perfil',
                    headerTitle: 'Meu perfil',
                    drawerIcon: ({ color }) => (
                        <Ionicons size={20} color={color} name='person-outline' />
                    ),
                    headerShadowVisible: false
                }} />


            <Drawer.Screen
                name='Notificacoes'
                component={Notificacoes}
                options={{
                title: 'Notificações',
                headerTitle: 'Notificações',
                headerShown: true
                }}
            />

            <Drawer.Screen
                name='Recibo'
                component={Recibo}
                options={{
                    title: 'Recibo',
                    headerTitle: 'Recibo',
                    headerShown: false
                }}
            />

            
        </Drawer.Navigator>
    );
}