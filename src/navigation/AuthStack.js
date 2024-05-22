import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from '../screens/SignInScreen';
import {Colors} from '../theme/colors';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      statusBarColor: Colors.status,
      statusBarStyle: 'light-content',
    }}>
    <Stack.Screen name="SignInScreen" component={SignInScreen} />
  </Stack.Navigator>
);

export default AuthStack;
