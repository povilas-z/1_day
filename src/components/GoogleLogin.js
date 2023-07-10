import React, {useEffect} from 'react'
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { Text } from 'react-native-paper'
import * as Google from 'expo-auth-session/providers/google'
import firebase from 'firebase/compat/app'
import { GoogleLogo } from '../../assets/icons'
import { theme } from '../core/theme'
import { ANDROID_GOOGLE_CLIENT_ID, IOS_GOOGLE_CLIENT_ID, WEB_GOOGLE_CLIENT_ID } from '../core/config'
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from 'expo-auth-session'

WebBrowser.maybeCompleteAuthSession();

const discovery = {
    authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenEndpoint: 'https://oauth2.googleapis.com/token',
    revocationEndpoint: 'https://oauth2.googleapis.com/revoke',
  };

export default function GoogleLogin() {
    
    const [request, response, promptAsync] = Google.useAuthRequest(
        {
            clientId: Platform.OS === "android"
                ? ANDROID_GOOGLE_CLIENT_ID
                : Platform.OS === 'ios' ? IOS_GOOGLE_CLIENT_ID
                : WEB_GOOGLE_CLIENT_ID,
            scopes: ["profile", "email"], 
        },
        discovery
        );

        useEffect( () => {
            if (response?.type === 'success') {
                const { id_token, access_token } = response.params;
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    id_token,
                    access_token
                );
                firebase.auth().signInWithCredential(credential).catch((error) => {
                    console.error(error);
                });
            }
        }, [response]);

    return (
        <View style={styles.container}>
            <View style = {styles.divider}>
                <Text style={styles.dividerText}>or</Text>
            </View>
            <View>
                <TouchableOpacity disabled= {!request} onPress={() => promptAsync()} style={styles.button}>
                    <GoogleLogo />
                    <Text style={styles.buttonText}>Sign in with Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
    },
    divider: {
        position: 'relative',
        width: '96%',
        height: 1,
        backgroundColor: theme.colors.text,
        marginVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dividerText: {
        position: 'absolute',
        backgroundColor: theme.colors.tint,
        color: theme.colors.text,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    buttonsContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 12,
    },
    button: {
        flexDirection: 'row',
        borderColor: theme.colors.google,
        backgroundColor: theme.colors.surface,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 6,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 8,
    },
    buttonText: {
        paddingLeft: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
        fontSize: 15,
    },
})