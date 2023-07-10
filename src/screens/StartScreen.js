import React from 'react';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header'

export default function StartScreen({ navigation }){
    return(
        <Background>
            <Logo />
            <Header>Login Template</Header>
            <Paragraph> 
                The easiest way to start with your amazing app.
            </Paragraph>
            <Button 
            onPress= {() => {
                navigation.navigate('LoginScreen')
            }}
            mode="outlined">
                Login
            </Button>
            <Button 
            onPress= {() => {
                navigation.navigate('RegisterScreen')
            }}
            mode="contained">
                Sign Up
            </Button>
        </Background>
    )
}