import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from "react-native-paper";
import { theme } from './src/core/theme';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StartScreen, LoginScreen, RegisterScreen, ResetPasswordScreen, HomeScreen, AuthLoadingScreen, ProfileScreen, TaskScreen, SettingsScreen} from './src/screens';
import { firebaseConfig } from './src/core/config';
import firebase from 'firebase/compat/app';
import { HomeIcon, TaskIcon } from './assets/icons';
import DrawerContent from './src/components/DrawerContent';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider theme ={theme}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='AuthLoadingScreen'
          screenOptions={{headerShown: false}}
        > 
          <Stack.Screen name = "AuthLoadingScreen" component={AuthLoadingScreen} />
          <Stack.Screen name = "HomeScreen" component={DrawerNavigator} />
          <Stack.Screen name = "StartScreen" component={StartScreen} />
          <Stack.Screen name = "LoginScreen" component={LoginScreen} />
          <Stack.Screen name = "RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name = "ResetPasswordScreen" component={ResetPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function BottomNavigator() {
  return(
    <Tab.Navigator 
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: theme.colors.primary,
      tabBarInactiveTintColor: 'gray',
    }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color }) => <HomeIcon fill={color} />,
        }}
      />
      <Tab.Screen 
        name="Task" 
        component={TaskScreen} 
        options={{
          tabBarIcon: ({ color }) => <TaskIcon fill={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigator(){
  return (
    <Drawer.Navigator 
    drawerContent={DrawerContent}
    screenOptions={{
      headerShown: false,
    }}
    >
      <Drawer.Screen name="HomeScreen" component={BottomNavigator} />
      <Drawer.Screen name = "ProfileScreen" component={ProfileScreen} />
      <Drawer.Screen name = "SettingsScreen" component={SettingsScreen} />
    </Drawer.Navigator>
  )
}