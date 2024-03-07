import React, {useState, useCallback, useEffect} from 'react';
import {View} from 'react-native';
import {Composer, GiftedChat, InputToolbar} from 'react-native-gifted-chat';
import Tags from '../components/MessageTags';
import {Colors} from '../theme/colors';
export default function ChatScreen({route}) {
  const chat = route.params.chat;
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
        tags: chat.tags,
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
  }, []);

  function onDelete(messageIdToDeleteID) {
    setMessages(previousMessages => {
      console.log(previousMessages);
      return previousMessages.filter(msg => msg._id !== messageIdToDeleteID);
    });
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <GiftedChat
        messages={messages}
        onSend={messages => {
          messages[0].tags = tags.match(/#[a-z]+/gi)?.map(tag => tag.slice(1));
          onSend(messages);
        }}
        user={{
          _id: 1,
          avatar: chat.profile,
        }}
        showUserAvatar
        isKeyboardInternallyHandled={false}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={{position: 'relative'}}
            accessoryStyle={{height: 'auto'}}
          />
        )}
        onLongPress={(context, message) => {
          console.log(context, message);
          let options = [];
          if (message.tags?.length > 0) {
            const tagString = `Tags : #${message.tags
              .join()
              .replaceAll(',', ' #')}`;
            options.push(tagString);
          }
          options.push('Delete Message');
          options.push('Cancel');
          console.log(options);
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
