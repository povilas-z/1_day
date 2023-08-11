import React, { useState } from 'react';
import Background from '../components/Background';
import Header from '../components/Header'
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import TextInput from '../components/TextInput';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { updateGoal } from '../api/auth_api';
import { goalValidator } from '../helpers/goalValidator';
import { generateTasks } from '../api/openai_api';




export default function GoalScreen({ navigation }){
    const [goal, setGoal] = useState({ value: '', error: ''})
    const [loading, setLoading] = useState(false)
    const user = firebase.auth().currentUser

    const onGoalPress = async () => {
        const goalError = goalValidator(goal.value);
        const tasks = await generateTasks(goal.value);
        if (tasks.error) {
            console.error(tasks.error)
            return;
        }

        if (goalError) {
            setGoal({...goal, error: goalError})
        }
        setLoading(true)

        const response = await updateGoal ({
            userId: user.uid,
            goal: goal.value,
            tasks: tasks,
        })
        if (response.error){
            alert(response.error);
        } else {
            navigation.replace("HomeScreen")
        }
        setLoading(false)   
    }
    return(
        <Background>
            <BackButton goBack={navigation.goBack} />
            <Header>What is a goal of yours that you would like help with?</Header>
            <TextInput 
                label='I want to become a great cubist painter'
                value={goal.value}
                onChangeText={(text) => setGoal({ value: text, error: ''})}
                error={goal.error}
                errorText={goal.error}
            />
            <Button loading={loading} mode="contained" onPress={onGoalPress}>
                Set Goal
            </Button>
        </Background>
    );
}