import {FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {Predictions, Storage as Strg} from "aws-amplify";
import { VStack} from "@react-native-material/core";
import {Button, Card, Dialog, IconButton, MD3Colors, Portal, Provider} from "react-native-paper";
import * as React from "react";
import {Ionicons} from "@expo/vector-icons";

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
        Predictions.identify({
            entities: {
                source: {
                    key: keys[0].key,
                }
            }
        }).then(result => {
            console.log(result);
        }).catch(err => console.log(err));
    }

    function reload(){
        setLoading(true)
        fetchImages().then(r => console.log(r));
        setLoading(false)
    }

    async function deleteImage(item) {
        if(item.item !== undefined){
            Strg.remove(item.item.key, {level: 'protected'}).then(() => {
                reload();
                setRequest(false);
            }).catch(e => console.log(e));
        }
    }

    return (
        <Provider >
            <SafeAreaView>
                {
                    plants.length > 0 ?
                        <FlatList style={styles.scrollist} data={plants} renderItem={
                            (item, index) => (
                                <View style={styles.container}>
                                    <Card elevation={4} key={index} style={styles.card}>
                                        <Card.Content><Text style={styles.cardTitle}>{item.item.key}</Text></Card.Content>
                                        <Card.Cover source={{uri: item.item.url}} style={styles.imageStyle}/>
                                        <Card.Actions style={styles.buttonContainer}>
                                            <IconButton color={MD3Colors.primary40} size={25} onPress={() => {
                                                identifyPlant(item)
                                            }}/>
                                            <IconButton icon="delete" onPress={() => showDialog()}/>
                                        </Card.Actions>
                                    </Card>
                                    <Portal>
                                        <Dialog visible={request} onDismiss={hideDialog}>
                                            <Dialog.Title>Vous allez supprimer</Dialog.Title>
                                            <Dialog.Content>
                                                <Text variant="bodyMedium">La suppression est irréversible</Text>
                                            </Dialog.Content>
                                            <Dialog.Actions>
                                                <Button onPress={hideDialog}>Annuler</Button>
                                                <Button onPress={() => deleteImage(item)}>Confirmer</Button>
                                            </Dialog.Actions>
                                        </Dialog>
                                    </Portal>
                                </View>
                            )
                        }/>
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
