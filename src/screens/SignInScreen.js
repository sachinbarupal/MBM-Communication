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
          <Text
            style={[
              styles.text,
              {color: 'orange', fontSize: 36, fontWeight: 500},
            ]}>
            MBM Communication
          </Text>
          <Image
            style={styles.logo}
            source={require('../assets/MBM_Logo.png')}
          />
        </View>
        {!login ? (
          <View>
            <TextInput
              value={mobileNumber}
              placeholder="Enter Mobile No."
              // keyboardType="numeric"
              // label="Mobile No."
              onChangeText={text => setMobileNumber(text)}
              mode="outlined"
              style={[styles.inputBG, {marginBottom: 20}]}
            />
            <TextInput
              mode="outlined"
              value={password}
              placeholder="Enter Password"
              // label="Password"
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
            labelStyle={{color: 'black', fontSize: 14}}
            disabled={!mobileNumber || !password}
            style={styles.loginBtn}
            mode="contained"
            // onPress={() => setLogin(true)}>
            onPress={() => {
              Keyboard.dismiss();
              setTimeout(() => setUser('Sachin'), 1000);
            }}>
            Login
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
            Login
          </Button>
        )}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.status,
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
    color: Colors.white,
  },
  inputBG: {
    backgroundColor: Colors.white,
  },
  loginBtn: {
    marginTop: 50,
    marginHorizontal: 50,
    backgroundColor: Colors.foreground,
    // color: 'black',
  },
});
