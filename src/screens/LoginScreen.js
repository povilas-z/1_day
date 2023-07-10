import React, { useState } from 'react';
import  { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header'
import TextInput from '../components/TextInput';
import { emailValidator } from '../helpers/emailValidator';
import { passwordValidator } from '../helpers/passwordValidator';
import BackButton from '../components/BackButton';
import { theme } from '../../src/core/theme';
import { loginUser } from '../api/auth_api';
import HomeScreen from './HomeScreen';
import GoogleLogin from '../components/GoogleLogin';



export default function LoginScreen({ navigation }){
    const [email, setEmail] = useState({ value: '', error: ''})
    const [password, setPassword] = useState({ value: '', error: ''})
    const [loading, setLoading] = useState(false)

    const onLoginPress = async () => {
        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        if (emailError || passwordError){
            setEmail({...email, error: emailError})
            setPassword({...password, error:passwordError})
        }
        setLoading(true)
        const response = await loginUser({
            email: email.value,
            password: password.value,
        })
        if (response.error){
            alert(response.error)
        } else {
            navigation.replace('HomeScreen')
        }
        setLoading(false)
    }

    return(
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Welcome</Header>
            <TextInput 
            value={email.value}
            error={email.error}
            errorText={email.error}
            onChangeText={(text) => setEmail({value: text, error: ''})} 
            label="Email"
            />
            <TextInput
            value={password.value}
            error={password.error}
            errorText={password.error}
            onChangeText={(text) => setPassword({value: text, error: ''})}
            label="Password"
            secureTextEntry
            />
            <View style={styles.forgotPassword}>
                <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')}>
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <Button loading={loading} mode="contained" onPress={onLoginPress}>
                Login
            </Button>
            <View style={styles.row}>
                <Text>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
                    <Text style={styles.link}> Sign Up</Text>
                </TouchableOpacity>
            </View>
        </Background>
    )
}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24
        ,
    },
    forgot: {
        fontSize: 13,
        color: theme.colors.secondary,
    }
})