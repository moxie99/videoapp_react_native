import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import * as React from 'react';
import contacts from '../../assets/data/contacts.json';
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
          <Text style={styles.contactName}>{item.user_display_name}</Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
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
    padding: 20,
    borderRadius: 15,
    fontSize: 12,
    color: '#f0faf2',
  },
});

export default ContactScreen;
