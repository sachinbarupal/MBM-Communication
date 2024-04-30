import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import OutsidePressHandler from 'react-native-outside-press';
import {Send} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Colors} from '../theme/colors';

export default function CustomSend({
  props,
  sendOptions,
  setSendOptions,
  openCamera,
  openGallery,
  toggleShowTag,
  handleSend,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: 44,
        rowGap: 24,
        alignItems: 'center',
      }}>
      {toggleSendOptions ? (
        <OutsidePressHandler onOutsidePress={() => setToggleSendOptions(false)}>
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
}

const styles = StyleSheet.create({
  sendContainer: {
    flexDirection: 'row',
    height: 44,
    rowGap: 24,
    alignItems: 'center',
  },
});
