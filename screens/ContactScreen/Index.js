import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import * as React from 'react';
import contacts from '../../assets/data/contacts.json';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const ContactScreen = () => {
  const [filterWord, setFilterWord] = React.useState('');
  const [filteredContacts, setFilteredContacts] = React.useState(contacts);

  React.useEffect(() => {
    const newContacts = contacts.filter(contact =>
      contact.user_display_name
        .toLowerCase()
        .includes(filterWord.toLowerCase()),
    );
    setFilteredContacts(newContacts);
  }, [filterWord]);

  const navigation = useNavigation();
  const callUser = user => {
    navigation.navigate('Calling', {user});
  };
  return (
    <View style={styles.page}>
      <TextInput
        value={filterWord}
        onChangeText={setFilterWord}
        placeholder="Search..."
        style={styles.searchInput}
      />
      <FlatList
        data={filteredContacts}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => callUser(item)}>
            <Text style={styles.contactName}>{item.user_display_name}</Text>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    marginVertical: 10,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#edf5ef',
  },
  searchInput: {
    backgroundColor: '#b1b5b2',
    padding: 10,
    borderRadius: 15,
    fontSize: 12,
    color: '#f0faf2',
  },
});

export default ContactScreen;
