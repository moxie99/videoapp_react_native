import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Callactionbottombox from '../../components/callactionbottombox';

const CallScreen = () => {
  return (
    <View style={styles.page}>
      <View style={styles.cameraPreview}></View>

      <Callactionbottombox />
    </View>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: '#484a48'},
  cameraPreview: {
    width: 150,
    height: 200,
    borderRadius: 50,
    backgroundColor: 'red',
    position: 'absolute',
    right: '5%',
    top: '15%',
  },
});
