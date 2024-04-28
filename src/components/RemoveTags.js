import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import {allTags} from '../data/AllTags';

export function Card({tag, navigation, currentTags, setCurrentTags, setTags}) {
  function removeTag(tag) {
    const afterRemove = currentTags.filter(thisTag => thisTag !== tag);
    setCurrentTags([...afterRemove]);
    setTags(
      afterRemove && afterRemove.length > 0
        ? `#${afterRemove?.join().replaceAll(',', ' #')}`
        : '',
    );
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
      <TouchableOpacity
        //   key={index}
        onPress={() =>
          navigation.navigate('Tag Screen', {
            tag,
          })
        }>
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
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          removeTag(tag);
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
  //   const [searchTag, setSearchTag] = useState('#');
  //   const [suggestion, setSuggestion] = useState([]);

  //   // console.log('cc', currentTags);
  //   function searchSuggestion(text) {
  //     if (text.length == 1) {
  //       setSuggestion([]);
  //       return;
  //     }
  //     // console.log('here ', currentTags);
  //     filtered = allTags.filter(item => {
  //       // console.log('item');
  //       return (
  //         item.name.toLowerCase().startsWith(text.substring(1).toLowerCase()) &&
  //         !currentTags.includes(item.name)
  //       );
  //     });
  //     setSuggestion(filtered);
  //     // console.log('filt', filtered);
  //   }

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        zIndex: 100,
        backgroundColor: 'white',
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
        onPress={() => setRemoveTag(false)}
        style={{alignSelf: 'flex-end'}}
      />

      <View>
        {currentTags.length == 0 && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'lightgrey',
              borderBottomWidth: 1,
              paddingVertical: 2,
            }}>
            <Text
              style={{
                flex: 1,
                color: 'black',
                textAlign: 'center',
                // fontSize: 20,
                fontWeight: '700',
                paddingLeft: 20,
                paddingVertical: 10,
                backgroundColor: 'lightgrey',
                marginLeft: 'auto',
                marginRight: 'auto',
                width: '100%',
                // borderRadius: 5,
              }}>
              No Tags Applied
            </Text>
          </View>
        )}
        <FlatList
          scrollEnabled
          keyboardShouldPersistTaps="always" //open keyboard
          keyboardDismisssMode="on-drag"
          persistentScrollbar
          //   style={{maxHeight: 125}}/
          data={currentTags}
          extraData={currentTags}
          renderItem={(tag, index) => {
            return (
              <Card
                key={index}
                setCurrentTags={setCurrentTags}
                currentTags={currentTags}
                navigation={navigation}
                setTags={setTags}
                tag={tag.item}
              />
            );
          }}
        />
        {/* <TextInput
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
        /> */}
      </View>
    </View>
  );
}
