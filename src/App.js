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
import Toast from 'react-native-toast-message';
import {EventProvider} from 'react-native-outside-press';
import {AuthProvider} from './context/AuthContext';
import AppNav from './navigation/AppNav';
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
  const [user, setUser] = useState('Sachin');

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen
            name="SignInScreen"
            options={{
              headerShown: false,
              statusBarColor: Colors.status,
              statusBarStyle: 'light-content',
            }}>
            {props => <SignInScreen {...props} setUser={setUser} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen
              name="Chats"
              options={{
                statusBarColor: Colors.status,
                statusBarStyle: 'light-content',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerTintColor: Colors.white,
                headerStyle: {
                  backgroundColor: Colors.status,
                },
              }}>
              {props => <HomeScreen {...props} user={user} />}
            </Stack.Screen>

            {/* CHAT SCREEN */}
            <Stack.Screen
              name="InsideChat"
              options={({route}) => ({
                statusBarColor: Colors.status,
                statusBarStyle: 'light-content',
                title: route.params.chat.name,
                headerTintColor: Colors.white,
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
                headerStyle: {
                  backgroundColor: Colors.status,
                },
              })}>
              {props => <ChatScreen {...props} user={user} />}
            </Stack.Screen>

            {/* TAG SCREEN */}
            <Stack.Screen
              options={{
                statusBarColor: Colors.status,
                statusBarStyle: 'light-content',
                headerTintColor: Colors.white,
                headerStyle: {
                  backgroundColor: Colors.status,
                },
              }}
              name="Tag Screen"
              component={TagScreen}
            />

            {/* PROFILE SCREEN */}
            <Stack.Screen
              options={{
                statusBarColor: Colors.status,
                statusBarStyle: 'light-content',
                headerTintColor: Colors.white,
                headerStyle: {
                  backgroundColor: Colors.status,
                },
                title: 'User Profile',
              }}
              name="Profile Screen">
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

// export default function App() {
//   return (
//     <>
//       <StatusBar backgroundColor={Colors.status} barStyle="light-content" />
//       <PaperProvider theme={theme}>
//         <EventProvider>
//           <Navigation />
//           <Toast />
//         </EventProvider>
//       </PaperProvider>
//     </>
//   );
// }
export default function App() {
  return (
    <AuthProvider>
      <StatusBar backgroundColor={Colors.status} barStyle="light-content" />
      <PaperProvider theme={theme}>
        <EventProvider>
          {/* <Navigation /> */}
          <AppNav />
          <Toast />
        </EventProvider>
      </PaperProvider>
    </AuthProvider>
  );
}
