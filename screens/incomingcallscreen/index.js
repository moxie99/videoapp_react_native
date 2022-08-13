import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import img from './../../assets/img/imgbg.jpeg';
const IncomingCallScreen = () => {
  const callAlarm = () => {
    Alert.alert('Open Alarm');
  };
  const callMessage = () => {
    Alert.alert('Open Message');
  };
  const onDecline = () => {
    Alert.alert('Open Decline');
  };
  const onAccept = () => {
    Alert.alert('Open Accept');
  };
  return (
    <View style={styles.page}>
      <ImageBackground source={img} style={styles.bg}>
        <View>
          <Text style={styles.name}>Alex</Text>
          <Text style={styles.phoneNumber}>Calling .... +23470...</Text>
        </View>
        {/* Action section  */}
        {/* Alarm and message */}
        <View style={[styles.row, {marginTop: 'auto'}]}>
          <TouchableOpacity onPress={callAlarm}>
            <View style={styles.iconContainer}>
              <Ionicons name="alarm" size={30} color="white" />
              <Text style={styles.iconText}>Remind me</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={callMessage}>
            <View style={styles.iconContainer}>
              <AntDesign name="message1" size={30} color="white" />
              <Text style={styles.iconText}>Message</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Aceccept and reject calls */}
        <View style={styles.row}>
          <TouchableOpacity onPress={onDecline}>
            <View style={styles.iconContainer}>
              <View style={styles.iconBtn}>
                <Ionicons name="close-sharp" size={40} color="white" />
              </View>
              <Text style={styles.iconText}>Decline</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onAccept}>
            <View style={styles.iconContainer}>
              <View style={[styles.iconBtn, {backgroundColor: 'green'}]}>
                <Ionicons name="checkbox" size={40} color="white" />
              </View>
              <Text style={styles.iconText}>Accept</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default IncomingCallScreen;

const styles = StyleSheet.create({
  page: {height: '100%'},
  cameraPreview: {
    alignItems: 'center',
    paddingTop: 70,
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 100,
    marginBottom: 20,
  },
  phoneNumber: {fontSize: 20, color: 'white', fontWeight: 'bold'},
  bg: {flex: 1, resizeMode: 'cover', alignItems: 'center', padding: 10},
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingBottom: 60,
  },
  iconContainer: {alignItems: 'center', marginVertical: 20},
  iconText: {color: 'white', fontSize: 20, marginTop: 10},
  iconBtn: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: 'red',
    margin: 10,
  },
});
