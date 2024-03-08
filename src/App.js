import {StatusBar} from 'react-native';
import {Colors} from './theme/colors';
import SignInScreen from './screens/SignInScreen';
import {DefaultTheme, PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useState} from 'react';
import HomeScreen from './screens/HomeScreen';
import TagScreen from './screens/TagScreen';
import ChatScreen from './screens/ChatScreen';
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
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="SignInScreen" options={{headerShown: false}}>
            {props => <SignInScreen {...props} setUser={setUser} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Chats"
              options={{
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTintColor: Colors.primaryColor,
              }}>
              {props => <HomeScreen {...props} user={user} />}
            </Stack.Screen>

            <Stack.Screen
              name="InsideChat"
              options={({route}) => ({
                title: route.params.chat.name,
                headerTintColor: Colors.lb,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              })}>
              {props => <ChatScreen {...props} user={user} />}
            </Stack.Screen>

            <Stack.Screen name="Tag Screen" component={TagScreen} />
            <Stack.Screen name="Profile Screen">
              {props => (
                <ProfileScreen {...props} user={user} setUser={setUser} />
              )}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={Colors.primaryColor}
      />
      <Navigation />
    </PaperProvider>
  );
}
