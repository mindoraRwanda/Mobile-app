import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';

export default function Anxiety() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Anxiety Management</Text>
      </View>

      <Image
        source={require('../assets/ImgForScreen/EUC.jpg')} // Replace with an appropriate image
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.description}>
          Anxiety is a common experience that can affect anyone. It's important to have strategies to manage and cope with anxiety. Here are some helpful techniques and resources to support you in managing your anxiety.
        </Text>

        <Text style={styles.instruction}>
          Techniques for Managing Anxiety:
        </Text>

        {/* Example techniques */}
        <View style={styles.techniquesContainer}>
          <Text style={styles.technique}>1. Practice deep breathing exercises.</Text>
          <Text style={styles.technique}>2. Engage in regular physical activity.</Text>
          <Text style={styles.technique}>3. Maintain a healthy sleep schedule.</Text>
          <Text style={styles.technique}>4. Practice mindfulness and meditation.</Text>
          <Text style={styles.technique}>5. Reach out for professional support if needed.</Text>
        </View>

        <TouchableOpacity style={styles.startButton}>
          <Text style={styles.startButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f8ff', // Light blue background for a calming effect
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003f5c', // Dark blue for title
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
    color: '#003f5c', // Dark blue for text
    marginBottom: 15,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bb2', // Medium blue for instructions
    marginBottom: 15,
    textAlign: 'center',
  },
  techniquesContainer: {
    marginBottom: 20,
  },
  technique: {
    fontSize: 16,
    color: '#003f5c', // Dark blue for techniques
    marginVertical: 5,
  },
  startButton: {
    backgroundColor: '#007bb2', // Medium blue for start button
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
