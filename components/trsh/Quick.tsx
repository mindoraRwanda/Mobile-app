import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SymptomData {
  moodLevel: number;
  symptomSeverity: number;
}

const EmergencyAssistanceScreen: React.FC = () => {
  const symptomData: SymptomData = {
    moodLevel: 3,          // Example data, replace with actual state
    symptomSeverity: 7,    // Example data, replace with actual state
  };

  // Function to handle emergency button press
  const handleEmergencyPress = () => {
    // Logic to display emergency contacts or make an emergency call
    Alert.alert('Emergency button pressed!', 'You can now make a call to emergency services.');
  };

  // Function to monitor symptoms and trigger alerts if necessary
  const monitorSymptoms = (data: SymptomData) => {
    if (data.moodLevel <= 2 || data.symptomSeverity >= 8) {
      Alert.alert(
        'Immediate Assistance Required',
        'We have detected severe symptoms. Please seek help immediately.',
        [
          { text: 'Call Hotline', onPress: () => callEmergencyHotline() },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    }
  };

  // Function to initiate a call to emergency hotline
  const callEmergencyHotline = () => {
    // Logic to initiate a phone call to the emergency hotline
    console.log('Calling emergency hotline...');
  };

  // UseEffect to monitor symptoms when symptom data changes
  useEffect(() => {
    monitorSymptoms(symptomData);
  }, [symptomData]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleEmergencyPress}>
        <Ionicons name="call" size={24} color="white" />
        <Text style={styles.buttonText}>Emergency</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#D9534F',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default EmergencyAssistanceScreen;
