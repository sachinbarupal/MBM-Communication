import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../theme/colors';
import {TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';

//Sign In Screen
export default function SignInScreen({setUser}) {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [profileName, setProfileName] = useState('');
  const [login, setLogin] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => setLogin(false)}
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
          }}>
          {login && <Icon name="back" color={Colors.black} size={38} />}
        </TouchableOpacity>
        <View>
          <Text style={styles.text}>Welcome To </Text>
          <Text style={styles.text}>MBM Communication</Text>
          <Image
            style={styles.logo}
            source={require('../assets/MBM_Logo.png')}
          />
        </View>
        {!login ? (
          <View>
            <TextInput
              value={mobileNumber}
              placeholder="123456789"
              keyboardType="numeric"
              label="Mobile No."
              onChangeText={text => setMobileNumber(text)}
              mode="outlined"
              style={styles.inputBG}
            />
            <TextInput
              mode="outlined"
              value={password}
              placeholder="***"
              label="Password"
              onChangeText={text => setPassword(text)}
              style={styles.inputBG}
              secureTextEntry
            />
          </View>
        ) : (
          <View>
            <Text
              style={[
                {color: Colors.primaryColor},
                {fontSize: 20},
                {textAlign: 'left'},
                {marginBottom: 5},
                {paddingLeft: 3},
              ]}>
              Set Profile Name
            </Text>
            <TextInput
              value={profileName}
              placeholder="Profile Name"
              onChangeText={text => setProfileName(text)}
              style={[styles.inputBG, {height: 40}]}
            />
          </View>
        )}
        {!login ? (
          <Button
            disabled={!mobileNumber || !password}
            style={styles.loginBtn}
            mode="contained"
            onPress={() => setLogin(true)}>
            Next
          </Button>
        ) : (
          <Button
            disabled={!profileName}
            style={styles.loginBtn}
            mode="contained"
            onPress={() => {
              Keyboard.dismiss();
              setTimeout(() => setUser(profileName), 500);
            }}>
            login
          </Button>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.foreground,
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    marginVertical: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 150,
    height: 150,
  },
  text: {
    textAlign: 'center',
    fontSize: 32,
    color: Colors.primaryColor,
  },
  inputBG: {
    backgroundColor: Colors.background,
  },
  loginBtn: {
    marginTop: 20,
    marginHorizontal: 50,
  },
});
