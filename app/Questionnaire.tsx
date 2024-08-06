import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';

export default function Questionnaire() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alcohol Use Disorders Identification Test</Text>
      </View>
      
      <View style={styles.content}>
        <Image
          source={require('../assets/ImgForScreen/user.jpg')} // Replace with an appropriate image
          style={styles.image}
        />
        
        <Text style={styles.description}>
          This questionnaire helps identify whether you have signs of alcohol use disorders. Your responses will guide us in providing you with the appropriate support and resources.
        </Text>
        
        <Text style={styles.instruction}>
          Please answer the following questions based on your alcohol consumption over the past year:
        </Text>
        
        {/* Example questions */}
        <View style={styles.questions}>
          <Text style={styles.question}>1. How often do you have a drink containing alcohol?</Text>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>Never</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>Monthly or less</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>2-4 times a month</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>2-3 times a week</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>4 or more times a week</Text></TouchableOpacity>
          
          <Text style={styles.question}>2. How many standard drinks do you have on a typical day when drinking?</Text>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>1 or 2</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>3 or 4</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>5 or 6</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>7 or more</Text></TouchableOpacity>
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
    color: '#4A0887', // Calming purple shade
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
    color: '#4A0887', // Calming purple shade
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
    backgroundColor: '#4A0887', // Calming purple shade
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#4A0887', // Calming purple shade
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
