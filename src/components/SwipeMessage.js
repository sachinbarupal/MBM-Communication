import React from 'react';
import {Animated, Image, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

import {Message, isSameDay, isSameUser} from 'react-native-gifted-chat';
export default function SwipeMessage({props}) {
  const isNextMyMessage =
    props.currentMessage &&
    props.nextMessage &&
    isSameDay(props.currentMessage, props.nextMessage) &&
    isSameUser(props.currentMessage, props.nextMessage);

  const renderRightAction = (
    // Animation Logic
    progressAnimatedValue = Animated.AnimatedInterpolation,
  ) => {
    const size = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 100],
      outputRange: [0, 1, 1],
    });
    const trans = progressAnimatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, -12, -20],
    });

    // Components Here
    return (
      <Animated.View
        style={[
          styles.container,
          {transform: [{scale: size}, {translateX: trans}]},
          isNextMyMessage
            ? styles.defaultBottomOffset
            : styles.bottomOffsetNext,
          props.position === 'right' && styles.leftOffSetValue,
        ]}>
        <View style={styles.replyIconContainer}>
          <Image
            style={styles.replyIcon}
            source={require('../assets/reply.png')}
          />
        </View>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        friction={2}
        rightThreshold={40}
        renderRightActions={renderRightAction}>
        <Message {...props} />
      </Swipeable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
  },
  replyIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  replyIcon: {
    width: 20,
    height: 20,
  },
  defaultBottomOffset: {marginBottom: 2},
  bottomOffsetNext: {marginBottom: 10},
  leftOffsetValue: {marginLeft: 16},
});
