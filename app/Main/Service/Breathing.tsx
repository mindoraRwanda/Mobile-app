import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

export default function Breathing() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Breathe Relax Revive</Text>
      </View>

      <Image
        source={require('../../../assets/ImgForScreen/Breathing.jpg')} // Replace with an appropriate image
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.description}>
          Welcome to the Breathing Exercise page. This section is designed to help you calm your mind and relax your body through guided breathing exercises.
        </Text>

        <Text style={styles.instruction}>
          Follow the exercises below to enhance your relaxation:
        </Text>

        {/* Example exercise buttons */}
        <TouchableOpacity style={styles.exerciseButton}>
          <Text style={styles.exerciseText}>Deep Breathing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exerciseButton}>
          <Text style={styles.exerciseText}>Box Breathing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exerciseButton}>
          <Text style={styles.exerciseText}>4-7-8 Breathing</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Start Breathing Exercise</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e0f2f1', // Light green background for relaxation
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#004d40', // Deep teal color for a calming effect
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
  },
  description: {
    fontSize: 16,
    color: '#004d40', // Deep teal color for text
    marginBottom: 15,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00796b', // Teal color for instructions
    marginBottom: 15,
    textAlign: 'center',
  },
  exerciseButton: {
    backgroundColor: '#004d40', // Deep teal color for buttons
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  exerciseText: {
    color: '#ffffff',
    fontSize: 16,
  },
  startButton: {
    backgroundColor: '#00796b', // Lighter teal color for start button
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
