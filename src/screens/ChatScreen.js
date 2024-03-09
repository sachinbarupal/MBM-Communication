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
export default function ChatScreen({route}) {
  const chat = route.params.chat;
  const [img, setImg] = useState(null);
  const [messages, setMessages] = useState([]);
  const [tags, setTags] = useState(
    chat.tags && chat.tags.length > 0
      ? `#${chat.tags?.join().replaceAll(',', ' #')}`
      : '',
  );
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
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    setImg(null);
  }, []);

  function onDelete(messageIdToDeleteID) {
    setMessages(previousMessages => {
      return previousMessages.filter(msg => msg._id !== messageIdToDeleteID);
    });
  }

  async function openCamera() {
    const result = await launchCamera();

    if (result.assets) setImg(result.assets[0].uri);
  }

  async function openGallery() {
    const result = await launchImageLibrary();
    if (result.assets) setImg(result.assets[0].uri);
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <GiftedChat
        messages={messages}
        onSend={messages => {
          messages[0].tags = tags.match(/#[a-z]+/gi)?.map(tag => tag.slice(1));
          messages[0].image = img ? img : '';
          onSend(messages);
        }}
        user={{
          _id: 1,
          avatar: chat.profile,
        }}
        // showUserAvatar
        isKeyboardInternallyHandled={false}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={{position: 'relative'}}
            accessoryStyle={{height: 'auto'}}
          />
        )}
        onLongPress={(context, message) => {
          Keyboard.dismiss();
          let options = [];
          if (message.tags?.length > 0) {
            const tagString = `Tags : #${message.tags
              .join()
              .replaceAll(',', ' #')}`;
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
        }}
        renderBubble={props => <Bubble {...props} />}
        renderSend={props => {
          return (
            <View
              style={{
                flexDirection: 'row',
                height: 44,
                rowGap: 24,
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={() => openCamera()}>
                <Image
                  source={require('../assets/camera.png')}
                  style={{width: 28, height: 28}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openGallery()}>
                <Image
                  source={require('../assets/gallery.png')}
                  style={{
                    width: 28,
                    height: 28,
                    marginLeft: 8,
                    marginRight: 10,
                  }}
                />
              </TouchableOpacity>
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
        minComposerHeight={44}
        messagesContainerStyle={{flex: 1}}
        renderComposer={props => (
          <Composer
            {...props}
            textInputStyle={{color: 'black', lineHeight: 20}}
          />
        )}
        renderAccessory={() => <Tags tags={tags} setTags={setTags} />}
      />
    </View>
  );
}
