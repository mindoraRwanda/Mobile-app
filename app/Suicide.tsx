import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Suicide() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Suicide Behaviors Questionnaire</Text>
      </View>
      
      <View style={styles.content}>
        <Image
          source={require('../assets/ImgForScreen/med3.jpg')} // Replace with an appropriate image
          style={styles.image}
        />
        
        <Text style={styles.description}>
          This questionnaire is designed to help identify thoughts and behaviors related to suicide. Your responses are confidential and will help us understand and support your mental health needs.
        </Text>
        
        <Text style={styles.instruction}>
          Please answer the following questions based on how you have been feeling over the past month:
        </Text>
        
        {/* Example questions */}
        <View style={styles.questions}>
          <Text style={styles.question}>1. Have you had thoughts about suicide?</Text>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>Not at all</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>A few days</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>More than half the days</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>Nearly every day</Text></TouchableOpacity>
          
          <Text style={styles.question}>2. Have you made any plans to harm yourself?</Text>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>Not at all</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>A few days</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>More than half the days</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>Nearly every day</Text></TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit Responses</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f1f1f1', // Light grey background for a neutral tone
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5B2A8A', // A calming purple shade
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  instruction: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5B2A8A', // A calming purple shade
    marginBottom: 15,
  },
  questions: {
    marginBottom: 20,
  },
  question: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  optionButton: {
    backgroundColor: '#5B2A8A', // A calming purple shade
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#5B2A8A', // A calming purple shade
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
