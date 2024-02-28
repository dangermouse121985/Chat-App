import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Start from './components/Start';
import Chat from './components/Chat.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function App() {
  const Stack = createNativeStackNavigator();

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
          component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
