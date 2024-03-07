import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {TextInput} from 'react-native-paper';
export default function AddTags({tags, setTags, setAddTags}) {
  const [inputTag, setInputTag] = useState('#');
  return (
    <>
      <View style={styles.tags}>
        {tags?.map((tag, index) => (
          <Text key={index} style={{color: 'blue'}}>
            #{tag}
          </Text>
        ))}
      </View>
      <View style={styles.container}>
        {/* <View style={styles.iconContainer}>
        <Icon style={styles.icon} name="hashtag" size={20} color="black" />
      </View> */}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBar}
            value={inputTag ? inputTag : '#'}
            onChangeText={text => setInputTag(text)}
            onSubmitEditing={() =>
              setTags(prev => {
                prev.push(inputTag.substring(1));
                setInputTag('#');
                return prev;
              })
            }
          />
        </View>

        <TouchableOpacity
          style={styles.crossContainer}
          onPress={() => setAddTags(false)}>
          <Image
            style={styles.iconCross}
            source={require('../assets/cross.png')}
          />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  tags: {
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: 'auto',
    flexWrap: 'wrap',
    padding: 5,
    flexDirection: 'row',
    gap: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBlockColor: 'lightgrey',
    height: 50,
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconContainer: {
    paddingLeft: 8,
    paddingRight: 6,
  },
  inputContainer: {
    flex: 1,
    borderRadius: 100,
    backgroundColor: 'red',
  },
  crossContainer: {
    padding: 4,
  },
  iconCross: {
    width: 26,
    height: 26,
  },
});
