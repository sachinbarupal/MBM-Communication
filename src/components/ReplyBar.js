import {Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';

export default function ReplyBar({replyMsg, setReplyMsg}) {
  return (
    <View
      style={{
        height: 50,
        flexDirection: 'row',
        backgroundColor: 'white',
        zIndex: 10000,
      }}>
      <View style={{height: 50, width: 5, backgroundColor: 'red'}}></View>
      <View style={{flexDirection: 'column'}}>
        <Text style={{color: 'red', paddingLeft: 10, paddingTop: 5}}>
          {replyMsg.user.name}
        </Text>
        <Text style={{color: 'gray', paddingLeft: 10, paddingTop: 5}}>
          {replyMsg.text}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingRight: 10,
        }}>
        <TouchableOpacity onPress={() => setReplyMsg(null)}>
          <Icon name="close" color="#0084ff" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
