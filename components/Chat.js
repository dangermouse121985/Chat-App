import { View, StyleSheet, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useEffect, useState } from "react";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { DocumentSnapshot, addDoc, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ db, route, navigation, isConnected }) => {
    const [messages, setMessages] = useState([]);
    const { username, chatColor, userID } = route.params;

    // Fetch messages from database in real time
    useEffect(() => {
        let unsubMessages;

        // load messages from database is device is connected to network. Otherwise load messages from the local storage
        if (isConnected === true) {
            // unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed
            if (unsubMessages) unsubMessages();
            unsubMessages = null;

            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubMessages = onSnapshot(q, (DocumentSnapshot) => {
                let newMessages = [];
                DocumentSnapshot.forEach(doc => {
                    newMessages.push({
                        id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis())
                    })
                });
                cacheChatMessages(newMessages);
                setMessages(newMessages);
            })
        } else loadCachedMessages();

        //clean up code
        return () => {
            if (unsubMessages) unsubMessages();
        }

    }, [isConnected]);

    // append new messages to previous list of messages on message send and save to Firestore database
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
    }

    // Cache Message to local storage
    const cacheChatMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('chat_messages', JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    }

    // load cached messages from local storage
    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem('chat_messages') || [];
        setMessages(JSON.parse(cachedMessages));
    }

    // Display Username in title header
    useEffect(() => {
        navigation.setOptions({ title: username })
    }, [])

    // set bubble to background color to white (right bubbles) and black (left bubbles)
    const renderBubble = (props) => {
        return <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: "#000"
                },
                left: {
                    backgroundColor: "#FFF"
                }
            }}
        />
    }

    // Hide Input Toolbar if network connectivity is lost
    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    }

    return (
        <View style={[styles.container, { backgroundColor: chatColor }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: username
                }}
            />
            {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
export default Chat;