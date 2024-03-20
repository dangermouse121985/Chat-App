import React from "react";
import Start from './components/Start';
import Chat from './components/Chat.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { initializeApp } from "firebase/app";
import { disableNetwork, enableNetwork, getFirestore } from "firebase/firestore";

import { useEffect } from 'react';
import { useNetInfo } from '@react-native-community/netinfo';
import { Alert } from 'react-native';
import { getStorage } from "firebase/storage"

import { API_Key, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from '@env';

export default function App() {
  const Stack = createNativeStackNavigator();
  const ConnectionStatus = useNetInfo();

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: API_Key,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const storage = getStorage(app);

  // Check network connectivity and display "Connection Lost" message is no network. Disable/Reenable Firestore depending on network connectivity.
  useEffect(() => {
    if (ConnectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (ConnectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [ConnectionStatus.isConnected])

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
          {props => <Chat
            isConnected={ConnectionStatus.isConnected}
            db={db}
            storage={storage}
            {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
