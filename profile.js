import { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function ProfileScreen({ user, onUpdate }) {
  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const getCurrentLocation = async () => {
    setLoadingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const [place] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      setAddress(`${place.street}, ${place.city}, ${place.region}`);
    } catch (error) {
      Alert.alert('Error getting location', error.message);
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleSave = () => {
    if (!name || !address) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    onUpdate({ name, address });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Profile</Text>
      
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
        multiline
      />
      
      <Pressable 
        style={styles.locationButton} 
        onPress={getCurrentLocation}
        disabled={loadingLocation}
      >
        <Text style={styles.buttonText}>
          {loadingLocation ? 'Getting Location...' : 'Use Current Location'}
        </Text>
      </Pressable>
      
      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </Pressable>
    </View>
  );
}