import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {allTags} from '../data/AllTags';

export default function AddTag({
  setAddTag,
  setTags,
  setCurrentTags,
  currentTags,
}) {
  const [searchTag, setSearchTag] = useState('#');
  const [suggestion, setSuggestion] = useState([]);

  // console.log('cc', currentTags);
  function searchSuggestion(text) {
    if (text.length == 1) {
      setSuggestion([]);
      return;
    }
    // console.log('here ', currentTags);
    filtered = allTags.filter(item => {
      // console.log('item');
      return (
        item.name.toLowerCase().startsWith(text.substring(1).toLowerCase()) &&
        !currentTags.includes(item.name)
      );
    });
    setSuggestion(filtered);
    // console.log('filt', filtered);
  }

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        zIndex: 100,
        // backgroundColor: 'transparent',
        // backfaceVisibility: 'hidden',
        // backgroundColor: 'rgba(0,0,0,0.1)',
        // filter: 'blur(10)',
        display: 'flex',
        justifyContent: 'flex-end',
        // alignItems: 'center',
      }}>
      <Entypo
        name="cross"
        size={40}
        color="black"
        onPress={() => setAddTag(false)}
        style={{alignSelf: 'flex-end'}}
      />

      <View>
        <FlatList
          scrollEnabled
          keyboardShouldPersistTaps="always" //open keyboard
          keyboardDismisssMode="on-drag"
          persistentScrollbar
          style={{maxHeight: 125}}
          data={suggestion}
          extraData={suggestion}
          renderItem={tag => {
            return (
              <TouchableOpacity
                key={tag.item.id}
                onPress={() => {
                  setTags(tags => tags + ' #' + tag.item.name);
                  setCurrentTags(currentTags => {
                    // console.log('curr', currentTags);
                    currentTags.push(tag.item.name);
                    return currentTags;
                  });

                  setSuggestion(prev => {
                    // console.log('previous', prev);
                    // console.log('filterr', tag.item.name);
                    // console.log(
                    //   'after',
                    // prev.filter(item => item.name !== tag.item.name),
                    // );
                    return [
                      ...prev.filter(item => item.name !== tag.item.name),
                    ];
                  });

                  // searchSuggestion(searchTag);
                  // setSearchTag('#');
                }}>
                <Text
                  style={{
                    color: 'black',
                    // textAlign: 'center',
                    paddingLeft: 20,
                    paddingVertical: 10,
                    backgroundColor: 'lightgrey',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '100%',
                    // borderRadius: 5,
                    borderBottomWidth: 1,
                  }}>
                  {tag.item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
        <TextInput
          value={searchTag}
          autoFocus
          onChangeText={text => {
            if (text.length == 0) return;
            setSearchTag(text);
            searchSuggestion(text);
          }}
          style={{
            zIndex: 200,
            width: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
      </View>
    </View>
  );
}
