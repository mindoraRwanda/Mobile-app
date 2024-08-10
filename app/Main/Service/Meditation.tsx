import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

export default function Meditation() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meditate with Melody</Text>
      </View>

      <Image
        source={require('../../../assets/ImgForScreen/med3.jpg')} // Replace with an appropriate image
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.description}>
          Welcome to your meditation space. Here you can find guided meditations to help you relax and center yourself.
          Take a moment to breathe deeply and let go of any stress.
        </Text>

        <Text style={styles.instruction}>
          Choose a meditation exercise below to begin your journey:
        </Text>

        {/* Example exercise buttons */}
        <TouchableOpacity style={styles.exerciseButton}>
          <Text style={styles.exerciseText}>Guided Breathing</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exerciseButton}>
          <Text style={styles.exerciseText}>Mindfulness Meditation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exerciseButton}>
          <Text style={styles.exerciseText}>Body Scan Meditation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Start Meditation</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: 'white', 
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'purple', 
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
    color: '#004d40', 
    marginBottom: 15,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', 
    marginBottom: 15,
    textAlign: 'center',
  },
  exerciseButton: {
    backgroundColor: 'purple', 
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
    backgroundColor: 'purple', 
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
