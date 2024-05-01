import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
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
    <View style={styles.sendContainer}>
      {/* Send Options  */}
      {sendOptions ? (
        <OutsidePressHandler onOutsidePress={() => setSendOptions(false)}>
          <View style={styles.iconsContainer}>
            {/* OPEN CAMERA ICON */}
            <TouchableOpacity onPress={openCamera}>
              <Image
                source={require('../assets/camera.png')}
                style={styles.icon}
              />
            </TouchableOpacity>

            {/* OPEN GALLEY ICON */}
            <TouchableOpacity onPress={openGallery}>
              <Image
                source={require('../assets/gallery.png')}
                style={styles.icon}
              />
            </TouchableOpacity>

            {/* ATTACHMENT  ICON */}
            <TouchableOpacity onPress={openGallery}>
              <Image
                source={require('../assets/document.png')}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </OutsidePressHandler>
      ) : (
        <TouchableOpacity onPress={() => setSendOptions(true)}>
          <Image
            source={require('../assets/attach.png')}
            style={[styles.icon, {marginLeft: 8}]}
          />
        </TouchableOpacity>
      )}

      {/* SHOW - UNSHOW TAG ICON */}
      <TouchableOpacity onPress={toggleShowTag}>
        <Image
          source={require('../assets/hashtag.png')}
          style={styles.hashtagIcon}
        />
      </TouchableOpacity>

      {/* SEND ICON */}
      <Send
        {...props}
        containerStyle={{justifyContent: 'center'}}
        onSend={handleSend}>
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
  iconsContainer: {
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    marginBottom: 85,
    marginRight: 0,
    paddingHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
    filter: 'blur(10)',
    borderRadius: 10,
    gap: 5,
  },
  icon: {
    width: 32,
    height: 32,
  },
  hashtagIcon: {
    width: 28,
    height: 28,
    marginLeft: 8,
    marginRight: 8,
  },
});
