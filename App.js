// import { Text, View, StyleSheet, Button, Alert, Pressable } from 'react-native';
// import { useState } from 'react';
// import Checkbox from 'expo-checkbox';

// const CHECKLIST_ITEMS = [
//   { key: 'fresh', label: 'The food was made or bought today.' },
//   { key: 'stored', label: 'It has been stored hygienically.' },
//   { key: 'untouched', label: 'It hasn’t been previously served.' },
//   { key: 'notSpoiled', label: 'There are no signs of spoilage.' },
//   { key: 'decentPortion', label: 'It’s a reasonably sized portion of food.' },
// ];

// export default function App() {
//   const [showChecklist, setShowChecklist] = useState(false);
//   const [checks, setChecks] = useState(
//     CHECKLIST_ITEMS.reduce((acc, item) => ({ ...acc, [item.key]: false }), {})
//   );
//   const [pickupMethod, setPickupMethod] = useState(null);

//   const allChecked = Object.values(checks).every(Boolean);

//   const handleDonate = () => {
//     setShowChecklist(true);
//   };

//   const handleSubmit = () => {
//     if (!pickupMethod) {
//       Alert.alert('Selection Required', 'Please select a pickup method before continuing.');
//       return;
//     }

//     Alert.alert('Thank you!', 'Your food donation request has been received.');
//     setShowChecklist(false);

//     // Reset state after successful submission
//     setChecks(CHECKLIST_ITEMS.reduce((acc, item) => ({ ...acc, [item.key]: false }), {}));
//     setPickupMethod(null);
//   };

//   const handleCheckChange = (key) => {
//     setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   // React Native CheckboxItem component
//   function CheckboxItem({ label, value, onChange }) {
//     return (
//       <View style={styles.checkboxContainer}>
//         <Checkbox
//           value={value}
//           onValueChange={onChange}
//           color={value ? styles.checkboxCheckedColor.color : undefined} 
//           style={styles.checkboxInput} // Apply scaling and border
//           accessibilityLabel={label}
//         />
//         <Text style={styles.checkboxLabel}>{label}</Text>
//       </View>
//     );
//   }

//   // React Native PickupOption (Radio Button) component
//   function PickupOption({ label, value, selected, onSelect }) {
//     return (
//       <Pressable onPress={() => onSelect(value)} style={styles.radioOption}>
//         <View style={styles.radioOuterCircle}>
//           {selected === value && <View style={styles.radioInnerCircle} />}
//         </View>
//         <Text style={styles.radioLabel}>{label}</Text>
//       </Pressable>
//     );
//   }

//   if (showChecklist) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.title}>Before you proceed:</Text>
//         <Text style={styles.subtextLarge}>
//           To ensure your food donation reaches someone safely and hygienically, please review the checklist below.
//         </Text>

//         <View style={styles.checkboxGroup}>
//           {CHECKLIST_ITEMS.map((item) => (
//             <CheckboxItem
//               key={item.key}
//               label={item.label}
//               value={checks[item.key]}
//               onChange={() => handleCheckChange(item.key)}
//             />
//           ))}
//         </View>

//         <Text style={styles.subtextLarge}>
//           The food will be picked up around. How would you like it to be collected?
//         </Text>
//         <PickupOption
//           label="I'll hand it over at my doorstep."
//           value="doorstep"
//           selected={pickupMethod}
//           onSelect={setPickupMethod}
//         />
//         <PickupOption
//           label="I'll leave it at the front gate."
//           value="gate"
//           selected={pickupMethod}
//           onSelect={setPickupMethod}
//         />

//         <Pressable
//           style={[
//             styles.continueButton,
//             { backgroundColor: allChecked ? styles.buttonColor.color : '#DCD6CE' },
//           ]}
//           disabled={!allChecked}
//           onPress={handleSubmit}
//         >
//           <Text style={styles.continueText}>Continue</Text>
//         </Pressable>
//       </View>
//     );
//   }

//   // Initial welcome screen
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tindi</Text>
//       <Text style={styles.tagline}>From your plate to someone’s day.</Text>

//       <View style={styles.buttonContainer}>
//         <Button title="Donate Food" onPress={handleDonate} color={styles.buttonColor.color} />
//       </View>
//     </View>
//   );
// }

// //sign in

// import { useState, useEffect } from "react";

// export default function App() {
//   const [name, setName] = useState("");
//   const [address, setAddress] = useState("");
//   const [userExists, setUserExists] = useState(false);

//   useEffect(() => {
//     const storedName = localStorage.getItem("name");
//     const storedAddress = localStorage.getItem("address");
//     if (storedName && storedAddress) {
//       setName(storedName);
//       setAddress(storedAddress);
//       setUserExists(true);
//     }
//   }, []);

//   const handleSaveUser = () => {
//     if (!name || !address) return alert("Enter both name and address");
//     localStorage.setItem("name", name);
//     localStorage.setItem("address", address);
//     setUserExists(true);
//   };

//   if (!userExists) {
//     return (
//       <div>
//         <h2>Welcome to Tindi</h2>
//         <input
//           type="text"
//           placeholder="Your Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Your Address"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />
//         <button onClick={handleSaveUser}>Save & Continue</button>
//       </div>
//     );
//   }

//   // Main donation UI
//   return (
//     <div>
//       <h2>Welcome back, {name}!</h2>
//       {/* Donation form goes here */}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SignIn from './signin';
import DonateScreen from './donationCheck';
import ProfileScreen from './profile';
import HistoryScreen from './donoHistory';
import { saveUser, getUser } from './storage';
import styles from './styles';

const Tab = createBottomTabNavigator();

function MainTabs({ user, updateUser }) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Donate" component={DonateScreen} />
      <Tab.Screen name="History">
        {() => <HistoryScreen userId={user.id} />}
      </Tab.Screen>
      <Tab.Screen name="Profile">
        {() => <ProfileScreen user={user} onUpdate={updateUser} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  console.log("App rendering - current user:", user); // Debug log

  useEffect(() => {
    const loadUser = async () => {
      try {
        const savedUser = await getUser();
        if (savedUser) setUser(savedUser);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };
    loadUser();
  }, []);

  const handleSignIn = (userData) => {
    const newUser = { ...userData, id: Date.now().toString() };
    saveUser(newUser);
    setUser(newUser);
  };

  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: '#FFFFF0' }]}>
        <SignIn onSignIn={handleSignIn} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <MainTabs user={user} updateUser={(data) => {
        const updatedUser = { ...user, ...data };
        saveUser(updatedUser);
        setUser(updatedUser);
      }} />
    </NavigationContainer>
  );
}