import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Voximplant} from 'react-native-voximplant';
import {APP_NAME, ACC_NAME} from '../../Constants/';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const voximplant = Voximplant.getInstance();
  const navigation = useNavigation();

  useEffect(() => {
    const connect = async () => {
      const status = await voximplant.getClientState();

      if (status === Voximplant.ClientState.DISCONNECTED) {
        await voximplant.connect();
      } else if (status === Voximplant.ClientState.LOGGED_IN) {
        redirectHome();
      }
    };
    connect();
  }, []);

  const signIn = async () => {
    try {
      const qualifiedUserName = `${userName}@${APP_NAME}.${ACC_NAME}.voximplant.com`;
      await voximplant.login(qualifiedUserName, password);
      redirectHome();
    } catch (error) {
      console.log(error);
      Alert.alert(error.name, `Error code: ${error.code}`);
    }
  };

  const redirectHome = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Contacts',
        },
      ],
    });
  };

  return (
    <View style={styles.page}>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={userName}
        onChangeText={setUserName}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  page: {
    padding: 10,
    alignItems: 'stretch',
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: 'forestgreen',
    marginVertical: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
});
