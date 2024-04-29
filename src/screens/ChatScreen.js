import React, {useState, useCallback, useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Image, Keyboard, TouchableOpacity, View} from 'react-native';
import {
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import Tags from '../components/MessageTags';
import {Colors} from '../theme/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddTag from '../components/AddTag';
import RemoveTags from '../components/RemoveTags';
import Toast from 'react-native-toast-message';
import OutsidePressHandler from 'react-native-outside-press';
export default function ChatScreen({route, navigation}) {
  const chat = route.params.chat;
  const [img, setImg] = useState(null);
  const [messages, setMessages] = useState([]);
  const [tags, setTags] = useState('');
  const [currentTags, setCurrentTags] = useState([]);
  const [showTag, setShowTag] = useState(false);
  const [addTag, setAddTag] = useState(false);
  const [removeTag, setRemoveTag] = useState(false);
  const [toggleSendOptions, setToggleSendOptions] = useState(false);

  // USE EFFECT
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: chat.name,
          avatar: chat.profile,
        },
      },
    ]);
    if (!chat.tags) chat.tags = [];
    setCurrentTags([...chat.tags]);
    setTags(
      chat.tags && chat.tags.length > 0
        ? `#${chat.tags?.join().replaceAll(',', ' #')}`
        : '',
    );
  }, []);

  // ON SEND MSG
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    setImg(null);
  }, []);

  // DELETE MSG
  function onDelete(messageIdToDeleteID) {
    setMessages(previousMessages => {
      return previousMessages.filter(msg => msg._id !== messageIdToDeleteID);
    });
  }

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

  // HANDLE LONG PRESS
  function handleLongPress(context, message) {
    Keyboard.dismiss();
    let options = [];
    if (message.tags?.length > 0) {
      const tagString = `Tags : #${message.tags.join().replaceAll(',', ' #')}`;
      options.push(tagString);
    }
    options.push('Delete Message');
    options.push('Cancel');
    const cancelButtonIndex = options.length - 1;

    context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case options.length === 3 ? 1 : 0:
            onDelete(message._id);
            break;
        }
      },
    );
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      {/* ADD TAG WINDOW */}
      {addTag && (
        <AddTag
          setCurrentTags={setCurrentTags}
          currentTags={currentTags}
          setTags={setTags}
          setAddTag={setAddTag}
        />
      )}

      {/* REMOVE TAG WINDOW */}
      {removeTag && (
        <RemoveTags
          navigation={navigation}
          setRemoveTag={setRemoveTag}
          setTags={setTags}
          setCurrentTags={setCurrentTags}
          currentTags={currentTags}
        />
      )}

      <GiftedChat
        messages={messages}
        // ON SEND
        onSend={messages => {
          if (currentTags.length == 0) {
            Toast.show({
              type: 'error',
              text1: 'Add Atleast one Tag with the Message..',
            });
            return;
          }
          messages[0].tags = currentTags;
          messages[0].image = img ? img : '';
          onSend(messages);
        }}
        // USER
        user={{
          _id: 1,
          avatar: chat.profile,
        }}
        isKeyboardInternallyHandled={false}
        // INPUT TOOLBAR
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            accessoryStyle={{height: showTag ? 'auto' : 0}}
            containerStyle={{position: 'relative'}}
          />
        )}
        // LONG PRESS
        onLongPress={(context, message) => handleLongPress(context, message)}
        // BUBBLE
        renderBubble={props => <Bubble {...props} />}
        // SEND
        renderSend={props => {
          return (
            <View
              style={{
                flexDirection: 'row',
                height: 44,
                rowGap: 24,
                alignItems: 'center',
              }}>
              {toggleSendOptions ? (
                <OutsidePressHandler
                  onOutsidePress={() => setToggleSendOptions(false)}>
                  <View
                    style={{
                      zIndex: 1000,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      // padding: 20,
                      height: 120,
                      // paddingBottom: 10,

                      marginBottom: 85,
                      // marginRight: 5,
                      // backgroundColor: ',
                      marginRight: 0,
                      paddingHorizontal: 5,
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      filter: 'blur(10)',
                      borderRadius: 10,
                      gap: 5,
                    }}>
                    {/* OPEN CAMERA ICON */}
                    <TouchableOpacity onPress={openCamera}>
                      <Image
                        source={require('../assets/camera.png')}
                        style={{width: 32, height: 32}}
                      />
                    </TouchableOpacity>

                    {/* OPEN GALLEY ICON */}
                    <TouchableOpacity onPress={openGallery}>
                      <Image
                        source={require('../assets/gallery.png')}
                        style={{
                          width: 32,
                          height: 32,
                          // marginLeft: 8,
                          // marginRight: 10,
                        }}
                      />
                    </TouchableOpacity>

                    {/* ATTACHMENT  ICON */}
                    <TouchableOpacity onPress={openGallery}>
                      <Image
                        source={require('../assets/document.png')}
                        style={{
                          width: 32,
                          height: 32,
                          // marginLeft: 8,
                          // marginRight: 5,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </OutsidePressHandler>
              ) : (
                <TouchableOpacity onPress={() => setToggleSendOptions(true)}>
                  <Image
                    source={require('../assets/attach.png')}
                    style={{
                      width: 32,
                      height: 32,
                      marginLeft: 8,
                      // marginRight: 10,
                    }}
                  />
                </TouchableOpacity>
              )}

              {/* SHOW - UNSHOW TAG ICON */}
              <TouchableOpacity onPress={() => setShowTag(!showTag)}>
                <Image
                  source={require('../assets/hashtag.png')}
                  style={{
                    width: 28,
                    height: 28,
                    marginLeft: 8,
                    marginRight: 10,
                  }}
                />
              </TouchableOpacity>

              {/* SEND ICON */}
              <Send {...props} containerStyle={{justifyContent: 'center'}}>
                <Icon
                  name="send"
                  style={{marginRight: 10}}
                  size={22}
                  color={Colors.primaryColor}
                />
              </Send>
            </View>
          );
        }}
        // Composer (input field)
        minComposerHeight={44}
        messagesContainerStyle={{flex: 1}}
        renderComposer={props => (
          <Composer
            {...props}
            textInputStyle={{color: 'black', lineHeight: 20}}
          />
        )}
        // ACCESSORY
        renderAccessory={() => (
          <Tags setAddTag={setAddTag} setRemoveTag={setRemoveTag} tags={tags} />
        )}
      />
    </View>
  );
}
