import React from 'react';
import Background from '../components/Background';
import Header from '../components/Header'
import Button from '../components/Button';
import { logoutUser } from '../api/auth_api';
import BackButton from '../components/BackButton';

export default function SettingsScreen( {navigation} ){
    return(
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Header>Settings</Header>
        </Background>
    )
}