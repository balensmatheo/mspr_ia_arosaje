
import {View, Image, Button, Text, StyleSheet} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {IconButton} from 'react-native-paper';

export default function Home({navigation}) {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/Logo_arosaje.png')}
                style={styles.logo}
            />
            <Text style={styles.welcome}>Bienvenue dans l'application A'rosa-je</Text>

            <View style={styles.buttonContainer}>
                <IconButton icon={"camera"} onPress={() => navigation.navigate("Camera")} title={"Prendre une photo"}/>
                <IconButton icon={"upload"} title={"Importer a partir de la galerie"}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
