import {Auth} from "aws-amplify";
import {useEffect, useState} from "react";
import {Image, StyleSheet, View} from "react-native";
import {Link} from "@react-navigation/native";
import {AppBar, Backdrop, BackdropSubheader, Box, Icon} from "@react-native-material/core";
import {isHoverEnabled} from "react-native/Libraries/Pressability/HoverState";
import { Button, Dialog, Portal, Provider, Text, Checkbox } from 'react-native-paper';

export default function Profil(){
    useEffect(() => {
        getAttributes().then(r => console.log(r));
    }, []);

    const [user, setUser] = useState(null);
    const [checked, setChecked] = useState(false);
    const [revealed, setRevealed] = useState(false);
    async function getAttributes(){
        try{
            const user = await Auth.currentAuthenticatedUser();
            setUser(user);
        } catch(e){
            console.log(e);
        }
    }

    const [visible, setVisible] = useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    return(
        <Provider>
            <View style={styles.container}>
                <Text>{user ? user.attributes.email : "Chargement..."}</Text>
                <View style={styles.checkbox}>
                    <Text>J'accepte les <Text style={styles.link} onPress={() => showDialog()}>conditions générales d'utilisation</Text></Text>
                    <Portal>
                        <Dialog visible={visible} onDismiss={hideDialog}>
                            <Dialog.Title style={{justifyContent: "center"}}>Conditions générales d'utilisation</Dialog.Title>
                            <Dialog.Content>
                                <Text variant="bodyMedium">Inserer</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button onPress={hideDialog}>Done</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                    <Checkbox status={checked ? 'checked' : 'unchecked'}
                              onPress={() => {
                                  setChecked(!checked);
                              }}/>
                </View>
                <Box style={styles.bottom}>
                    <Button style={styles.delete} icon="delete" mode="contained" onPress={() => console.log('Pressed')}>
                        Supprimer mon compte
                    </Button>
                </Box>
            </View>
        </Provider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    checkbox: {
      flexDirection: "row",
      alignItems: "center",
    },
    link : {
        color: "#0000EE",
    },
    delete: {
        backgroundColor: "#FF0000",
    },
    bottom: {
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 36,
        color: 'red'
    },
});