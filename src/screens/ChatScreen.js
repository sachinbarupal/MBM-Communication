import React, {useState, useCallback, useEffect, useLayoutEffect} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  Image,
  Keyboard,
  StyleSheet,
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
} from 'react-native-gifted-chat';
import Tags from '../components/MessageTags';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddTag from '../components/AddTag';
import RemoveTags from '../components/RemoveTags';
import Toast from 'react-native-toast-message';
import {Menu, MenuDivider, MenuItem} from 'react-native-material-menu';
import ReplyBar from '../components/ReplyBar';
import CustomSend from '../components/CustomSend';
import ReplyMessageBubble from '../components/ReplyMessageBubble';
import CustomBubble from '../components/CustomBubble';

export const HeaderRight = () => {
  const [visible, setVisible] = useState(false);
  let toggle = () => setVisible(!visible);
  return (
    <>
      <TouchableOpacity onPress={toggle}>
        <Ionicons name="menu" size={30} color="white" />
      </TouchableOpacity>
      {visible && (
        <Menu
          style={styles.optionMenu}
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
  const [tags, setTags] = useState(
    chat.tags && chat.tags.length > 0
      ? `#${chat.tags?.join().replaceAll(',', ' #')}`
      : '',
  );
  const [currentTags, setCurrentTags] = useState(
    chat.tags ? [...chat.tags] : [],
  );
  const [showTag, setShowTag] = useState(false);
  const [addTag, setAddTag] = useState(false);
  const [removeTag, setRemoveTag] = useState(false);
  const [sendOptions, setSendOptions] = useState(false);
  const [currentMsg, setCurrentMsg] = useState('');
  const [replyMsg, setReplyMsg] = useState(null);

  useLayoutEffect(
    () => navigation.setOptions({headerRight: HeaderRight, title: chat.name}),
    [],
  );

  // USE EFFECT
  useEffect(() => {
    setMessages([
      {
        _id: 'Hola',
        likes: 1,
        createdAt: new Date(),
        image: '',
        replyMessage: {
          _id: 3,
          // createdAt: '2024-05-01T10:02:34.958Z',
          text: 'Hello Thereeeee !!!',
          user: {_id: 3, avatar: 18, name: 'MBM'},
        },
        tags: ['mbm', 'news', 'official'],
        text: 'Hola',
        user: {_id: 1, avatar: 18},
      },
      {
        _id: 9,
        text: 'Yesss!! 🔥',
        likes: 1,
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
        // image:
        //   'https://upload.wikimedia.org/wikipedia/commons/9/96/MBM_Logo.png',
        createdAt: new Date(),
        user: {_id: 3, name: chat.name, avatar: chat.profile},
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
  }, []);

  // ON SEND MSG
  const onSend = useCallback((messages = []) => {
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
    // console.log(e.nativeEvent);
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

  // HANDLE PRESS
  function handlePress(context, message) {
    // const newMessages = [...messages];
    // const index = newMessages.findIndex(mes => mes._id === message._id);
    // const si = newMessages.findIndex(mes => mes._id === 3);
    // newMessages[si].text = 'herere';
    // if(index > -1){
    // newMessages[index].text = 'heheheh';
    // ? newMessages[index].likes++
    // : (newMessages[index].likes = 1);
    // newMessages[index]._id = 15;
    // console.log('newMessages', newMessages[index]);
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    // setMessages(newMessages);
    // }
    // if (message.likes) message.likes++;
    // else message.likes = 1;
    // setMessages(prev => )
  }

  // HANDLE SEND
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
        replyMessage: replyMsg,
      },
    ];
    setReplyMsg(null);
    onSend(message);
    setCurrentMsg('');
    setImg('');
  }

  // SHOW UNSHOW TAG
  const toggleShowTag = () => setShowTag(!showTag);

  // MAIN Component
  return (
    <View style={{flex: 1}}>
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

      {/*GIFTED CHAT  */}
      <GiftedChat
        // USER
        user={{_id: 1, avatar: chat.profile}}
        // Current Input
        text={currentMsg}
        onInputTextChanged={text => setCurrentMsg(text)}
        // Messages
        messages={messages}
        // INPUT TOOLBAR
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            accessoryStyle={{height: showTag ? 'auto' : 0}}
            containerStyle={{position: 'relative'}}
          />
        )}
        // BUBBLE
        renderBubble={props => (
          <Bubble
            {...props}
            textStyle={{right: {color: 'black'}}}
            wrapperStyle={{
              left: {backgroundColor: '#ece5dd'},
              right: {backgroundColor: '#dcf8c6'},
            }}
          />
        )}
        // renderBubble={props => <CustomBubble props={props} />}
        // SEND
        renderSend={props => (
          <CustomSend
            props={props}
            sendOptions={sendOptions}
            setSendOptions={setSendOptions}
            toggleShowTag={toggleShowTag}
            openCamera={openCamera}
            handleSend={handleSend}
            openGallery={openGallery}
          />
        )}
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
        // Swipable Message
        renderMessage={props => <Message {...props} />}
        // Reply Message
        renderCustomView={props => <ReplyMessageBubble props={props} />}
        // Reply Box
        renderChatFooter={() => {
          return (
            replyMsg && (
              <ReplyBar replyMsg={replyMsg} setReplyMsg={setReplyMsg} />
            )
          );
        }}
        // LONG PRESS
        onLongPress={handleLongPress}
        // Time
        timeTextStyle={{left: {color: 'black'}, right: {color: 'black'}}}
        // Date
        renderDay={props => <Day {...props} textStyle={{color: 'black'}} />}
        alwaysShowSend
        // renderAvatar={null}
        // renderUsernameOnMessage
        onPress={handlePress}
        isKeyboardInternallyHandled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  optionMenu: {
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
  },
});

// renderSystemMessage={props => (
//   <SystemMessage
//     {...props}
//     containerStyle={{
//       backgroundColor: Colors.background,
//       width: '90%',
//       alignSelf: 'center',
//       borderRadius: 10,
//       padding: 2,
//     }}
//     textStyle={{color: 'black', fontSize: 20, fontWeight: '500'}}
//   />
// )}

// renderTicks={message => {
//   if (message.pending)
//     return (
//       <Image
//         source={require('../assets/pending.png')}
//         style={{width: 15, height: 15, marginRight: 8}}
//       />
//     );

//   return (
//     (message.received || message.sent) && (
//       <Ionicons
//         name={message.received ? 'checkmark-done' : 'checkmark'}
//         size={20}
//         style={{paddingRight: 5}}
//         color="blue"
//       />
//     )
//   );
// }}
