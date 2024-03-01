import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../theme/colors';

const SearchBar = () => {
  const [clicked, setClicked] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }>
        <Icon
          name="search"
          size={clicked ? 30 : 34}
          color={Colors.primaryColor}
          marginLeft={10}
          onPress={() => setClicked(true)}
        />
        {clicked && (
          <TextInput
            style={[styles.input, {borderRadius: 15}]}
            placeholder="Search"
            placeholderTextColor={Colors.primaryColor}
            autoFocus
            value={searchInput}
            onChangeText={setSearchInput}
            onFocus={() => setClicked(true)}
          />
        )}
      </View>
      {clicked && (
        <Entypo
          name="cross"
          size={34}
          color="black"
          style={{marginLeft: 5, marginRight: 4}}
          onPress={() => {
            Keyboard.dismiss();
            setClicked(false);
          }}
        />
      )}
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    padding: 0,
    marginVertical: 10,
    gap: 0,
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
  },
  searchBar__unclicked: {
    alignItems: 'center',
    marginRight: 10,
  },
  searchBar__clicked: {
    borderRadius: 15,
    flexDirection: 'row',
    backgroundColor: '#d9dbda',
    alignItems: 'center',
    width: 200,
  },
  input: {
    fontSize: 20,
    width: 150,
    color: Colors.black,
  },
});
