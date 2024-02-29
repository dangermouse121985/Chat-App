import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function App() {
  const Stack = createNativeStackNavigator();

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAR2D6HDSB5sXR2BDHjRGycxDbi3m292iM",
    authDomain: "chat-app-36941.firebaseapp.com",
    projectId: "chat-app-36941",
    storageBucket: "chat-app-36941.appspot.com",
    messagingSenderId: "879873403282",
    appId: "1:879873403282:web:d73ea3f239d895abd9794b"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Start'
      >
        <Stack.Screen
          name='Start'
          component={Start}
        />
        <Stack.Screen
          name='Chat'
        >
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
