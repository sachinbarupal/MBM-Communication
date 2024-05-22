import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TagScreen from '../screens/TagScreen';
import {Colors} from '../theme/colors';
import NewMessage from '../screens/NewMessage';
const Stack = createNativeStackNavigator();
const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      statusBarColor: Colors.status,
      statusBarStyle: 'light-content',
      headerTintColor: Colors.white,
      headerStyle: {
        backgroundColor: Colors.status,
      },
      headerTitleStyle: {fontWeight: 'bold'},
    }}>
    {/* HOME SCREEN */}
    <Stack.Screen name="Chats" component={HomeScreen} />

    {/* New Message SCREEN */}
    <Stack.Screen name="New Message" component={NewMessage} />
    {/* CHAT SCREEN */}
    <Stack.Screen name="InsideChat" component={ChatScreen} />

    {/* TAG SCREEN */}
    <Stack.Screen name="Tag Screen" component={TagScreen} />

    {/* PROFILE SCREEN */}
    <Stack.Screen
      name="Profile Screen"
      options={{title: 'User Profile'}}
      component={ProfileScreen}
    />
  </Stack.Navigator>
);
export default AppStack;
