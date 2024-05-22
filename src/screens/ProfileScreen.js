import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {Colors} from '../theme/colors';
import {AuthContext} from '../context/AuthContext';

export default function ProfileScreen() {
  const {user, logout} = useContext(AuthContext);
  let x = Math.floor(Math.random() * 50);
  console.log(x);
  return (
    <View style={styles.wrapper}>
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: `https://xsgames.co/randomusers/assets/avatars/pixel/${x}.jpg`,
          }}
          style={styles.profilePic}
        />

        <View style={styles.detailContainer}>
          <View style={styles.detailBox}>
            <Text style={styles.detailTag}>User Name</Text>
            <Text style={styles.detail}>user.name</Text>
          </View>

          <View style={styles.detailBox}>
            <Text style={styles.detailTag}>Roll No.</Text>
            <Text style={styles.detail}>user.rollNo</Text>
          </View>

          <View style={styles.detailBox}>
            <Text style={styles.detailTag}>Branch</Text>
            <Text style={styles.detail}>user.branch</Text>
          </View>

          <View style={styles.detailBox}>
            <Text style={styles.detailTag}>Year</Text>
            <Text style={styles.detail}>user.year</Text>
          </View>

          <View style={styles.detailBox}>
            <Text style={styles.detailTag}>Date of Birth</Text>
            {/* {user.name ? ( */}
            <Text style={styles.detail}>user.DoB</Text>
            {/* ) : (
              <TouchableOpacity>
                <Text style={[styles.detail, {color: 'red'}]}>
                  {'Enter DOB'}
                </Text>
              </TouchableOpacity>
            )} */}
          </View>
        </View>

        {/* LOG OUT BUTTON */}
        <TouchableOpacity onPress={logout} style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.dashLine}>----------------</Text>
      <Text style={styles.text}>MBM Communication</Text>
      <Text style={styles.dashLine}>----------------</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    paddingVertical: 8,
    paddingHorizontal: 12,
    position: 'absolute',
    bottom: 40,
    borderRadius: 10,
  },
  appButtonText: {
    fontSize: 28,
    color: 'white',
  },
  detailContainer: {
    gap: 25,
    flexDirection: 'column',
    alignItems: 'center',
    width: '85%',
  },
  detailBox: {
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 8,
    width: '95%',
    marginRight: 'auto',
    marginLeft: 'auto',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
  },
  detailTag: {
    color: Colors.black,
    fontSize: 20,
  },
  detail: {
    color: Colors.black,
    fontSize: 20,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
  },
  profileContainer: {
    width: '90%',
    height: '80%',
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: Colors.white,
    borderRadius: 12,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 0.5,
    elevation: 10,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 100,
    top: -50,
    borderWidth: 2,
    borderColor: 'green',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dashLine: {color: 'black', textAlign: 'center'},
});
