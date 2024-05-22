import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Bubble} from 'react-native-gifted-chat';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomBubble = ({props}) => {
  //   console.log('pressed', props.currentMessage.likes);
  //   const [likes, setLikes] = useState(props.currentMessage.likes);
  return (
    <View>
      {props.currentMessage.likes !== 0 && props.currentMessage.likes && (
        <View
          style={[
            props.position === 'left' ? styles.left : styles.right,
            styles.reactBox,
          ]}>
          <FontAwesome name="heart" size={16} color="red" />
          <Text style={{color: 'black', textAlignVertical: 'center'}}>
            {props.currentMessage.likes}
          </Text>
        </View>
      )}
      <Bubble
        {...props}
        textStyle={{right: {color: 'black'}}}
        wrapperStyle={{
          left: {backgroundColor: '#ece5dd'},
          right: {backgroundColor: '#dcf8c6'},
        }}
        containerStyle={{marginBottom: 100}}
      />
    </View>
  );
};

export default CustomBubble;

const styles = StyleSheet.create({
  left: {
    bottom: -10,
    right: 55,
  },
  right: {
    bottom: -10,
    left: 55,
  },
  reactBox: {
    gap: 4,
    backgroundColor: 'white',
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 10,
    padding: 2,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
});
