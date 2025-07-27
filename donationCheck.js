import React, { useState } from 'react';
import { View, Text, Pressable, Alert } from 'react-native-web'; // Note: react-native-web
import styles from '../../utils/styles';
import { CHECKLIST_ITEMS, PICKUP_OPTIONS } from '../../utils/constants';

export default function Checklist({ onSubmit }) {
  // Track all checklist states
  const [checks, setChecks] = useState(
    CHECKLIST_ITEMS.reduce((acc, item) => ({ ...acc, [item.key]: false }), {})
  );
  
  const [pickupMethod, setPickupMethod] = useState(null);

  // Handle submission
  const handleSubmit = () => {
    const allChecked = Object.values(checks).every(Boolean);
    
    if (!allChecked) {
      Alert.alert('Complete all food safety checks');
      return;
    }
    if (!pickupMethod) {
      Alert.alert('Select a pickup method');
      return;
    }
    
    onSubmit({
      foodSafety: checks,
      pickupMethod
    });
  };

  return (
    <View style={styles.container}>
      {/* FOOD SAFETY SECTION */}
      <Text style={styles.sectionTitle}>Food Safety Checklist</Text>
      
      {CHECKLIST_ITEMS.map(item => (
        <label key={item.key} style={styles.checkItem}>
          <input
            type="checkbox"
            checked={checks[item.key]}
            onChange={() => setChecks(prev => ({
              ...prev,
              [item.key]: !prev[item.key]
            }))}
            style={styles.checkboxInput}
          />
          <Text style={styles.checkLabel}>{item.label}</Text>
        </label>
      ))}

      {/* PICKUP METHOD SECTION */}
      <Text style={styles.sectionTitle}>Collection Method</Text>
      
      {PICKUP_OPTIONS.map(option => (
        <label key={option.value} style={styles.pickupOption}>
          <input
            type="radio"
            name="pickupMethod"
            checked={pickupMethod === option.value}
            onChange={() => setPickupMethod(option.value)}
            style={styles.radioInput}
          />
          <Text style={styles.pickupLabel}>{option.label}</Text>
        </label>
      ))}

      {/* SUBMIT BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={!Object.values(checks).every(Boolean) || !pickupMethod}
        style={{
          ...styles.submitButton,
          opacity: Object.values(checks).every(Boolean) && pickupMethod ? 1 : 0.6
        }}
      >
        Submit Donation
      </button>
    </View>
  );
}
