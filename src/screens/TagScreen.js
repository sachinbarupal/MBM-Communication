import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import logo from '../assets/MBM_Logo.png';
import {ChatListData as Chats} from '../data/ChatsData';
export default function TagScreen({route, navigation}) {
  const {tag} = route.params;
  const goToChat = item => navigation.navigate('InsideChat', {chat: item});

  return (
    <View style={{flex: 1}}>
      <View style={{marginLeft: 10, marginTop: 10}}>
        <Text style={{fontStyle: 'italic', fontWeight: 'bold', color: 'black'}}>
          Hii! Here You can directly access chats associated with their tag
        </Text>
        <View style={styles.tag}>
          <Text style={{color: 'black'}}>#{tag}</Text>
        </View>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          // style={{flex: 1}}
          horizontal={true}
          data={Chats}
          contentContainerStyle={styles.container}
          renderItem={({item}) => {
            const {id, tags, name, profile} = item;
            if (tags && tags.includes(tag)) {
              return (
                <View style={{marginRight: 5, marginBottom: 3}}>
                  <TouchableOpacity key={id} onPress={() => goToChat(item)}>
                    <Image source={profile} style={styles.userImage} />
                  </TouchableOpacity>
                  <Text style={styles.nameText}>{name}</Text>
                </View>
              );
            }
          }}
        />
      </View>

      <View style={styles.logo}>
        <Image source={logo} style={{height: 300, width: 300}}></Image>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    justifyContent: 'center',
    // alignContent: 'center',
    alignItems: 'center',
    // marginTop: 10,
    flex: 1,
    // height: 'auto',
    // marginRight: 10,
    // borderRadius: 100,
    // marginLeft: 10,
    backgroundColor: '#3a4d7f',
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontWeight: 'bold',
    marginLeft: 30,
    color: 'black',
    marginTop: 10,
  },
  listContainer: {
    marginTop: 50,
    marginBottom: 50,
  },
  tag: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    borderRadius: 100,
    borderWidth: 1,
    marginRight: 10,
  },
});
