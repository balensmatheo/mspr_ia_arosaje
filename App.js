// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./src/components/home/Home";
import Camera from "./src/components/camera/CameraComp";
import {createDrawerNavigator} from "@react-navigation/drawer";

function HomeScreen() {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
  );
}

const Drawer = createDrawerNavigator();

function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Accueil" component={Home} />
                <Drawer.Screen name="Camera" component={Camera} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default App;