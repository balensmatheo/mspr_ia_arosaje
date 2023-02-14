import {FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {Storage as Strg} from "aws-amplify";
import { VStack} from "@react-native-material/core";
import {Button, Card, Dialog, IconButton, MD3Colors, Portal, Provider} from "react-native-paper";
import * as React from "react";
import {Ionicons} from "@expo/vector-icons";
import {hide} from "react-native/Libraries/Utilities/LoadingView";
import {Predictions} from "@aws-amplify/predictions/lib";

export default function Myplants({navigation}){
    useEffect(() => {
        fetchImages().then(r => console.log(r));
        navigation.setOptions({
            headerRight: () => (
                <IconButton iconColor={MD3Colors.primary40} size={25} icon="reload" mode="text" onPress={() => {
                    reload()
                }}/>
            ),
        });
    }, [navigation]);

    const [plants, setPlants] = useState([{}]);
    const [keys, setKeys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [request, setRequest] = useState(false);

    const showDialog = () => setRequest(true);
    const hideDialog = () => setRequest(false);

    const fetchImages = async () => {
        const {results} = await Strg.list('', {level: 'protected', pageSize: "ALL"});
        setKeys(results);
        let S3Images = [];
        for (let i = 0; i < results.length; i++) {
            const url = await Strg.get(results[i].key, {level: 'protected'}).then(r => r).catch(e => console.log(e));
            S3Images.push({url});
            // add the key to the object
            S3Images[i].key = results[i].key;
        }
        setPlants(S3Images);
    }

    function identifyPlant(item) {
        if(item.item !== undefined){
            Predictions.identify({
                text: {
                    source: {
                        key: item.item.key,
                        level: 'protected'
                    },
                    format: "PLAIN"
                }
            }).then(r => console.log(r));
        }
    }

    function reload(){
        setLoading(true)
        fetchImages().then(r => console.log(r));
        setLoading(false)
    }

    const [toDelete, setToDelete] = useState("");
    async function deleteImage(item) {
        if(item.item !== undefined){
            setToDelete(item.item.key);
            showDialog();
        }
    }

    async function deleteImageConfirm() {
        try {
            await Strg.remove(toDelete, {level: 'protected'}).then(() => {
                hideDialog();
                reload();
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <Provider >
            <SafeAreaView>
                {
                    plants.length > 0 ?
                            <FlatList
                                data={plants}
                                renderItem={item => (
                                    <Card style={{margin: 10}}>
                                        <Card.Title title={item.item.key} subtitle="Plante" left={(props) => <Ionicons {...props} name="leaf-outline" size={24} color="green" />} />
                                        <Card.Cover source={{uri: item.item.url}} />
                                        <Card.Actions>
                                            <Button onPress={() => identifyPlant(item)}>Identifier</Button>
                                            <Button onPress={() => deleteImage(item)}>Supprimer</Button>
                                        </Card.Actions>
                                        <Portal>
                                            <Dialog visible={request} onDismiss={hideDialog}>
                                                <Dialog.Title>Vous allez supprimer {toDelete}</Dialog.Title>
                                                <Dialog.Content>
                                                    <Text variant="bodyMedium">La suppression est irréversible</Text>
                                                </Dialog.Content>
                                                <Dialog.Actions>
                                                    <Button onPress={hideDialog}>Annuler</Button>
                                                    <Button onPress={() => deleteImageConfirm()}>Supprimer</Button>
                                                </Dialog.Actions>
                                            </Dialog>
                                        </Portal>
                                    </Card>
                                )}
                                keyExtractor={item => item.key}
                            />
                        :
                        <View style={styles.errorImage}>
                            <Text style={styles.text}>Vous n'avez pas encore de plantes :(</Text>
                            <Image source={require('../../assets/8314259.png')} style={styles.image}/>
                            <Button style={styles.button} onPress={() => navigation.navigate("Accueil")}>Ajouter une plante</Button>
                        </View>
                }
            </SafeAreaView>
        </Provider>
    );
}


const styles = StyleSheet.create({
    scrollist: {
        marginTop: 10,
        marginBottom: 10,
    },
    errorImage: {
        display: 'flex',
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    button : {
        marginTop: 20,
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 350,
        height: 430,
        marginBottom: 20,
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logo: {
        padding: 10,
        height: 300,
        resizeMode: 'contain',
    },
    imageStyle: {
        width: '100%',
        height: 300,
        padding: 5,
        resizeMode: 'contain',
    },
    image : {
        marginTop: 20,
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
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
