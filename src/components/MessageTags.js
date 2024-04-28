import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-paper';

export default function Tags({
  tags,
  setTags,
  showTag,
  setAddTag,
  setRemoveTag,
}) {
  return (
    <View style={{flexDirection: 'row'}}>
      <TextInput
        multiline
        disabled
        label="Tags"
        contentStyle={{
          backgroundColor: 'lightgrey',
        }}
        style={{width: '80%'}}
        underlineStyle={{width: 0}}
        value={tags}
        textColor="blue"
        // onChangeText={text => setTags(text)}
      />
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'lightgrey',
          // alignItems: 'flex-end',
          // alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => setAddTag(true)}
          style={{marginTop: 10}}>
          <Image
            source={require('../assets/plus.png')}
            style={{width: 35, height: 35}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setRemoveTag(true)}
          style={{
            marginLeft: 5,
            marginRight: 5,
            marginTop: 10,
          }}>
          <Image
            source={require('../assets/minus.png')}
            style={{width: 33, height: 33}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
