import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';


export default function SignIn({ onSignIn }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSaveUser = () => {
    if (!name || !address) return Alert.alert('Error', 'Enter both name and address');
    onSignIn({ name, address });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Tindi</Text>
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Your Address"
        value={address}
        onChangeText={setAddress}
      />
      <Pressable style={styles.button} onPress={handleSaveUser}>
        <Text style={styles.buttonText}>Save & Continue</Text>
      </Pressable>
    </View>
  );
}

// Add your styles here