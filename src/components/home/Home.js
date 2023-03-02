import {Storage as Strg} from "aws-amplify";
import {View, Image, Text, StyleSheet, Alert} from "react-native";
import { Stack } from "@react-native-material/core";
import {useState} from "react";
import * as ImagePicker from "expo-image-picker";
import {Button, TextInput} from 'react-native-paper';

export default function Home({navigation}) {

    const [checked, setChecked] = useState(false);
    const [image, setImage] = useState(null);
    const [nomPlante, setNomPlante] = useState("");
    const [loading, setLoading] = useState(false);



        const pickImage = async () => {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,

                aspect: [4, 3],
                quality: 1,
            });
            if (!result.canceled) {
                setImage(result.assets[0].uri);
            } else {
                console.log("Image annulée");
            }
        };

    async function saveImage() {
        try{
            if (image) {
                const response = await fetch(image);
                const blob = await response.blob();

                await Strg.put(nomPlante + ".jpg", image, {
                    level: 'protected',
                    customPrefix: {
                        protected: 'protected/predictions/index-faces/',
                    }
                }).then(response => console.log(response));
                setLoading(true)
                // Envoie de l'image vers un bucket S3
                const result = await Strg.put(nomPlante + '.jpg', blob, {
                    level: "protected",
                    contentType: "image/jpg",
                }).then(() => {
                    setImage(undefined);
                    setNomPlante("");
                    setLoading(false);
                    Alert.alert("Image sauvegardée");
                });
            }
        } catch (e) {
            setLoading(false);
            console.log(e)
        }
    }


    return (
         <View style={styles.container}>
            <Image
                source={require('../../assets/Logo_arosaje.png')}
                style={styles.logo}
            />
            <Text style={styles.welcome}>Bienvenue dans l'application A'rosa-je</Text>
            <View style={styles.buttonContainer}>
                <Button mode={"contained"} icon={"camera"} onPress={() => navigation.navigate("Camera")} title={"Prendre une photo"}>Prendre une photo</Button>
                <Button mode={"contained"} icon={"upload"} onPress={() => pickImage()} title={"Importer a partir de la galerie"}>Importer</Button>
            </View>
             <View>
                 {
                        image ?
                            <Image source={{uri: image}} style={{width: 200, height: 200}}/>
                            :
                            undefined
                 }

             </View>
             {
                 image ?
                     <View style={{marginTop: 15}}>
                         <Stack spacing={5}>
                             <TextInput
                                 style={{width: 300}}
                                 mode={"outlined"}
                                 label="Nom de la plante"
                                 value={nomPlante}
                                 onChangeText={nomPlante => setNomPlante(nomPlante)}
                             />
                             <Button icon={"delete"} onPress={() => setImage(null)}>Supprimer</Button>
                             <Button loading={loading} icon={"content-save"} onPress={() => saveImage()}>Sauvegarder</Button>
                         </Stack>
                     </View>
                     :
                     undefined
             }
             <View style={styles.footer}>
                 <Text style={styles.footerText}>A'rosa-je - 2023 ©</Text>
             </View>
        </View>
    );
}

const styles = StyleSheet.create({
    footer : {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36
    },
    footerText: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: 2,
        color: '#333333',
        marginBottom: 5,
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: "flex-end",
        width: '100%',
        padding: 10,
        alignItems: 'center',
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
