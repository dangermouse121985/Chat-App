import { View, StyleSheet, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useEffect, useState } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { DocumentSnapshot, addDoc, collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

const Chat = ({ db, route, navigation }) => {
    const [messages, setMessages] = useState([]);
    const { username, chatColor, userID } = route.params;

    // Fetch messages from database in real time
    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubMessages = onSnapshot(q, (DocumentSnapshot) => {
            let newMessages = [];
            DocumentSnapshot.forEach(doc => {
                newMessages.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: new Date(doc.data().createdAt.toMillis())
                })
            });
            setMessages(newMessages);
        })

        //clean up code
        return () => {
            if (unsubMessages) unsubMessages();
        }

    }, []);

    // append new messages to previous list of messages on message send and save to Firestore database
    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
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

    return (
        <View style={[styles.container, { backgroundColor: chatColor }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
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