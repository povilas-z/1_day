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
import { theme } from '../core/theme';
import { sendEmailWithPassword } from '../api/auth_api';


export default function ResetPasswordScreen({ navigation }){
    const [email, setEmail] = useState({ value: '', error: ''})
    const [loading, setLoading] = useState()

    const onSubmitPress = async () => {
        const emailError = emailValidator(email.value);
        if (emailError){
            setEmail({...email, error: emailError})
        }
        setLoading(true)
        const response = await sendEmailWithPassword(email.value)
        if (response.error){
            alert(response.error)
        } else {
            alert('Email with password has been sent.')
        }
        setLoading(false)
    }

    return(
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Logo />
            <Header>Restore Password</Header>
            <TextInput 
                value={email.value}
                error={email.error}
                errorText={email.error}
                onChangeText={(text) => setEmail({value: text, error: ''})} 
                label="Email"
                description="You will receive an email with a password reset link."
            />
            <Button loading={loading} mode="contained" onPress={onSubmitPress}>
                Send Instructions
            </Button>
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
    }
})