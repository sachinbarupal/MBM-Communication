import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {allTags} from '../data/AllTags';
import Toast from 'react-native-toast-message';

export default function AddTag({
  setAddTag,
  setTags,
  setCurrentTags,
  currentTags,
}) {
  const [searchTag, setSearchTag] = useState('#');
  const [suggestion, setSuggestion] = useState([]);

  // Set Suggestions
  function searchSuggestion(text) {
    // If input is only #
    if (text.length == 1) {
      setSuggestion([]);
      return;
    }

    // Search according to input and should not be already in currentTags
    suggested = allTags.filter(item => {
      return (
        item.name.toLowerCase().startsWith(text.substring(1).toLowerCase()) &&
        !currentTags.includes(item.name)
      );
    });

    // Set Sugggestions
    setSuggestion(suggested);
  }

  // ADD TAG
  function addTag(tag) {
    // Update Tags String
    setTags(tags => tags + ' #' + tag);

    // Update CurrentTags Array
    setCurrentTags(currentTags => {
      currentTags.push(tag);
      return currentTags;
    });

    // Update Suggestions
    setSuggestion(prev => {
      return [...prev.filter(item => item.name !== tag)];
    });

    // Show SuccessToast
    Toast.show({
      text1: 'Tag Added Successfully',
      visibilityTime: 700,
    });
  }

  return (
    <View style={styles.wrapper}>
      {/*  CROSS BTN */}
      <Entypo
        name="cross"
        size={40}
        color="black"
        onPress={() => setAddTag(false)}
        style={{alignSelf: 'flex-end'}}
      />

      <View>
        {/*  FLAT LIST FOR SUGGESTIONS */}
        <FlatList
          scrollEnabled
          keyboardShouldPersistTaps="always"
          keyboardDismisssMode="on-drag"
          persistentScrollbar
          style={{maxHeight: 125}}
          data={suggestion}
          extraData={suggestion}
          renderItem={tag => {
            return (
              <TouchableOpacity
                key={tag.item.id}
                onPress={() => addTag(tag.item.name)}>
                <Text style={styles.suggestionTag}>{tag.item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />

        {/*  TEXT INPUT FOR ADDING TAG */}
        <TextInput
          value={searchTag}
          autoFocus
          onChangeText={text => {
            // # should always be there
            if (text.length == 0) return;

            // Update Input Text
            setSearchTag(text);
            // Suggest Accordingly
            searchSuggestion(text);
          }}
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  suggestionTag: {
    color: 'black',
    paddingLeft: 20,
    paddingVertical: 10,
    backgroundColor: 'lightgrey',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    borderBottomWidth: 1,
  },
  input: {
    zIndex: 200,
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  wrapper: {
    height: '100%',
    width: '100%',
    zIndex: 100,
    display: 'flex',
    justifyContent: 'flex-end',
  },
});
