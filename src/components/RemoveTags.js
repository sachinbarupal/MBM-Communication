import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';

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

    // If No more Tags to be removed Close remove Tag Window
    if (afterRemove.length == 0) setRemoveTag(false);
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'lightgrey',
        borderBottomWidth: 1,
        paddingVertical: 2,
      }}>
      {/* Navigate to Tag Screen */}
      <TouchableOpacity
        onPress={() => navigation.navigate('Tag Screen', {tag})}>
        <Text
          style={{
            flex: 1,
            color: 'blue',
            // textAlign: 'center',
            paddingLeft: 20,
            paddingVertical: 10,
            backgroundColor: 'lightgrey',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '100%',
            // borderRadius: 5,
          }}>
          {'#'}
          {tag}
        </Text>
      </TouchableOpacity>

      {/* Remove Tag Icon */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          // Remove Tag
          removeTag(tag);

          // Show Success Toast
          Toast.show({
            text1: 'Tag Removed Successfully',
            visibilityTime: 700,
            onPress: () => {
              Toast.hide();
            },
          });
        }}>
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
    <TouchableWithoutFeedback onPress={() => setRemoveTag(false)}>
      <View
        style={{
          height: '100%',
          // marginTop: '100%',
          // minHeight: 100,
          position: 'absolute',
          width: '100%',
          zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.1)',
          filter: 'blur(10)',
          // backgroundColor: 'white',
          // backfaceVisibility: 'hidden',
          // backgroundColor: 'rgba(0,0,0,0.1)',
          // filter: 'blur(10)',
          display: 'flex',
          justifyContent: 'flex-end',
          // alignItems: 'center',
        }}>
        {/* CROSS BTN */}
        {/* <View
          style={{
            // backgroundColor: 'white',
            // backgroundColor: 'rgba(0,0,0,0.1)',
            // filter: 'blur(10)',
            paddingTop: 50,
            alignItems: 'center',
          }}>
          <Entypo
            name="cross"
            size={40}
            color="black"
            onPress={() => setRemoveTag(false)}
            style={{alignSelf: 'flex-end'}}
          />
        </View> */}

        <View>
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
      </View>
    </TouchableWithoutFeedback>
  );
}
