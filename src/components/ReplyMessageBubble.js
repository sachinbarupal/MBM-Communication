import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function ReplyMessageBubble({props}) {
  return (
    props.currentMessage &&
    props.currentMessage.replyMessage && (
      <View style={styles.replyMessageContainer}>
        <Text style={{color: 'black'}}>
          {props.currentMessage.replyMessage.text}
        </Text>
        <View style={styles.replyMessageDivider} />
      </View>
    )
  );
}

const styles = StyleSheet.create({
  replyMessageContainer: {
    padding: 8,
    paddingBottom: 0,
  },
  replyMessageDivider: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingTop: 6,
  },
});
