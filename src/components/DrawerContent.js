import React, { useState, useEffect } from 'react';
import  { View, StyleSheet } from 'react-native';
import { DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch,
} from 'react-native-paper';
import { ProfileIcon, SettingsIcon } from '../../assets/icons'
import Button from '../components/Button';
import { logoutUser } from '../api/auth_api';
import RandomColorAvatar from './AvatarGradient';
import { theme } from '../core/theme';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';




export default function DrawerContent({ navigation }) {
    const [name, setName] = useState('');
    const [username, setUserName] = useState('');

    useEffect(() => {
        const user = firebase.auth().currentUser;
        if(user) {
            const docRef = firebase.firestore().collection('users').doc(user.uid);
            docRef.get().then((doc) => {
                if(doc.exists) {
                    setName(doc.data().name); // assuming your Firestore doc has a field 'name' for the user's name.
                    setUserName(doc.data().username); // assuming your Firestore doc has a field 'username' for the user's username.
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }
    }, []);
    return (
        <DrawerContentScrollView>
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <RandomColorAvatar />
                    <Title style={styles.title}>{name}</Title>
                    <View style={styles.row}>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                99
                            </Paragraph>
                            <Caption style={styles.caption}> Connections</Caption>
                        </View>
                    </View>
                </View>
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem onPress={() => navigation.navigate('SettingsScreen')}
                        label="Settings"
                        labelStyle={{color:"#E3E3E3"}}
                        icon={({color}) => <SettingsIcon fill={color} />}
                    />
                    <DrawerItem onPress={() => navigation.navigate('ProfileScreen')}
                        label="Profile"
                        labelStyle={{color:"#E3E3E3"}}
                        icon={({color}) => <ProfileIcon fill={color} />}
                    />
                </Drawer.Section >
                <Drawer.Section title={<Text style={{color: 'white', fontWeight: 'bold'}}>Preferences</Text>} showDivider={false}>
                    <TouchableRipple onPress= {() => {}}>
                        <View style={styles.preference}>
                            <Text style={{color: '#E3E3E3'}}>Notifications</Text>
                            <View pointerEvents='none'>
                                <Switch value={false} />
                            </View>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress= {() => {}}>
                        <View style={[styles.preference, { justifyContent: 'space-between' }]}>
                            <Text style={{color:"#E3E3E3"}}>Dark Mode</Text>
                            <View pointerEvents='none'>
                                <Switch value={false} />
                            </View>
                        </View>
                    </TouchableRipple> 
                </Drawer.Section>
                <Drawer.Section showDivider={false} style={{marginTop: 300, paddingLeft: 28,  }}>
                    <Button
                    style={{width: '90%', backgroundColor: 'white',}}
                    labelStyle={{ color: 'black'}}
                    onPress={() => {
                    logoutUser();
                    }}
                    mode="contained">
                    Logout
                    </Button>
                </Drawer.Section>
            </View>
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontWeight: 'bold',
        marginTop: 20,
        color: 'white',
        marginBottom: -15,
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: '#E3E3E3'
    },
    row: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
    },
    section: {
        marginRight: 15,
        alignItems: 'center',
        flexDirection: 'row',
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
        paddingBottom: -15,
    },
    preference: {
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 14,
        paddingHorizontal: 14,
    },
});


