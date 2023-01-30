import {Image, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import {Storage as Strg} from "aws-amplify";

export default function Myplants(){
    useEffect(() => {
        fetchKeys().then(r => console.log(r))
        fetchPlants().then(r => console.log(r))
    }, []);

    const [plants, setPlants] = useState([]);
    const [keys, setKeys] = useState([]);
    async function fetchKeys(){
        try {
            Strg.list('', { level: 'protected', pageSize: "ALL" })
                .then(({ results }) => {
                    const tab = [];
                    console.log(results);
                    results.map((item) => {
                        tab.push(item.key);
                        setKeys(tab);
                    });
                })
                .catch((err) => console.log(err));
        } catch (e){
            console.log(e)
        }
    }

    async function fetchPlants(){
        try {
            const tab = [];
            keys.map((item) => {
                Strg.get(item, { level: 'protected' })
                    .then((result) => {
                        tab.push(result);
                        setPlants(tab);
                    })
                    .catch((err) => console.log(err));
            });
        } catch (e){
            console.log(e)
        }
    }
    return(
        <View style={styles.container}>
            {
                plants.length > 0 ?
                    plants.map((item, index) => {
                        return(
                            <View key={index}>
                                <Text>{item}</Text>
                            </View>
                        )
                    })
                    :
                    <Text>Vous n'avez pas encore ajouté de plantes</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: '100%',
        overflow: 'scroll',
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
