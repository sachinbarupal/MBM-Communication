import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

export default function TagScreen({route}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{color: 'black'}}>{route.params.tag}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
