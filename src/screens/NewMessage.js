import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import CustomSend from '../components/CustomSend';
import MessageTags from '../components/MessageTags';
import AddTag from '../components/AddTag';
import RemoveTags from '../components/RemoveTags';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

const NewMessage = ({navigation}) => {
  useLayoutEffect(
    () =>
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={onSend}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
              SEND
            </Text>
          </TouchableOpacity>
        ),
      }),
    [],
  );
  const [currentTags, setCurrentTags] = useState([]);
  const [tags, setTags] = useState('');
  const [addTag, setAddTag] = useState(false);
  const [sendOptions, setSendOptions] = useState(false);
  const [showTag, setShowTag] = useState(false);
  const [removeTag, setRemoveTag] = useState(false);
  const [img, setImg] = useState('');

  const toggleShowTag = () => setShowTag(!showTag);

  // OPEN CAMERA
  async function openCamera() {
    const result = await launchCamera();
    if (result.assets) {
      setImg(result.assets[0].uri);
      Toast.show({text1: 'Image Selected Successfully'});
    }
  }

  // OPEN GALLERY
  async function openGallery() {
    const result = await launchImageLibrary();
    if (result.assets) {
      setImg(result.assets[0].uri);
      Toast.show({text1: 'Image Selected Successfully'});
    }
  }

  function onSend() {
    // Send ka system likhna h yaha
    // message frame kro
    // then sir ki backends api se saare tags me msg bhejo
    // konse tagss me bhejna h = currentTags

    navigation.reset({
      index: 0,
      routes: [{name: 'Chats'}],
    });
    // navigation.navigate('Chats');
  }

  return (
    <SafeAreaView style={styles.container}>
      {addTag ? (
        <AddTag
          setTags={setTags}
          currentTags={currentTags}
          setCurrentTags={setCurrentTags}
          setAddTag={setAddTag}></AddTag>
      ) : removeTag ? (
        <RemoveTags
          currentTags={currentTags}
          setCurrentTags={setCurrentTags}
          setTags={setTags}
          setRemoveTag={setRemoveTag}></RemoveTags>
      ) : (
        <>
          <TextInput
            autoFocus
            multiline
            placeholder="Enter Message"
            cursorColor="black"
            textAlignVertical="top"
            placeholderTextColor="black"
            style={[
              styles.textInput,
              {
                backgroundColor: 'white',
                color: 'black',
                fontSize: 16,
              },
            ]}
          />
          {/* </View> */}
          <View style={styles.bottomView}>
            <View
              style={{
                marginTop: 'auto',
                marginLeft: 'auto',
              }}>
              <CustomSend
                openCamera={openCamera}
                openGallery={openGallery}
                sendOptions={sendOptions}
                setSendOptions={setSendOptions}
                toggleShowTag={toggleShowTag}
              />
            </View>
            {showTag && (
              <View style={{height: 'auto', backgroundColor: 'lightgrey'}}>
                <MessageTags
                  setRemoveTag={setRemoveTag}
                  setAddTag={setAddTag}
                  tags={tags}
                />
              </View>
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default NewMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    flex: 1,
    padding: 10,
  },
  bottomView: {
    backgroundColor: 'white',
  },
});
