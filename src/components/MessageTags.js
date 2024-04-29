import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-paper';
import Toast from 'react-native-toast-message';

export default function Tags({tags, setAddTag, setRemoveTag}) {
  // SHOW ALL CURRENT APPLIED TAGS BELOW MSG INPUT
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
      />

      {/* ADD and Remove Tag Icons */}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'lightgrey',
          // alignItems: 'flex-end',
          // alignItems: 'center',
        }}>
        {/* ADD TAG ICON */}
        <TouchableOpacity
          onPress={() => setAddTag(true)}
          style={{marginTop: 10}}>
          <Image
            source={require('../assets/plus.png')}
            style={{width: 35, height: 35}}
          />
        </TouchableOpacity>

        {/* REMOVE TAG ICON */}
        <TouchableOpacity
          onPress={() => {
            // If no Tag is applied
            if (tags.length == 0) {
              Toast.show({
                type: 'error',
                text1: 'No Tags Applied',
                visibilityTime: 700,
                position: 'bottom',
                onPress: () => Toast.hide(),
              });
              return;
            }

            // Show Remove Tag Window
            setRemoveTag(true);
          }}
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
