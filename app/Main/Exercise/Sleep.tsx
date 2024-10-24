import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, TextInput, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SleepExercise() {
  const router = useRouter();
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, title: 'Dim lights 1 hour before bed', completed: false },
    { id: 2, title: 'Do light stretching', completed: false },
    { id: 3, title: "Write tomorrow's tasks", completed: false },
    { id: 4, title: 'Practice deep breathing', completed: false },
    { id: 5, title: 'Avoid screens', completed: false },
    { id: 6, title: 'Use white noise if needed', completed: false },
  ]);

  const [notes, setNotes] = useState('');
  const [sleepTime, setSleepTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');

  const toggleItem = (id) => {
    setChecklistItems(checklistItems.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const calculateProgress = () => {
    const completed = checklistItems.filter(item => item.completed).length;
    return (completed / checklistItems.length) * 100;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1A237E" />
        </TouchableOpacity>

        <View style={styles.header}>
          <MaterialIcons name="bedtime" size={40} color="#3F51B5" />
          <Text style={styles.title}>Sleep Preparation</Text>
          <Text style={styles.subtitle}>
            Evening routine to improve sleep quality
          </Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${calculateProgress()}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {Math.round(calculateProgress())}% Complete
          </Text>
        </View>

        <View style={styles.timingCard}>
          <Text style={styles.cardTitle}>Set Sleep Schedule</Text>
          
          <View style={styles.timeInputContainer}>
            <View style={styles.timeInput}>
              <Text style={styles.timeLabel}>Bedtime</Text>
              <TextInput
                style={styles.timeTextInput}
                placeholder="10:30 PM"
                value={sleepTime}
                onChangeText={setSleepTime}
              />
            </View>
            
            <View style={styles.timeInput}>
              <Text style={styles.timeLabel}>Wake Time</Text>
              <TextInput
                style={styles.timeTextInput}
                placeholder="6:30 AM"
                value={wakeTime}
                onChangeText={setWakeTime}
              />
            </View>
          </View>
        </View>

        <View style={styles.checklistCard}>
          <Text style={styles.cardTitle}>Evening Routine Checklist</Text>
          
          {checklistItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.checklistItem}
              onPress={() => toggleItem(item.id)}
            >
              <View style={styles.checklistItemContent}>
                <MaterialIcons
                  name={item.completed ? 'check-circle' : 'radio-button-unchecked'}
                  size={24}
                  color={item.completed ? '#3F51B5' : '#666'}
                />
                <Text style={[
                  styles.checklistItemText,
                  item.completed && styles.completedText
                ]}>
                  {item.title}
                </Text>
              </View>
              <Switch
                value={item.completed}
                onValueChange={() => toggleItem(item.id)}
                trackColor={{ false: '#D1D1D1', true: '#9FA8DA' }}
                thumbColor={item.completed ? '#3F51B5' : '#f4f3f4'}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.notesCard}>
          <Text style={styles.cardTitle}>Sleep Journal</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Record any thoughts or concerns before bed..."
            multiline
            value={notes}
            onChangeText={setNotes}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <MaterialIcons name="check" size={24} color="white" />
          <Text style={styles.saveButtonText}>Save Sleep Log</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
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
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E8EAF6',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3F51B5',
    borderRadius: 4,
  },
  progressText: {
    color: '#666',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  timingCard: {
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A237E',
    marginBottom: 16,
  },
  timeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  timeLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  timeTextInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
  },
  checklistCard: {
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
  checklistItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  checklistItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checklistItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  completedText: {
    color: '#666',
    textDecorationLine: 'line-through',
  },
  notesCard: {
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
  notesInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#3F51B5',
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