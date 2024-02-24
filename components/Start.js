import { useEffect, useState } from "react";
import { Button, TextInput, View, StyleSheet, Text, ImageBackground, TouchableOpacity, ScrollView, KeyboardAvoidingView, Image } from "react-native";


const Start = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [chatColor, setChatColor] = useState('')


    // Set Chat page background color
    const getChatColor = (color) => {
        setChatColor(color);
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={require("../images/background-image.png")} resizeMode="cover" style={styles.bgimage}>
                <Text style={styles.titleHeader}>myChat</Text>
                <View style={styles.signup}>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            value={username}
                            onChangeText={setUsername}
                            placeholder="Enter you username here"
                        />
                    </View>
                    <View style={styles.colorSelectorContainer}>
                        <Text style={styles.text}>Choose Background Color</Text>
                        <View style={styles.colorButtonsContainer}>

                            {/* div behind color buttons. Adds black outline around button when selected */}

                            <View style={[styles.colorIsSelected, chatColor === '#090C08' ? { borderColor: "#000" } : null]}>
                                <TouchableOpacity style={[styles.colorButtons, styles.black]} onPress={() => getChatColor('#090C08')}></TouchableOpacity>
                            </View>
                            <View style={[styles.colorIsSelected, chatColor === '#474056' ? { borderColor: "#000" } : null]}>
                                <TouchableOpacity style={[styles.colorButtons, styles.grape]} onPress={() => getChatColor('#474056')}></TouchableOpacity>
                            </View>
                            <View style={[styles.colorIsSelected, chatColor === '#8A95A5' ? { borderColor: "#000" } : null]}>
                                <TouchableOpacity style={[styles.colorButtons, styles.grey]} onPress={() => getChatColor('#8A95A5')}></TouchableOpacity>
                            </View>
                            <View style={[styles.colorIsSelected, chatColor === '#B9C6AE' ? { borderColor: "#000" } : null]}>
                                <TouchableOpacity style={[styles.colorButtons, styles.green]} onPress={() => getChatColor('#B9C6AE')}></TouchableOpacity>
                            </View>

                        </View>
                    </View>
                    <View style={styles.startButtonContainer}>
                        <Button style={styles.startButton}
                            title="Start Chatting"
                            onPress={() => navigation.navigate('Chat', { username: username, chatColor: chatColor })}
                        />
                    </View>
                </View>
            </ImageBackground >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
    },

    //background image
    bgimage: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    titleHeader: {
        fontSize: 45,
        fontWeight: '600',
        color: "#fff",
        flex: 6,
        marginTop: 50,
        padding: "25%"
    },

    // Container to hold Text Input, Color Selector, and Start Button
    signup: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: '44%',
        width: '88%',
        marginBottom: 100,
    },

    // Text Input Container
    textInputContainer: {
        width: "100%",
        alignItems: "center",
        flex: 2,
        justifyContent: "center",
        margin: 15,
    },
    textInput: {
        width: "88%",
        padding: 15,
        height: 50,
        borderWidth: 1,
        marginVertical: 15,
    },

    // Color Input Container
    colorSelectorContainer: {
        alignItems: 'center',
        margin: 15,
        flex: 2,
    },
    text: {
        flex: 1,
    },
    colorButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        flex: 1,
    },
    colorIsSelected: {
        height: 40,
        width: 40,
        borderRadius: 40 / 2,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "white",
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    colorButtons: {
        height: 32,
        width: 32,
        borderRadius: 32 / 2,
    },
    black: {
        backgroundColor: '#090C08',
    },
    grape: {
        backgroundColor: '#474056',
    },
    grey: {
        backgroundColor: '#8A95A5',
    },
    green: {
        backgroundColor: '#B9C6AE',
    },

    // Start Button container
    startButtonContainer: {
        margin: 15,
        flex: 2,
        width: "88%",
        justifyContent: "center"
    },
});

export default Start;