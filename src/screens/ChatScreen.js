import React, {useState, useCallback, useEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  Image,
  ImageBackground,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Bubble,
  Composer,
  Day,
  GiftedChat,
  InputToolbar,
  Message,
  Send,
  SystemMessage,
} from 'react-native-gifted-chat';
import Tags from '../components/MessageTags';
import {Colors} from '../theme/colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddTag from '../components/AddTag';
import RemoveTags from '../components/RemoveTags';
import Toast from 'react-native-toast-message';
import OutsidePressHandler from 'react-native-outside-press';
import {Menu, MenuDivider, MenuItem} from 'react-native-material-menu';
import ReplyBar from '../components/ReplyBar';
import SwipeMessage from '../components/SwipeMessage';

export const HeaderRight = () => {
  const [visible, setVisible] = useState(false);
  let toggle = () => setVisible(!visible);
  return (
    <>
      <TouchableOpacity
        onPress={toggle}
        // style={{marginTop: 20, marginRight: 8}}
      >
        {/* <TouchableOpacity> */}
        <Ionicons
          name="menu"
          size={30}
          // style={{paddingRight: 5}}
          color="white"
        />
        {/* </TouchableOpacity> */}
      </TouchableOpacity>
      {visible && (
        <Menu
          style={{
            marginLeft: 45,
            marginTop: 44,
            elevation: 0,
            borderWidth: 0.1,
            width: '50%',
            borderTopWidth: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
          visible={visible}
          anchor={<Text style={{color: 'black'}} onPress={toggle}></Text>}
          onRequestClose={toggle}>
          <MenuItem textStyle={{color: 'black'}} onPress={toggle}>
            Members
          </MenuItem>
          <MenuDivider />
          <MenuItem textStyle={{color: 'black'}} onPress={toggle}>
            Lock
          </MenuItem>
          <MenuDivider />
          <MenuItem textStyle={{color: 'black'}} disabled>
            Chat Settings
          </MenuItem>
          <MenuDivider />
          <MenuItem textStyle={{color: 'black'}} onPress={toggle}>
            UNSUBSCRIBE{'    '}
            <Image
              source={require('../assets/minus.png')}
              style={{width: 15, height: 15}}
            />
          </MenuItem>
        </Menu>
      )}
    </>
  );
};

export default function ChatScreen({route, navigation}) {
  const chat = route.params.chat;
  const [img, setImg] = useState('');
  const [messages, setMessages] = useState([]);
  const [tags, setTags] = useState('');
  const [currentTags, setCurrentTags] = useState([]);
  const [showTag, setShowTag] = useState(false);
  const [addTag, setAddTag] = useState(false);
  const [removeTag, setRemoveTag] = useState(false);
  const [toggleSendOptions, setToggleSendOptions] = useState(false);
  const [currentMsg, setCurrentMsg] = useState('');
  const [replyMsg, setReplyMsg] = useState(null);
  // USE EFFECT
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
      //  () =>
      //   setMenu ? (
      //     <View
      //       style={{
      //         width: 100,
      //         // height: ,
      //         position: 'absolute',
      //         zIndex: 10000,
      //         backgroundColor: 'red',
      //         top: 0,
      //         right: 0,
      //         flex: 1,
      //       }}>
      //       <Text style={{color: 'black'}}>UnSubsrive</Text>
      //     </View>
      //   ) : (
      //     <TouchableOpacity>
      //       <Image
      //         source={require('../assets/menu.png')}
      //         style={{width: 30, height: 30}}
      //       />
      //     </TouchableOpacity>
      //   ),
    });

    setMessages([
      {
        _id: 9,
        text: 'Yesss!! 🔥',
        user: {
          _id: 4,
          name: 'React Native',
        },
        createdAt: new Date(),
        // pending: true,
      },
      {
        _id: 2,
        text: 'This is a quick reply. Do you liked our work?',
        createdAt: new Date(),
        // received: true,
        quickReplies: {
          type: 'checkbox', // or 'radio',
          values: [
            {
              title: 'Yes',
              value: 'yes',
            },
            {
              title: 'Yes, Of Course !',
              value: 'yes_picture',
            },
            {
              title: 'Yaaay !!!',
              value: 'no',
            },
          ],
        },
        user: {
          _id: 2,
          name: 'Sachin',
        },
      },
      {
        _id: 1,
        text: 'Hello developer',
        // received: true,
        // sent: true,
        image:
          'https://upload.wikimedia.org/wikipedia/commons/9/96/MBM_Logo.png',
        createdAt: new Date(),
        user: {
          _id: 3,
          name: chat.name,
          avatar: chat.profile,
        },
      },

      {
        _id: 3,
        text: 'Hello Thereeeee !!!',
        createdAt: new Date(),
        // received: true,
        // quickReplies: {
        //   type: 'radio', // or 'checkbox',
        //   keepIt: true,
        //   values: [
        //     {
        //       title: '😋 Yes',
        //       value: 'yes',
        //     },
        //     {
        //       title: '📷 Yes, let me show you with a picture!',
        //       value: 'yes_picture',
        //     },
        //     {
        //       title: '😞 Nope. What?',
        //       value: 'no',
        //     },
        //   ],
        // },
        user: {
          _id: 3,
          name: chat.name,
          avatar: chat.profile,
        },
      },
      {
        _id: 5,
        text: 'Welcome Students !!',
        createdAt: new Date(Date.UTC(2024, 0, 1, 17, 20, 0)),
        system: true,
        // Any additional custom parameters are passed through
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
    // console.log(messages);
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
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
    // console.log(message);
    Keyboard.dismiss();
    let options = [];
    if (message.tags?.length > 0) {
      const tagString = `Tags : #${message.tags.join().replaceAll(',', ' #')}`;
      options.push(tagString);
    }
    options.push('Reply');
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
          case options.length === 4 ? 1 : 0:
            setReplyMsg(message);
            break;

          case options.length === 4 ? 2 : 1:
            onDelete(message._id);
            break;
        }
      },
    );
  }

  function handleSend() {
    if (currentTags.length == 0) {
      Toast.show({
        type: 'error',
        text1: 'Apply Atleast One Tag...',
        visibilityTime: 1000,
      });
      return;
    }

    const message = [
      {
        _id: currentMsg, //Random Unique ID DENI H
        text: currentMsg,
        image: img,
        createdAt: new Date(),
        tags: currentTags,
        user: {_id: 1, avatar: 18},
        isReply: replyMsg,
      },
    ];

    onSend(message);
    setCurrentMsg('');
    setImg('');
    // console.log(message);
  }

  return (
    <View
      // source={require('../assets/mbmLogoBnWO.png')}
      // resizeMode="contain"
      style={{flex: 1}}>
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
      {/* <ImageBackground
        source={require('../assets/mbmLogoBnW.png')}
        style={{flex: 1}}></ImageBackground> */}
      <GiftedChat
        timeTextStyle={{left: {color: 'black'}, right: {color: 'black'}}}
        renderSystemMessage={props => (
          <SystemMessage
            {...props}
            containerStyle={{
              backgroundColor: Colors.background,
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              padding: 2,
            }}
            textStyle={{color: 'black', fontSize: 20, fontWeight: '500'}}
          />
        )}
        messages={messages}
        // scrollToBottom
        // renderMessage={props => (
        //   <GestureHandlerRootView>
        //     <Swipeable
        //       friction={2}
        //       rightThreshold={40}
        //       leftThreshold={40}
        //       renderRightActions={() => <View style={{width: 40}}></View>}>
        //       <Message {...props} />
        //     </Swipeable>
        //   </GestureHandlerRootView>
        // )}
        // renderMessage={props => <SwipeMessage props={props} />}
        // renderChatFooter={() => {
        //   return (
        //     replyMsg && (
        //       <ReplyBar replyMsg={replyMsg} setReplyMsg={setReplyMsg} />
        //     )
        //   );
        // }}
        alwaysShowSend
        // renderTicks = {}
        text={currentMsg}
        onInputTextChanged={text => setCurrentMsg(text)}
        // ON SEND
        // onSend={messages => {}}
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
        renderDay={props => <Day {...props} textStyle={{color: 'black'}} />}
        // LONG PRESS
        onLongPress={(context, message) => handleLongPress(context, message)}
        // BUBBLE
        renderBubble={props => {
          // console.log(props);
          // if()
          return (
            <Bubble
              {...props}
              textStyle={{
                right: {
                  color: 'black',
                },
              }}
              wrapperStyle={{
                left: {
                  backgroundColor: '#ece5dd',
                },
                right: {
                  backgroundColor: '#dcf8c6',
                },
              }}
            />
          );
        }}
        renderTicks={message => {
          if (message.pending)
            return (
              <Image
                source={require('../assets/pending.png')}
                style={{width: 15, height: 15, marginRight: 8}}
              />
            );

          return (
            (message.received || message.sent) && (
              <Ionicons
                name={message.received ? 'checkmark-done' : 'checkmark'}
                size={20}
                style={{paddingRight: 5}}
                color="blue"
              />
            )
          );
        }}
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
              {/* <OutsidePressHandler onOutsidePress={() => setShowTag(false)}> */}
              <TouchableOpacity onPress={() => setShowTag(!showTag)}>
                <Image
                  source={require('../assets/hashtag.png')}
                  style={{
                    width: 28,
                    height: 28,
                    marginLeft: 8,
                    marginRight: 8,
                  }}
                />
              </TouchableOpacity>
              {/* </OutsidePressHandler> */}

              {/* SEND ICON */}
              <Send
                {...props}
                containerStyle={{justifyContent: 'center'}}
                onSend={() => handleSend()}>
                <Icon
                  name="send"
                  style={{marginRight: 10}}
                  size={24}
                  color={Colors.secondaryColor}
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
