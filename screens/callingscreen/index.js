import {
  StyleSheet,
  Text,
  View,
  Pressable,
  PermissionsAndroid,
  Alert,
  Platform,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Callactionbottombox from '../../components/callactionbottombox';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Voximplant} from 'react-native-voximplant';

const permissions = [
  PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  PermissionsAndroid.PERMISSIONS.CAMERA,
];

const CallingScreen = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [localVideoStreamId, setLocalVideoStreamId] = useState('');
  const [remoteVideoStreamId, setRemoteVideoStreamId] = useState('');
  const [callStatus, setCallStatus] = useState('Initializing...');
  const navigation = useNavigation();
  const route = useRoute();
  const {user, call: incomingCall, isIncomingCall} = route?.params;
  const goBack = () => {
    navigation.goBack();
  };

  const call = useRef(incomingCall);
  const endpoint = useRef(null);
  const voximplant = Voximplant.getInstance();

  useEffect(() => {
    const getPermissions = async () => {
      const granted = await PermissionsAndroid.requestMultiple(permissions);
      const recordAudioGranted =
        granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] === 'granted';
      const cameraGranted =
        granted[PermissionsAndroid.PERMISSIONS.CAMERA] === 'granted';

      if (!cameraGranted || !recordAudioGranted) {
        Alert.alert('Permissions not granted');
      } else {
        setPermissionGranted(true);
      }
    };

    if (Platform.OS === 'android') {
      getPermissions();
    } else {
      setPermissionGranted(true);
    }
  }, []);

  useEffect(() => {
    if (!permissionGranted) {
      return;
    }
    const callSettings = {
      video: {
        sendVideo: true,
        receiveVideo: true,
      },
    };

    // make call function
    const makeCall = async () => {
      call.current = await voximplant.call(user.user_name, callSettings);
      subscribeToCallEvents();
    };

    // answer call function
    const answerCall = () => {
      subscribeToCallEvents();
      endpoint.current = call.current.getEndpoints()[0];
      subscribeToEndpointEvent();
      call.current.answer(callSettings);
    };
    // subscribe
    const subscribeToCallEvents = () => {
      call.current.on(Voximplant.CallEvents.Failed, callEvent => {
        showError(callEvent.reason);
      });
      call.current.on(Voximplant.CallEvents.ProgressToneStart, callEvent => {
        setCallStatus('Calling...');
      });
      call.current.on(Voximplant.CallEvents.Connected, callEvent => {
        setCallStatus('Connected');
      });
      call.current.on(Voximplant.CallEvents.Disconnected, callEvent => {
        navigation.navigate('Contacts');
      });

      call.current.on(
        Voximplant.CallEvents.LocalVideoStreamAdded,
        callEvent => {
          setLocalVideoStreamId(callEvent.videoStream.id);
        },
      );
      call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
        endpoint.current = callEvent.endpoint;
        subscribeToEndpointEvent();
      });
    };
    const subscribeToEndpointEvent = async () => {
      endpoint.current.on(
        Voximplant.EndpointEvents.setRemoteVideoStreamAdded,
        endpointEvent => {
          setRemoteVideoStreamId(endpointEvent.videoStream.id);
        },
      );
    };
    const showError = reason => {
      Alert.alert('Call failed', `Reason: ${reason}`, [
        {
          text: 'Ok',
          onPress: () => {
            navigation.navigate('Contacts');
          },
        },
      ]);
    };
    if (isIncomingCall) {
      answerCall();
    } else {
      makeCall();
    }
    // unsubscribe
    return () => {
      call.current.off(Voximplant.CallEvents.Failed);
      call.current.on(Voximplant.CallEvents.ProgressToneStart);
      call.current.on(Voximplant.CallEvents.Connected);
      call.current.on(Voximplant.CallEvents.Disconnected);
    };
  }, [permissionGranted]);

  const onHangupPress = () => {
    call.current.hangup();
  };

  return (
    <View style={styles.page}>
      <Pressable onPress={goBack} style={styles.backBtn}>
        <Ionicons name="chevron-back" color={'white'} size={25} />
      </Pressable>

      <Voximplant.VideoView
        videoStreamId={remoteVideoStreamId}
        style={styles.remoteVideo}
      />
      <Voximplant.VideoView
        videoStreamId={localVideoStreamId}
        style={styles.localVideo}
      />
      <View style={styles.cameraPreview}>
        <Text style={styles.name}>{user?.user_display_name}</Text>
        <Text style={styles.phoneNumber}>{callStatus}</Text>
      </View>
      <Callactionbottombox onHangupPress={onHangupPress} />
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
  localVideo: {
    width: 150,
    height: 200,
    borderRadius: 50,
    backgroundColor: 'red',
    position: 'absolute',
    right: '5%',
    top: '15%',
  },
  remoteVideo: {
    borderRadius: 10,
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 100,
    top: 0,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 40,
    marginBottom: 20,
  },
  phoneNumber: {fontSize: 20, color: 'white', fontWeight: 'bold'},
  backBtn: {position: 'absolute', top: '5%', left: '3%', zIndex: 10},
});
