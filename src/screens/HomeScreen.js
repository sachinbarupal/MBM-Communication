import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../theme/colors';
import {ChatListData} from '../data/ChatsData';
import ChatCard from '../components/ChatCard';
import {ActivityIndicator} from 'react-native-paper';
import SearchBar from '../components/SearchBar';
import Icon from 'react-native-vector-icons/MaterialIcons';

//HOME SCREEN
export default function HomeScreen({navigation, user}) {
  const [chats, setChats] = useState(null);
  const [loading, setLoading] = useState(false);

  const getChats = () => {
    setLoading(true);
    setChats(ChatListData);
    setLoading(false);
  };

  useEffect(() => {
    getChats();
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRight}>
          <SearchBar setChats={setChats} />
          <Icon
            name="account-circle"
            size={34}
            style={{paddingRight: 0}}
            onPress={() => navigation.navigate('Profile Screen')}
            color={Colors.secondaryColor}
          />
        </View>
      ),
    });
  }, []);

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.background,
        }}>
        <ActivityIndicator size={'large'} />
      </View>
    );

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={chats}
        renderItem={chat => {
          if (chat.item.name !== user) {
            return (
              <ChatCard
                key={chat.id}
                chat={chat.item}
                navigation={navigation}
              />
            );
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.background,
    flex: 1,
    paddingVertical: 3,
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 'auto',
  },
});
