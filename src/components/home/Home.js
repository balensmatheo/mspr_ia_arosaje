import {Storage as Strg} from "aws-amplify";
import {View, Image, Text, StyleSheet, Alert, ToastAndroid} from "react-native";
import { Stack, Button } from "@react-native-material/core";
import {Checkbox, IconButton} from 'react-native-paper';
import * as MediaLibrary from "expo-media-library";
import {useState} from "react";
import {launchImageLibrary} from "react-native-image-picker";
import * as ImagePicker from "expo-image-picker";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {TextField} from "@aws-amplify/ui-react-native/src/primitives";
import { TextInput } from 'react-native-paper';

export default function Home({navigation}) {

    const [checked, setChecked] = useState(false);
    const [image, setImage] = useState(null);
    const [nomPlante, setNomPlante] = useState("");

    const setToastMsg = (msg) => {
        ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
    }


        const pickImage = async () => {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            } else {
                setToastMsg("Aucune image selectionnée");
            }
        };

    async function saveImage() {
        try{
            if (image) {
                const response = await fetch(image);
                const blob = await response.blob();
                // Envoie de l'image vers un bucket S3
                const result = await Strg.put(nomPlante + '.jpg', blob, {
                    level: "protected",
                    contentType: "image/jpg",
                }).then(() => {
                    setToastMsg("Image envoyée avec succès");
                    setImage(null);
                    navigation.navigate("Mes plantes")
                });
            }
        } catch (e) {
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
                <IconButton icon={"camera"} onPress={() => navigation.navigate("Camera")} title={"Prendre une photo"}/>
                <IconButton icon={"upload"} onPress={() => pickImage()} title={"Importer a partir de la galerie"}/>
            </View>
             <View>
                 <Image source={{uri: image}} style={{width: 200, height: 200}}/>
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
                             <Button
                                 variant="outlined"
                                 title="Delete"
                                 onPress={() => setImage(null) }
                                 leading={props => <Icon name="delete" {...props} />}
                             />
                             <Button onPress={() => saveImage()} title="Send" trailing={props => <Icon name="send" {...props} />} />
                         </Stack>
                     </View>
                     :
                     undefined
             }
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
