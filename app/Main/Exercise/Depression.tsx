import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Depression() {
  const router = useRouter();
  const [entries, setEntries] = useState(['', '', '']);
  const [reflections, setReflections] = useState(['', '', '']);
  const [feelings, setFeelings] = useState(['', '', '']);
  const [learnings, setLearnings] = useState(['', '', '']);

  const updateEntry = (index, text, type) => {
    switch(type) {
      case 'entry':
        setEntries(prev => {
          const newEntries = [...prev];
          newEntries[index] = text;
          return newEntries;
        });
        break;
      case 'reflection':
        setReflections(prev => {
          const newReflections = [...prev];
          newReflections[index] = text;
          return newReflections;
        });
        break;
      case 'feeling':
        setFeelings(prev => {
          const newFeelings = [...prev];
          newFeelings[index] = text;
          return newFeelings;
        });
        break;
      case 'learning':
        setLearnings(prev => {
          const newLearnings = [...prev];
          newLearnings[index] = text;
          return newLearnings;
        });
        break;
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1A237E" />
        </TouchableOpacity>

        <View style={styles.header}>
          <MaterialIcons name="favorite" size={40} color="#FF9800" />
          <Text style={styles.title}>Gratitude Practice</Text>
          <Text style={styles.subtitle}>
            Daily exercise to improve mood and combat depression
          </Text>
        </View>

        <View style={styles.instructionCard}>
          <MaterialIcons name="info-outline" size={24} color="#FF9800" />
          <Text style={styles.instructionText}>
            Take a moment to reflect on your day. Write down three positive things that happened,
            why they occurred, how they made you feel, and what you learned from them.
          </Text>
        </View>

        {[0, 1, 2].map((index) => (
          <View key={index} style={styles.entryCard}>
            <Text style={styles.entryHeader}>Gratitude Entry #{index + 1}</Text>
            
            <Text style={styles.label}>What good thing happened?</Text>
            <TextInput
              style={styles.input}
              value={entries[index]}
              onChangeText={(text) => updateEntry(index, text, 'entry')}
              placeholder="Enter a positive moment..."
              multiline
            />

            <Text style={styles.label}>Why did it happen?</Text>
            <TextInput
              style={styles.input}
              value={reflections[index]}
              onChangeText={(text) => updateEntry(index, text, 'reflection')}
              placeholder="Reflect on the causes..."
              multiline
            />

            <Text style={styles.label}>How did it make you feel?</Text>
            <TextInput
              style={styles.input}
              value={feelings[index]}
              onChangeText={(text) => updateEntry(index, text, 'feeling')}
              placeholder="Describe your emotions..."
              multiline
            />

            <Text style={styles.label}>What did you learn?</Text>
            <TextInput
              style={styles.input}
              value={learnings[index]}
              onChangeText={(text) => updateEntry(index, text, 'learning')}
              placeholder="Share your insights..."
              multiline
            />
          </View>
        ))}

        <TouchableOpacity style={styles.saveButton}>
          <MaterialIcons name="check" size={24} color="white" />
          <Text style={styles.saveButtonText}>Save Journal Entry</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A237E',
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  instructionCard: {
    backgroundColor: '#FFF3E0',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  instructionText: {
    flex: 1,
    marginLeft: 12,
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
  entryCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  entryHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A237E',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#FF9800',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});