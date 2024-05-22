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
import React, {useContext, useState} from 'react';
import {Colors} from '../theme/colors';
import {TextInput, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {AuthContext} from '../context/AuthContext';

//Sign In Screen
// export default function SignInScreen({setUser}) {
export default function SignInScreen() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  // const [profileName, setProfileName] = useState('');
  // const [login, setLogin] = useState(false);
  const {login} = useContext(AuthContext);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView style={styles.wrapper}>
        {/* <TouchableOpacity
          onPress={() => setLogin(false)}
          style={styles.backIcon}>
          {login && <Icon name="back" color={Colors.black} size={38} />}
        </TouchableOpacity> */}

        <View>
          <Text style={styles.text}>Welcome To </Text>
          <Text style={styles.heading}>MBM Communication</Text>
          <Image
            style={styles.logo}
            source={require('../assets/MBM_Logo.png')}
          />
        </View>
        {/* {!login ? ( */}
        <View>
          {/* MOBILE NUMBER INPUT */}
          <TextInput
            value={mobileNumber}
            placeholder="Enter Mobile No."
            onChangeText={text => setMobileNumber(text)}
            mode="outlined"
            style={[styles.inputBG, {marginBottom: 20}]}
          />
          {/* PASSWORD INPUT */}
          <TextInput
            mode="outlined"
            value={password}
            placeholder="Enter Password"
            onChangeText={text => setPassword(text)}
            style={styles.inputBG}
            secureTextEntry
          />
        </View>
        {/* ) : (
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
        )} */}
        {/* {!login ? ( */}
        <Button
          labelStyle={{color: 'black', fontSize: 14}}
          // disabled={!mobileNumber || !password}
          style={styles.loginBtn}
          mode="contained"
          onPress={() => {
            Keyboard.dismiss();
            setTimeout(() => login(), 100);
          }}>
          Login
        </Button>
        {/* ) : (
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
        )} */}
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
  heading: {
    textAlign: 'center',
    color: 'orange',
    fontSize: 36,
    fontWeight: '500',
  },
  inputBG: {
    backgroundColor: Colors.white,
  },
  loginBtn: {
    marginTop: 50,
    marginHorizontal: 50,
    backgroundColor: Colors.foreground,
  },
  backIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
