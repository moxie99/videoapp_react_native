import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Callactionbottombox from '../../components/callactionbottombox';
import {useNavigation, useRoute} from '@react-navigation/native';

const CallingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = route?.params?.user;
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.page}>
      <Pressable onPress={goBack} style={styles.backBtn}>
        <Ionicons name="chevron-back" color={'white'} size={25} />
      </Pressable>
      <View style={styles.cameraPreview}>
        <Text style={styles.name}>{user?.user_display_name}</Text>
        <Text style={styles.phoneNumber}>ringing .... +23470...</Text>
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
  backBtn: {position: 'absolute', top: '5%', left: '3%', zIndex: 10},
});
