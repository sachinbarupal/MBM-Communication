import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function ChatScreen({route}) {
  const chat = route.params.chat;
  //   console.log(chatName);
  return (
    <View>
      <Text>ChatScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
