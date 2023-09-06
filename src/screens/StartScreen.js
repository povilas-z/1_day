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
            <Header style={{fontSize: 30, fontWeight: 'bold', letterSpacing: -0.3, marginTop: 20,marginBottom:8,}}>Welcome to oneDay!</Header>
            <Paragraph> 
                oneDay is your personal assistant, helping guide you to achieve your dreams
            </Paragraph>
            <Button 
            onPress= {() => {
                navigation.navigate('LoginScreen')
            }}
            mode="outlined"
            >
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