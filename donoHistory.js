import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function HistoryScreen({ userId }) {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch from your backend
    const fetchDonations = async () => {
      try {
        const storedDonations = JSON.parse(localStorage.getItem('donations')) || [];
        setDonations(storedDonations.filter(d => d.userId === userId));
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDonations();
  }, [userId]);

  const renderDonation = ({ item }) => (
    <View style={styles.donationCard}>
      <Text style={styles.date}>{new Date(item.date).toLocaleDateString()}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Pickup: {item.pickupMethod}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Donations</Text>
      
      {loading ? (
        <Text>Loading...</Text>
      ) : donations.length === 0 ? (
        <Text>No donations yet</Text>
      ) : (
        <FlatList
          data={donations}
          renderItem={renderDonation}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
}