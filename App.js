// In App.js in a new project

import * as React from 'react';
import {View, Text, Image, NavigatorIOS} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from "./src/components/home/Home";
import CameraComp from "./src/components/camera/CameraComp";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Myplants from "./src/components/myplants/Myplants";
import {Button, IconButton} from 'react-native-paper';
import {Amplify, Auth} from 'aws-amplify'
import awsconfig from './src/aws-exports'
import {Authenticator, useAuthenticator, useTheme} from "@aws-amplify/ui-react-native";
import {
    Predictions,
    AmazonAIPredictionsProvider
} from '@aws-amplify/predictions';
Amplify.configure(awsconfig);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

Amplify.configure(awsconfig)

const Drawer = createDrawerNavigator();
import { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui';
import {useEffect} from "react";
I18n.putVocabularies(translations);
import {IconComponentProvider, Icon} from "@react-native-material/core";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Profil from "./src/components/profil/Profil";
import PlantDetails from "./src/components/plantdetails/PlantDetails";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

I18n.setLanguage('fr');

I18n.putVocabulariesForLanguage('fr', {
    'Sign In': 'Connexion', // Tab header
    'Sign in': 'Connexion', // Button label
    'Sign in to your account': 'Bon retour parmi nous!',
    Username: 'Entrez votre email', // Username label
    Password: 'Entrez votre mot de passe', // Password label
    'Forgot Password?': 'Reset Password',
});
I18n.putVocabularies({
    fr: {
        'Sign In': 'Se connecter',
        'Sign Up': "S'inscrire",
        'Enter your Email': 'Entrez votre Email',
        'Enter your Password': 'Entrez votre mot de passe',
        'Forgot Password?': 'Mot de passe oublié?',
        "Reset Password": "Réinitialiser le mot de passe",
        Username: "Nom d'utilisateur",
        Password : 'Mot de passe',
    },
    es: {
        'Sign In': 'Registrarse',
        'Sign Up': 'Regístrate',
        Username: 'Nombre de usuario',
        Password: 'Contraseña',
    },
});

const MyAppHeader = () => {
    const {
        tokens: { space, fontSizes },
    } = useTheme();
    return (
        <View>
            <Text style={{ fontSize: fontSizes.xxxl, padding: space.xl }}>
                <Image
                    source={require('./src/assets/Logo_arosaje.png')}
                />
            </Text>
        </View>
    );
};

function SignOut() {
    const { signOut } = useAuthenticator();
    useEffect(() => {
        Auth.signOut().then(r => console.log(r));
    }, []);
    return null;
}


function LogoTitle(props) {
    return (
        <Text>Mes plantes</Text>
    )
}

function App() {
    const {
        tokens: { colors },
    } = useTheme();

    const Stack = createNativeStackNavigator();
    return (
        <Authenticator.Provider>
            <Authenticator
                // will wrap every subcomponent
                Container={(props) => (
                    // reuse default `Container` and apply custom background
                    <Authenticator.Container
                        {...props}
                    />
                )}
                // will render on every subcomponent
                Header={MyAppHeader}
            >
                <NavigationContainer>
                    <Drawer.Navigator initialRouteName="Home" >

                        <Drawer.Screen name="Accueil" component={Home} options={{
                            drawerActiveTintColor: "#009206",
                        }}/>
                        <Drawer.Screen name="Camera" component={CameraComp} options={{
                            drawerActiveTintColor: "#009206",
                        }} />
                        <Drawer.Screen
                            name="Mes plantes"
                            component={Myplants}
                            options={{
                                headerRight: () => (
                                    <IconButton style={{display: "flex"}} size={20} icon="reload" mode="text"/>
                                ),
                                drawerActiveTintColor: "#009206",
                            }}
                        />
                        <Drawer.Screen name="Profil" component={Profil} options={{
                            drawerActiveTintColor: "#009206",
                        }} />
                        <Drawer.Screen name={"Déconnexion"}  component={SignOut} options={{
                            drawerActiveTintColor: "#a9000c",
                        }} />
                    </Drawer.Navigator>
                </NavigationContainer>
            </Authenticator>
        </Authenticator.Provider>
    );
}

export default () => (
    <IconComponentProvider IconComponent={MaterialCommunityIcons}>
        <App/>
    </IconComponentProvider>
);