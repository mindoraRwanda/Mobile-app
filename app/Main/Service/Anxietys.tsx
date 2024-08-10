import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Anxietys() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Anxiety Questionnaire</Text>
      </View>
      
      <View style={styles.content}>
        <Image
          source={require('../../../assets/ImgForScreen/med2.jpg')} // Replace with an appropriate image
          style={styles.image}
        />
        
        <Text style={styles.description}>
          The Anxiety Questionnaire helps assess your current anxiety levels. Please take your time to answer the following questions based on how you have been feeling lately.
        </Text>
        
        <Text style={styles.instruction}>
          Answer the questions below by selecting the option that best describes your feelings over the past two weeks:
        </Text>
        
        {/* Example questions */}
        <View style={styles.questions}>
          <Text style={styles.question}>1. I feel nervous or anxious:</Text>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>Not at all</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>Several days</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>More than half the days</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>Nearly every day</Text></TouchableOpacity>
          
          <Text style={styles.question}>2. I have trouble relaxing:</Text>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>Not at all</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>Several days</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>More than half the days</Text></TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}><Text style={styles.optionText}>Nearly every day</Text></TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit Answers</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#eaf2f8', // Light blue background for a calming effect
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A0887',
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
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
    color: '#4A0887',
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
    backgroundColor: '#4A0887',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#4A0887',
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
