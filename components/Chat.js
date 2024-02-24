import { View, StyleSheet, Text } from "react-native";
import { useEffect } from "react";

const Chat = ({ route, navigation }) => {
    const { username, chatColor } = route.params;
    console.log(chatColor)

    console.log(chatColor)
    useEffect(() => {
        navigation.setOptions({ title: username })
    }, [])

    return (
        <View style={[styles.container, { backgroundColor: chatColor }]}>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default Chat;