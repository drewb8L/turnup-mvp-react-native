import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from "expo-auth-session";


function HomePage (){
    const redirectUri = makeRedirectUri({
        useProxy: true,
    });

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: '669234385237-o1f57ihnr55c5ko03dapco5nugs0josk.apps.googleusercontent.com',
        iosClientId: '669234385237-9j0vr4jmdp0kgcacfsq3a72nttfro7ab.apps.googleusercontent.com',
        androidClientId: '669234385237-v0ha2usco0nesh6u4vtd2o46oqpug7at.apps.googleusercontent.com',
        webClientId: '669234385237-o1f57ihnr55c5ko03dapco5nugs0josk.apps.googleusercontent.com',
        redirectUri: redirectUri,
    });

    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            console.log('✅ Login Successful!');
            console.log('Access Token:', authentication?.accessToken);
        }
    },[response])

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ marginBottom: 20, fontSize: 18 }}>
                Sign in to get started
            </Text>
            <Button title={"Sign in with Google"}
                disabled={!request}
                    onPress={() =>{
                        promptAsync({useProxy: true, redirectUri: 'https://auth.expo.io/@your-username/your-app-slug'})
                    }}
            />
        </View>
    )
}

export default HomePage;