import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';

export default function Tags({tags, setTags}) {
  return (
    <TextInput
      multiline
      label="Tags"
      contentStyle={{
        backgroundColor: 'lightgrey',
      }}
      underlineStyle={{width: 0}}
      value={tags}
      textColor="blue"
      onChangeText={text => setTags(text)}
    />
  );
}
