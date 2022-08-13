import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Callactionbottombox = () => {
  //set state for toggling microphone and camera
  const [isCameraOn, setIsCameraOn] = React.useState(true);
  const [isMicrophoneOn, setIsMicrophoneOn] = React.useState(false);
  const onReverseCamera = () => {
    Alert.alert('Reverse camera');
  };
  const onToggleCamera = () => {
    setIsCameraOn(!isCameraOn);
  };
  const onToggleMicrophone = () => {
    setIsMicrophoneOn(!isMicrophoneOn);
  };
  const onEndCall = () => {
    Alert.alert('End call');
  };
  return (
    <View style={styles.iconsContainers}>
      <TouchableOpacity onPress={onReverseCamera}>
        <View style={styles.iconButtons}>
          <Ionicons name="camera-reverse-outline" size={30} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onToggleCamera}>
        <View style={styles.iconButtons}>
          <MaterialIcons
            name={isCameraOn ? 'videocam' : 'videocam-off'}
            size={30}
            color="white"
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onToggleMicrophone}>
        <View style={styles.iconButtons}>
          <MaterialIcons
            name={isMicrophoneOn ? 'mic' : 'mic-off'}
            size={30}
            color="white"
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onEndCall}>
        <View style={[styles.iconButtons, {backgroundColor: 'red'}]}>
          <MaterialCommunityIcons name="phone-hangup" size={30} color="white" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Callactionbottombox;

const styles = StyleSheet.create({
  iconsContainers: {
    backgroundColor: '#282928',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 60,
    marginTop: 'auto',
  },
  iconButtons: {
    backgroundColor: '#a1a1a1',
    padding: 10,
    borderRadius: 15,
  },
});
