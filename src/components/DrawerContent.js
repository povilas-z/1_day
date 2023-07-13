import React from 'react';
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




export default function DrawerContent({ navigation }) {
    return (
        <DrawerContentScrollView>
            <View style={styles.drawerContent}>
                <View style={styles.userInfoSection}>
                    <RandomColorAvatar />
                    <Title style={styles.title}>Povilas Zinkevicius</Title>
                    <Caption style={styles.caption}>@agentpov</Caption>
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
                        icon={({color}) => <SettingsIcon fill={color} />}
                    />
                    <DrawerItem onPress={() => navigation.navigate('ProfileScreen')}
                        label="Profile"
                        icon={({color}) => <ProfileIcon fill={color} />}
                    />
                </Drawer.Section >
                <Drawer.Section title="Preferences" showDivider={false}>
                    <TouchableRipple onPress= {() => {}}>
                        <View style={styles.preference}>
                            <Text fontSize>Notifications</Text>
                            <View pointerEvents='none'>
                                <Switch value={false} />
                            </View>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress= {() => {}}>
                        <View style={[styles.preference, { justifyContent: 'space-between' }]}>
                            <Text>Dark Mode</Text>
                            <View pointerEvents='none'>
                                <Switch value={false} />
                            </View>
                        </View>
                    </TouchableRipple> 
                </Drawer.Section>
                <Drawer.Section showDivider={false} style={{marginTop: 300, paddingLeft: 28,  }}>
                    <Button
                    style={{width: '50%',}}
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
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
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


