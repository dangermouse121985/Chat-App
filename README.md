# React Native Chat App

## Overview

This project is a React Native mobile chat application designed to facilitate communication between users. It allows users to exchange text messages, share images, and send their current location. The app is built using React Native, Expo, and Google Firestore Database.

## Table of Contents

1. [Features and Requirements](#features-and-requirements)
2. [Technical Requirements](#technical-requirements)
3. [Screen Design & Assets](#screen-design--assets)
4. [Installation](#installation)

## Features and Requirements

### User Stories

- **New User**: Easily enter a chat room to start talking to friends and family.
- **User**: Send text messages to exchange news.
- **User**: Share images to show current activities.
- **User**: Share location to show current whereabouts.
- **User**: Read messages offline.
- **User with Visual Impairment**: Use a chat app compatible with a screen reader.

### Key Features

- **Customization**: Users can enter their name and choose a background color for the chat screen.
- **Chat Interface**: Display conversation with an input field and submit button.
- **Communication Features**: Sending images and location data.
- **Data Storage**: Online and offline storage of chat conversations.

## Technical Requirements

- Written in React Native.
- Developed using Expo.
- Styled according to given screen design.
- Chat conversations stored in Google Firestore Database.
- Users authenticated anonymously via Google Firebase authentication.
- Chat conversations stored locally.
- Users can pick and send images from phone's image library.
- Users can take pictures with device's camera app and send them.
- Images stored in Firebase Cloud Storage.
- User's location data retrieved and sent via map view.
- Chat interface and functionality created using the Gifted Chat library.
- Codebase contains comments.

## Screen Design & Assets

### Design Specifications

- Vertical and horizontal spacing: evenly distributed
- App title: font size 45, font weight 600, font color #FFFFFF
- "Your name": font size 16, font weight 300, font color #757083, 50% opacity
- "Choose background color": font size 16, font weight 300, font color #757083, 100% opacity
- Color options HEX codes: #090C08; #474056; #8A95A5; #B9C6AE
- Start chatting button: font size 16, font weight 600, font color #FFFFFF, button color #757083

## Installation

### Getting Started

Follow these instructions to set up and configure the project.

#### Install Expo CLI

Run the following command in a powershell terminal.

```Install Expo CLI
npm install -g expo-cli
```

#### Configure a Firebase Database

1. Create a Firebase Account at [Firebase Console](https://console.firebase.google.com/).
2. Create a New Project.
3. Configure your database storage as Production and set the storage rules to allow reads and writes (set to true).
4. Enable Anonymous Authentication.
5. In your project settings, create and register a web app.
6. Copy the Firebase config object; you will use this later.

##### FirebaseConfig Example

```
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

### Repository Installation

Follow these steps to install and run the project locally:

1. Clone the GitHub repository:

   ```
   git clone https://github.com/dangermouse121985/Chat-App.git
   ```

2. Navigate to the cloned repository in PowerShell:

   ```
   cd Chat-App
   ```

3. Copy the Firebase config variables into the matching variables in the `.env` file:

   - Create an `.env` file in the project directory.
   - Copy the Firebase config object from your Firebase console.
   - Enter the following code into the .env file (Replace the placeholder values with your Firebase config variables).

   ```
   API_Key=
   AUTH_DOMAIN=apiKeyPlaceholder
   PROJECT_ID=projectIdPlaceholder
   STORAGE_BUCKET=storageBucketPlaceholder
   MESSAGING_SENDER_ID=messagingSenderIdPlaceholder
   APP_ID=1:APP_IDPlaceholder
   ```

   apiKey: API_Key,
   authDomain: AUTH_DOMAIN,
   projectId: PROJECT_ID,
   storageBucket: STORAGE_BUCKET,
   messagingSenderId: MESSAGING_SENDER_ID,
   appId: APP_ID

4. Install the package dependencies:

   ```
   npm install
   ```

5. Start the server:

   ```
   expo start
   ```

6. You should now be able to run the app on an emulator or the Expo Go App on your phone