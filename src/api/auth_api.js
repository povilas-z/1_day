    import firebase from 'firebase/compat/app'
    import 'firebase/compat/auth'
    import 'firebase/compat/firestore';
    import randomColor from 'randomcolor';

    export async function signUpUser({name, email, password}){
        try {
            const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password);
            await firebase.auth().currentUser.updateProfile({
                displayName: name,
            });
    
            // Create a reference to Firestore
            const db = firebase.firestore();
    
            // Write user's name and email into Firestore
            db.collection('users').doc(user.uid).set({
                name: name,
                email: email,
                goal: null,
                tasks: [],
                currentTaskIndex: 0,
                color1: randomColor({ format: 'hex' }), // you mentioned you're already storing colors
                color2: randomColor({ format: 'hex' }), // make sure to generate these colors
            }, { merge: true }); // merge:true allows you to update existing doc without removing other fields
    
            return { user };
        } catch (error) {
            return {
                error: error.message,
            };
        }
    }

    export async function loginUser({ email, password }){
        try{
            const { user } = await firebase
                .auth()
                .signInWithEmailAndPassword(email, password);
            return { user };
        } catch (error) {
            return {
                error: error.message,
            };
        }
    }

    export async function sendEmailWithPassword(email) {
        try{
            await firebase.auth().sendPasswordResetEmail(email);
            return{};
        } catch (error) {
            return {
                error: error.message,
            };
        }
    }

    export async function logoutUser(){
        try {
            console.log("Attempting to logout")
            await firebase.auth().signOut();
            return { success: true };
        } catch (error) {
            console.log("Error during logout", error.message)
            return {
                error: error.message,
            };
        }
    }

    export async function updateGoal({userId, goal, tasks}){
        try{
            const db = firebase.firestore();
            await db.collection('users').doc(userId).update({
                goal: goal,
                tasks: tasks,
                currentTaskIndex: 0,
            });
         return  { success: true };
        } catch (error) {
            return {
                error: error.message,
            };
        }
    }

    