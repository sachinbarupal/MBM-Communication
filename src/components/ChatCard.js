import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors} from '../theme/colors';

export default function ChatCard({chat, navigation}) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('InsideChat', {chat})}
      style={styles.card}>
      <View>
        <Image source={chat.profile} style={styles.chatImg} />
      </View>
      <View style={{flex: 1, justifyContent: 'space-around'}}>
        <Text style={styles.chatName}>{chat.name}</Text>
        <Text style={styles.chatMsg}>{chat.message}</Text>
      </View>
      <View style={styles.chatTags}>
        {chat.tags?.map((tag, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              navigation.navigate('Tag Screen', {
                tag,
              })
            }>
            <Text style={styles.chatTag}>#{tag} </Text>
          </TouchableOpacity>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: Colors.white,
    margin: 3,
    borderRadius: 8,
    borderBlockColor: 'grey',
    borderBottomWidth: 1,
  },
  chatImg: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 100,
  },
  chatName: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '600',
  },
  chatMsg: {
    color: Colors.black,
    marginTop: 4,
  },
  chatTags: {
    width: 150,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  chatTag: {
    color: 'blue',
  },
});
