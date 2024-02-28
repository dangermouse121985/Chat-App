import { View, StyleSheet, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useEffect, useState } from "react";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
    const [messages, setMessages] = useState([]);
    const { username, chatColor } = route.params;

    // initial user message and system messages
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: "Hello Developer",
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: "React Native",
                    avatar: "https://placeimg.com/140/140/any"
                },
            },
            {
                _id: 2,
                text: `${username} has entered the chat. Welcome!!`,
                createdAt: new Date(),
                system: true,
            },
        ]);
    }, []);

    // append new messages to previous list of messages on message send
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }

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
                    _id: 1
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