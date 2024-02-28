import {StatusBar, StyleSheet, View} from 'react-native';
import {Colors} from './theme/colors';
import SignInScreen from './screens/SignInScreen';
import * as React from 'react';
import {DefaultTheme, PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from './screens/ProfileScreen';
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primaryColor,
    secondary: Colors.secondaryColor,
  },
};

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignInScreen"
          options={{headerShown: false}}
          component={SignInScreen}
        />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <PaperProvider theme={theme}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.primaryColor}
        />
        {/* <View style={styles.container}> */}
        <Navigation />
        {/* <SignInScreen /> */}
        {/* </View> */}
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  // container: {
  // flex: 1,
  // justifyContent: 'center',
  // alignItems: 'center',
  // backgroundColor: Colors.foreground,
  // },
  // container
});
