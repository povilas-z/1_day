import React, { useState, useEffect } from 'react';
import Background from '../components/Background';
import Header from '../components/Header'
import Logo from '../components/Logo';
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'


export default function TaskScreen() {
    const [userTask, setTask] = useState('');
    const user = firebase.auth().currentUser;

    useEffect(() => {
        const fetchData = async () => {
            const db = firebase.firestore();
            const doc = await db.collection('users').doc(user.uid).get();
            if (doc.exists) {
                const currentTaskIndex = doc.data().currentTaskIndex;
                setTask(doc.data().tasks[currentTaskIndex]);
            }
        }
        fetchData();
    }, []);
    
    return(
        <Background>
            <Logo />
            <Header>Your Daily Task is: {userTask}</Header>
        </Background>
    )
}