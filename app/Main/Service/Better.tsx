import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

export default function Better() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Better Sleep</Text>
      </View>

      <Image
        source={require('../../../assets/ImgForScreen/welcome.jpg')} // Replace with an appropriate image
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.description}>
          Discover techniques and tips to improve your sleep quality and wake up feeling refreshed. Follow these steps to create a restful sleep environment and bedtime routine.
        </Text>

        <Text style={styles.instruction}>
          Sleep Tips:
        </Text>

        {/* Example tips */}
        <View style={styles.tipContainer}>
          <Text style={styles.tip}>1. Establish a regular sleep schedule.</Text>
          <Text style={styles.tip}>2. Create a relaxing bedtime routine.</Text>
          <Text style={styles.tip}>3. Keep your bedroom cool, dark, and quiet.</Text>
          <Text style={styles.tip}>4. Avoid screens before bedtime.</Text>
          <Text style={styles.tip}>5. Limit caffeine and heavy meals before sleep.</Text>
        </View>

        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Start Sleep Routine</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e3f2fd', // Light blue background for calmness
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003f5c', // Darker blue color for the title
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
    color: '#003f5c', // Darker blue color for text
    marginBottom: 15,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bb2', // Medium blue color for instructions
    marginBottom: 15,
    textAlign: 'center',
  },
  tipContainer: {
    marginBottom: 20,
  },
  tip: {
    fontSize: 16,
    color: '#003f5c', // Darker blue color for tips
    marginVertical: 5,
  },
  startButton: {
    backgroundColor: '#007bb2', // Medium blue color for start button
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
