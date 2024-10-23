import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Stress() {
  const router = useRouter();
  const [currentExercise, setCurrentExercise] = useState(null);
  const [stressLevel, setStressLevel] = useState(5);
  const [notes, setNotes] = useState('');
  const animationValue = useRef(new Animated.Value(0)).current;

  const exercises = [
    {
      id: 1,
      title: 'Roll shoulders backward',
      duration: '30 seconds',
      instructions: [
        'Sit or stand with your back straight',
        'Slowly roll your shoulders backward',
        'Make complete circular motions',
        'Breathe deeply as you roll',
        'Repeat 10 times'
      ],
      icon: 'refresh'
    },
    {
      id: 2,
      title: 'Stretch neck gently',
      duration: '1 minute',
      instructions: [
        'Tilt head to right shoulder',
        'Hold for 10 seconds',
        'Return to center',
        'Repeat on left side',
        'Do 3 sets each side'
      ],
      icon: 'accessibility'
    },
    {
      id: 3,
      title: 'Clench and release fists',
      duration: '45 seconds',
      instructions: [
        'Make tight fists',
        'Hold for 5 seconds',
        'Release slowly',
        'Feel the tension leave',
        'Repeat 5 times'
      ],
      icon: 'front-hand'
    },
    {
      id: 4,
      title: 'Take 5 deep breaths',
      duration: '1 minute',
      instructions: [
        'Inhale for 4 counts',
        'Hold for 4 counts',
        'Exhale for 4 counts',
        'Wait for 4 counts',
        'Repeat 5 times'
      ],
      icon: 'air'
    },
    {
      id: 5,
      title: 'Shake out limbs',
      duration: '30 seconds',
      instructions: [
        'Shake hands vigorously',
        'Shake arms from shoulders',
        'Shake legs one at a time',
        'Shake feet while seated',
        'Repeat sequence twice'
      ],
      icon: 'vibration'
    },
    {
      id: 6,
      title: 'Progressive muscle relaxation',
      duration: '2 minutes',
      instructions: [
        'Start with your toes',
        'Tense muscles for 5 seconds',
        'Release and feel relaxation',
        'Move up to next muscle group',
        'Continue to head'
      ],
      icon: 'self-improvement'
    }
  ];

  const startExercise = (exercise) => {
    setCurrentExercise(exercise);
    Animated.sequence([
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  const closeExercise = () => {
    Animated.timing(animationValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setCurrentExercise(null));
  };

  const renderStressLevel = () => {
    const levels = [
      { value: 1, label: 'Very Low' },
      { value: 2, label: 'Low' },
      { value: 3, label: 'Moderate' },
      { value: 4, label: 'High' },
      { value: 5, label: 'Very High' }
    ];

    return (
      <View style={styles.stressLevelContainer}>
        {levels.map((level) => (
          <TouchableOpacity
            key={level.value}
            style={[
              styles.stressLevelButton,
              stressLevel === level.value && styles.selectedStressLevel
            ]}
            onPress={() => setStressLevel(level.value)}
          >
            <Text style={[
              styles.stressLevelText,
              stressLevel === level.value && styles.selectedStressLevelText
            ]}>
              {level.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
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
          <MaterialIcons name="spa" size={40} color="#E91E63" />
          <Text style={styles.title}>Stress Release</Text>
          <Text style={styles.subtitle}>
            Quick exercises to release physical stress
          </Text>
        </View>

        <View style={styles.stressCard}>
          <Text style={styles.cardTitle}>Current Stress Level</Text>
          {renderStressLevel()}
        </View>

        <View style={styles.exercisesContainer}>
          {exercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={styles.exerciseCard}
              onPress={() => startExercise(exercise)}
            >
              <MaterialIcons name={exercise.icon} size={24} color="#E91E63" />
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                <Text style={styles.exerciseDuration}>{exercise.duration}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.notesCard}>
          <Text style={styles.cardTitle}>Stress Journal</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="How are you feeling? What triggered your stress?"
            multiline
            value={notes}
            onChangeText={setNotes}
            textAlignVertical="top"
          />
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <MaterialIcons name="check" size={24} color="white" />
          <Text style={styles.saveButtonText}>Save Session</Text>
        </TouchableOpacity>
      </ScrollView>

      {currentExercise && (
        <Animated.View 
          style={[
            styles.modal,
            {
              opacity: animationValue,
              transform: [{
                scale: animationValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1]
                })
              }]
            }
          ]}
        >
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={closeExercise}
            >
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>

            <MaterialIcons name={currentExercise.icon} size={48} color="#E91E63" />
            <Text style={styles.modalTitle}>{currentExercise.title}</Text>
            <Text style={styles.modalDuration}>{currentExercise.duration}</Text>

            <View style={styles.instructionsList}>
              {currentExercise.instructions.map((instruction, index) => (
                <View key={index} style={styles.instructionItem}>
                  <MaterialIcons name="check-circle" size={20} color="#E91E63" />
                  <Text style={styles.instructionText}>{instruction}</Text>
                </View>
              ))}
            </View>
          </View>
        </Animated.View>
      )}
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
  stressCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
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
  stressLevelContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  stressLevelButton: {
    flex: 1,
    minWidth: '18%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F5F6FA',
    alignItems: 'center',
  },
  selectedStressLevel: {
    backgroundColor: '#E91E63',
  },
  stressLevelText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  selectedStressLevelText: {
    color: 'white',
    fontWeight: '500',
  },
  exercisesContainer: {
    marginBottom: 24,
  },
  exerciseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  exerciseInfo: {
    flex: 1,
    marginLeft: 16,
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  exerciseDuration: {
    fontSize: 14,
    color: '#666',
  },
  notesCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
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
    backgroundColor: '#E91E63',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  modalDuration: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  instructionsList: {
    width: '100%',
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
});