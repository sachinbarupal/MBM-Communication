import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../theme/colors';
import {ChatListData as allChats} from '../data/ChatsData';

const SearchBar = ({setChats}) => {
  const [clicked, setClicked] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  function handleSearch(query) {
    setSearchInput(query);
    const hashtags = query.match(/#[a-z]+/gi)?.map(tag => tag.slice(1));

    let filtered = [];
    if (hashtags)
      filtered = allChats.filter(chat => {
        for (let i = 0; i < hashtags.length; ++i) {
          if (!chat.tags || !chat.tags.includes(hashtags[i])) return false;
        }
        return true;
      });
    else
      filtered = allChats.filter(chat =>
        chat.name.toLowerCase().includes(query.toLowerCase()),
      );
    setChats(filtered);
  }
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }>
        <Icon
          name="search"
          size={clicked ? 24 : 34}
          color={Colors.primaryColor}
          marginLeft={6}
          onPress={() => setClicked(true)}
        />
        {clicked && (
          <TextInput
            style={[styles.input, {borderRadius: 15}]}
            placeholder="Search"
            placeholderTextColor={Colors.primaryColor}
            value={searchInput}
            onChangeText={text => handleSearch(text)}
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
            // setSearchInput('');
            handleSearch('');
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
    // marginVertical: 10,
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
    fontSize: 16,
    width: 150,
    color: Colors.black,
    height: 40,
  },
});
