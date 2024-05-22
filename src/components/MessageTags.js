import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {Colors} from '../theme/colors';

export default function Tags({tags, setAddTag, setRemoveTag}) {
  // SHOW ALL CURRENT APPLIED TAGS BELOW MSG INPUT
  return (
    <View style={styles.wrapper}>
      {/*TAGS  */}
      <View style={styles.tagContainer}>
        <Text
          style={{
            fontSize: tags.length != 0 ? 14 : 16,
            marginLeft: tags.length != 0 ? 5 : 10,
            paddingTop: tags.length != 0 ? 2 : 5,
            color: Colors.primaryColor,
            fontWeight: 500,
          }}>
          Tags
        </Text>
        {tags.length != 0 && <Text style={styles.tags}>{tags}</Text>}
      </View>

      {/* ADD and Remove Tag Icons */}
      <View style={styles.iconContainer}>
        {/* ADD TAG ICON */}
        <TouchableOpacity
          onPress={() => setAddTag(true)}
          style={{marginTop: 5}}>
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
              });
              return;
            }

            // Show Remove Tag Window
            setRemoveTag(true);
          }}
          style={{
            marginLeft: 5,
            marginRight: 5,
            marginTop: 6,
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

const styles = StyleSheet.create({
  tags: {color: 'blue', fontSize: 16, marginLeft: 5, paddingBottom: 5},
  iconContainer: {
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
  },
  wrapper: {flexDirection: 'row', minHeight: 44},
  tagContainer: {backgroundColor: 'lightgrey', width: '80%', color: 'blue'},
});
