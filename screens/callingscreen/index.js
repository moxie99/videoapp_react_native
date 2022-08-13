import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Callactionbottombox from '../../components/callactionbottombox';

const CallingScreen = () => {
  return (
    <View style={styles.page}>
      <View style={styles.cameraPreview}>
        <Text style={styles.name}>Alex</Text>
        <Text style={styles.phoneNumber}>ringing .... +23470...</Text>
        {/* <View style={{flex: 1}} /> */}
      </View>
      <Callactionbottombox />
    </View>
  );
};

export default CallingScreen;

const styles = StyleSheet.create({
  page: {height: '100%', backgroundColor: '#484a48'},
  cameraPreview: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 40,
    marginBottom: 20,
  },
  phoneNumber: {fontSize: 20, color: 'white', fontWeight: 'bold'},
});
