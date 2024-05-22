import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Toast from 'react-native-toast-message';
import OutsidePressHandler from 'react-native-outside-press';

export function Card({
  tag,
  navigation,
  currentTags,
  setCurrentTags,
  setRemoveTag,
  setTags,
}) {
  //  REMOVE TAG
  function removeTag(tag) {
    // REMOVE FROM CurrentTags Array
    const afterRemove = currentTags.filter(thisTag => thisTag !== tag);

    //Update Current Tags Array
    setCurrentTags([...afterRemove]);

    //Update Tags String
    setTags(
      afterRemove && afterRemove.length > 0
        ? `#${afterRemove?.join().replaceAll(',', ' #')}`
        : '',
    );

    // Show Success Toast
    Toast.show({text1: 'Tag Removed Successfully', visibilityTime: 700});

    // If No more Tags to be removed Close remove Tag Window
    if (afterRemove.length == 0) setRemoveTag(false);
  }

  return (
    <View style={styles.cardContainer}>
      {/* Navigate to Tag Screen */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Tag Screen', {tag})}>
        <Text style={styles.tagText}>{`#${tag}`}</Text>
      </TouchableOpacity>

      {/* Remove Tag Icon */}
      <TouchableOpacity activeOpacity={1} onPress={() => removeTag(tag)}>
        <Image
          source={require('../assets/dustbin.png')}
          style={{width: 30, height: 30, marginRight: 10}}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function RemoveTags({
  navigation,
  setRemoveTag,
  setTags,
  setCurrentTags,
  currentTags,
}) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => setRemoveTag(false)}>
        <Text
          style={{
            backgroundColor: 'transparent',
            color: 'black',
            marginLeft: 'auto',
            paddingTop: 10,
            marginRight: 10,
            fontSize: 18,
            // marb,
          }}>
          Close
        </Text>
      </TouchableOpacity>
      <OutsidePressHandler onOutsidePress={() => setRemoveTag(false)}>
        <View style={{maxHeight: '96%', marginTop: 'auto'}}>
          {/* FLAT LIST TO SHOW ALL CURRENT TAGS */}
          <FlatList
            scrollEnabled
            keyboardShouldPersistTaps="always"
            keyboardDismisssMode="on-drag"
            persistentScrollbar
            data={currentTags}
            extraData={currentTags}
            renderItem={(tag, index) => {
              return (
                <Card
                  key={index}
                  setCurrentTags={setCurrentTags}
                  currentTags={currentTags}
                  navigation={navigation}
                  setRemoveTag={setRemoveTag}
                  setTags={setTags}
                  tag={tag.item}
                />
              );
            }}
          />
        </View>
      </OutsidePressHandler>
    </View>
  );
}
const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    position: 'absolute',
    width: '100%',
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.1)',
    filter: 'blur(10)',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'lightgrey',
    borderBottomWidth: 1,
    paddingVertical: 3,
  },
  tagText: {
    flex: 1,
    color: 'blue',
    paddingLeft: 20,
    paddingVertical: 10,
    backgroundColor: 'lightgrey',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
  },
});
