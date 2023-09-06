import React, { useEffect, useState } from 'react';
import Background from '../components/Background';
import { ActivityIndicator } from 'react-native';
import firebase from 'firebase/compat/app'

export default function AuthLoadingScreen({ navigation }) {
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged( async (user) => {
      console.log('Auth state changed');
      if (user) {
        console.log('user logged in');

        //User is logged in, check if user has a goal
        const doc = await firebase.firestore().collection('users').doc(user.uid).get();
        
        //If the user doc does exist 
        if (doc.exists) {
          const userData = doc.data()
          if (userData.hasOwnProperty('goal') && userData.goal !== null) {
              //If user doc has Goal
              navigation.reset({
                routes: [{ name: "HomeScreen" }],
              });
          } else {
              //Goal doesnt exists
              navigation.reset({
                routes: [{ name: "GoalScreen" }],
              });
          }
        } else {
          //Document doesnt exists
          navigation.reset({
            routes: [{ name: "StartScreen" }]
          });
        }
      } else {
        console.log('not logged in');
        //User is not logged in, navigate to StartScreen
        navigation.reset({
          routes: [{ name: "StartScreen" }]
        });
      }
    });
    // Return cleanup function
    return subscriber;
  },[]);

  return (
    <Background>
      <ActivityIndicator size="large"/>
    </Background>
  );
}




  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       // User is logged in
  //       navigation.reset({
  //         routes: [{ name: "HomeScreen" }],
  //       });
  //     } else {
  //       // User is not logged in
  //       navigation.reset({
  //         routes: [{ name: "StartScreen" }],
  //       });
  //     }
  //   });
  
  //   return (
  //     <Background>
  //       <ActivityIndicator size="large" />
  //     </Background>
  //   );
  // }