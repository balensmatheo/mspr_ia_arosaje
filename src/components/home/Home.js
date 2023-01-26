
import {View, Image, Button, Text, StyleSheet, Alert, ToastAndroid} from "react-native";
import {IconButton} from 'react-native-paper';
import * as MediaLibrary from "expo-media-library";
import {useState} from "react";
import {launchImageLibrary} from "react-native-image-picker";

export default function Home({navigation}) {


    const [pic, setPic] = useState("");

    const setToastMsg = (msg) => {
        ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }

    const uploadImage = async () => {
        let options = {
            quality: 1,
            includeBase64: true,
            base64: true,
            mediaType: "photo",
            exif: false
        };
        const result = await launchImageLibrary(options);
    }
    return (
         <View style={styles.container}>
            <Image
                source={require('../../assets/Logo_arosaje.png')}
                style={styles.logo}
            />
            <Text style={styles.welcome}>Bienvenue dans l'application A'rosa-je</Text>
            <View style={styles.buttonContainer}>
                <IconButton icon={"camera"} onPress={() => navigation.navigate("Camera")} title={"Prendre une photo"}/>
                <IconButton icon={"upload"} onPress={() => uploadImage()} title={"Importer a partir de la galerie"}/>
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
