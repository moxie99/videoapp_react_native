import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

const LoginScreen = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const signIn = () => {};
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
    backgroundColor: 'lightBlue',
    marginVertical: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
});
