import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';

export default function ReplyBar({replyMsg, setReplyMsg}) {
  return (
    <View style={styles.replyContainer}>
      <View style={styles.redLine}></View>

      <View style={{flexDirection: 'column'}}>
        <Text style={styles.replyTo}>{replyMsg.user.name}</Text>

        <Text style={styles.replyText}>{replyMsg.text}</Text>
      </View>

      <View style={styles.closeBtn}>
        <TouchableOpacity onPress={() => setReplyMsg(null)}>
          <Icon name="close" color="#0084ff" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  replyContainer: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'white',
    zIndex: 10000,
  },
  closeBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  redLine: {height: 50, width: 5, backgroundColor: 'red'},
  replyTo: {color: 'red', paddingLeft: 10, paddingTop: 5},
  replyText: {color: 'gray', paddingLeft: 10, paddingTop: 5},
});
