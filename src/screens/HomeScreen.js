import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Colors} from '../theme/colors';
import {ChatListData} from '../data/ChatsData';
import ChatCard from '../components/ChatCard';
import {ActivityIndicator} from 'react-native-paper';
import SearchBar from '../components/SearchBar';
import Icon from 'react-native-vector-icons/MaterialIcons';

//HOME SCREEN
export default function HomeScreen({navigation}) {
  const [chats, setChats] = useState(null);
  const [loading, setLoading] = useState(false);

  const getChats = () => {
    setLoading(true);
    setChats(ChatListData);
    setLoading(false);
  };

  useLayoutEffect(() => {
    const setNavigationConfig = () => {
      const navigationOptions = () => {
        return {
          headerRight: () => (
            <View style={styles.headerRight}>
              <SearchBar setChats={setChats} />
              <Icon
                name="account-circle"
                size={34}
                style={{paddingRight: 0}}
                onPress={() => navigation.navigate('Profile Screen')}
                color={Colors.white}
              />
            </View>
          ),
        };
      };

      navigation.setOptions(navigationOptions());
    };

    setNavigationConfig();
  }, []);

  // USE EFFECT
  useEffect(() => {
    return getChats();
  }, []);

  if (loading)
    return (
      <View style={styles.loadingWrapper}>
        <ActivityIndicator size={'large'} />
      </View>
    );

  if (chats?.length == 0) {
    return <Text style={styles.emptyChat}>Please Subscribe to some Tags</Text>;
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={chats}
        renderItem={chat => (
          <ChatCard key={chat.id} chat={chat.item} navigation={navigation} />
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('New Message')}>
        <Image
          source={require('../assets/write.png')}
          style={{height: 30, width: 30, height: 50, width: 50}}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingVertical: 3,
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  loadingWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyChat: {color: 'red', flex: 1, textAlign: 'center', marginTop: '100%'},
  addButton: {
    height: 60,
    width: 60,
    // backgroundColor: '#ccc',
    // borderRadius: 50,
    // padding: 5,
    // marginTop: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: 'lightblue',
    // padding: 5,
    position: 'absolute',
    bottom: 10, // Adjust the bottom value as needed
    right: 10, //
  },
});
