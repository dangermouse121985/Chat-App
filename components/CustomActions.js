import React from "react";
import { Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
//import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
//import MapView from 'react-native-maps';

const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {
    const actionSheet = useActionSheet();

    const uploadAndSendImage = async (imageURI) => {
        const uniqueRefString = generateReference(imageURI);
        const response = await fetch(imageURI);
        const blob = await response.blob();
        const newUploadRef = ref(storage, uniqueRefString)
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
            console.log('File has been uploaded successfully');
            const imageURL = await getDownloadURL(snapshot.ref);
            onSend({ image: imageURL })
        })
    }

    const pickImage = async () => {
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissions?.granted) {
            let result = await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
            else Alert.alert("Permissions haven't been granted.")
        }
    };

    const takePhoto = async () => {
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
        if (permissions?.granted) {
            let result = await ImagePicker.launchCameraAsync();
            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
        } else Alert.alert("Permissions haven't been granted.");
    };

    const getLocation = async () => {
        let permissions = await Location.requestForegroundPermissionsAsync();
        if (permissions?.granted) {
            const location = await Location.getCurrentPositionAsync({});
            if (location) {
                onSend({
                    location: {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                    },
                });
            } else Alert.alert("Error occured while fetching location");
        } else Alert.alert("Permissions haven't been granted")
    };

    const generateReference = (uri) => {
        const timeStamp = (new Date()).getTime();
        const imageName = uri.split("/")[uri.split("/").length - 1];
        return `${userID}-${timeStamp}-${imageName}`
    }

    const onActionPress = () => {
        const options = ['Chose From Your Library', 'Take a Picture', 'Send Your Location', 'Cancel'];
        const cancelButtonIndex = options.length - 1;

        actionSheet.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
            },
            async (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        pickImage();
                        return;
                    case 1:
                        takePhoto();
                        return;
                    case 2:
                        getLocation();
                        break;
                    default:
                }
            },
        );
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onActionPress}>
            <View style={[styles.wrapper, wrapperStyle]}>
                <Text
                    style={[styles.iconText, iconTextStyle]}
                    accessible={true}
                    accessibilityLabel="More Options"
                    accessibilityHint="Send an image or your geolocation."
                >
                    +
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
    },
    wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
    },
    iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 26,
        lineHeight: 26,
        backgroundColor: 'transparent',
        textAlign: 'center',
    },

})
export default CustomActions;