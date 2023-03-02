import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import {Stack} from "@react-native-material/core";
import {Button} from "react-native-paper";

export default function CameraComp({navigation}) {
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
    const [photo, setPhoto] = useState();

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === "granted");
            setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
        })();
    }, []);

    if (hasCameraPermission === undefined) {
        return <Text>Demande des permissions</Text>
    } else if (!hasCameraPermission) {
        return <Text>Vous n'avez pas les permissions nécessaires</Text>
    }

    let takePic = async () => {
        let options = {
            quality: 1,
            base64: true,
            exif: false
        };

        let newPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(newPhoto);
    };

    if (photo) {
        let sharePic = () => {
            shareAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };

        let savePhoto = () => {
            MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
                setPhoto(undefined);
            });
        };

        return (
            <SafeAreaView style={styles.container}>
                <Stack>
                    <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
                    <Button onPress={sharePic} icon={"share"}>Partager</Button>
                    {hasMediaLibraryPermission ? <Button icon="content-save" onPress={savePhoto}>Sauvegarder</Button> : undefined}
                    <Button icon="delete" onPress={() => setPhoto(undefined)}>Supprimer</Button>
                </Stack>
            </SafeAreaView>
        );
    }

    return (
            <Camera style={styles.container} ref={cameraRef}>
                <Button  mode={'contained-tonal'} style={styles.buttonContainer} title="Capture" onPress={takePic}></Button>
                <StatusBar style="auto"/>
            </Camera>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    textButton: {
        color: '#000000',
        fontSize: 10,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "red"
    },

    buttonContainer: {
        backgroundColor: '#ffffff',
        alignSelf: 'flex-end',
        marginBottom: 60,
        borderStyle: 'solid',
        borderWidth: 5,
        borderColor: '#cccccc',
        borderRadius: "50%"
    },
    preview: {
        flex: 1,
        resizeMode: "stretch",
        width: 400,
        height: 400
    }
});
