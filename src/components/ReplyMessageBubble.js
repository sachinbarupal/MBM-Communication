import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function ReplyMessageBubble({props}) {
  return (
    props.currentMessage &&
    props.currentMessage.replyMessage && (
      <View style={styles.replyMessageContainer}>
        <Text style={{color: 'black'}}>
          {props.currentMessage.replyMessage.text}
        </Text>
        <View style={styles.replyMessageDivider} />
        {/* <FontAwesome
          name="heart"
          size={32}
          color="red"
          // style={{position: 'absolute'}}
        /> */}
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
