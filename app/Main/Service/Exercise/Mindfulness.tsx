import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  SafeAreaView,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const mindfulnessExercises = [
  {
    id: '1',
    title: 'Body Scan',
    duration: 300, // 5 minutes in seconds
    color: '#4CAF50',
    icon: 'accessibility',
    steps: [
      'Start with your toes, notice any sensations',
      'Move to your feet and ankles',
      'Progress to your legs',
      'Notice your hips and lower back',
      'Feel your stomach and chest',
      'Focus on your shoulders and arms',
      'Move to your neck and throat',
      'Finally, scan your face and head',
    ],
  },
  {
    id: '2',
    title: 'Mindful Walking',
    duration: 180, // 3 minutes
    color: '#2196F3',
    icon: 'directions-walk',
    steps: [
      'Stand still and become aware of your body',
      'Start walking slowly and deliberately',
      'Notice how your feet feel',
      'Feel the movement of your legs',
      'Be aware of your whole body moving',
      'Notice any thoughts without judgment',
    ],
  },
  {
    id: '3',
    title: 'Five Senses',
    duration: 240, // 4 minutes
    color: '#9C27B0',
    icon: 'visibility',
    steps: [
      'Notice 5 things you can see',
      'Focus on 4 things you can touch',
      'Listen for 3 distinct sounds',
      'Identify 2 things you can smell',
      'Become aware of 1 taste',
    ],
  },
  {
    id: '4',
    title: 'Mindful Listening',
    duration: 180, // 3 minutes
    color: '#FF9800',
    icon: 'hearing',
    steps: [
      'Close your eyes',
      'Notice the furthest sounds',
      'Focus on closer sounds',
      'Listen to sounds in your body',
      'Notice the quality of silence',
    ],
  },
];

export default function Mindfulness() {
  const router = useRouter();
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startSession = (exercise) => {
    setSelectedExercise(exercise);
    setIsSessionActive(true);
    setRemainingTime(exercise.duration);
    setCurrentStep(0);
  };

  const endSession = () => {
    setIsSessionActive(false);
    setSelectedExercise(null);
    setCurrentStep(0);
    setRemainingTime(0);
  };

  const nextStep = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    if (currentStep < selectedExercise.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  useEffect(() => {
    let interval;
    if (isSessionActive && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            endSession();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSessionActive, remainingTime]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mindfulness Exercises</Text>
      </View>

      {!isSessionActive ? (
        <ScrollView style={styles.exerciseList}>
          {mindfulnessExercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={[styles.exerciseCard, { borderLeftColor: exercise.color }]}
              onPress={() => startSession(exercise)}
            >
              <View style={[styles.iconContainer, { backgroundColor: exercise.color }]}>
                <MaterialIcons name={exercise.icon} size={32} color="white" />
              </View>
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                <Text style={styles.exerciseDuration}>
                  Duration: {formatTime(exercise.duration)}
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={styles.sessionContainer}>
          <View style={[styles.timerContainer, { borderColor: selectedExercise.color }]}>
            <Text style={[styles.timerText, { color: selectedExercise.color }]}>
              {formatTime(remainingTime)}
            </Text>
          </View>

          <Animated.View style={[styles.instructionContainer, { opacity: fadeAnim }]}>
            <Text style={styles.instructionStep}>
              Step {currentStep + 1}/{selectedExercise.steps.length}
            </Text>
            <Text style={styles.instructionText}>
              {selectedExercise.steps[currentStep]}
            </Text>
          </Animated.View>

          <View style={styles.controlsContainer}>
            <TouchableOpacity
              style={[styles.controlButton, { backgroundColor: selectedExercise.color }]}
              onPress={nextStep}
            >
              <Text style={styles.controlButtonText}>Next Step</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, styles.endButton]}
              onPress={endSession}
            >
              <Text style={[styles.controlButtonText, { color: '#FF5252' }]}>End Session</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#333',
  },
  exerciseList: {
    flex: 1,
    padding: 16,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  exerciseDuration: {
    fontSize: 14,
    color: '#666',
  },
  sessionContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timerContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  instructionContainer: {
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  instructionStep: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  controlsContainer: {
    width: '100%',
    padding: 16,
  },
  controlButton: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  endButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#FF5252',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});