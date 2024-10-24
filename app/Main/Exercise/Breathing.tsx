import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const breathingExercises = [
  {
    id: '1',
    title: '4-7-8 Breathing',
    description: 'Calming breath for anxiety and sleep',
    inhale: 4,
    hold: 7,
    exhale: 8,
    color: '#4CAF50',
  },
  {
    id: '2',
    title: 'Box Breathing',
    description: 'Equal breathing for focus and stress relief',
    inhale: 4,
    hold: 4,
    exhale: 4,
    color: '#2196F3',
  },
  {
    id: '3',
    title: 'Deep Belly Breathing',
    description: 'Relaxing diaphragmatic breathing',
    inhale: 5,
    hold: 2,
    exhale: 5,
    color: '#9C27B0',
  },
];

export default function Breathing() {
  const router = useRouter();
  const [selectedExercise, setSelectedExercise] = useState(breathingExercises[0]);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('ready');
  const [remainingTime, setRemainingTime] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);

  const breathAnimation = useRef(new Animated.Value(1)).current;
  const progressAnimation = useRef(new Animated.Value(0)).current;

  const animateBreathing = (phase, duration) => {
    const toValue = phase === 'inhale' ? 1.3 : 1;
    Animated.timing(breathAnimation, {
      toValue,
      duration: duration * 1000,
      useNativeDriver: true,
    }).start();
  };

  const startExercise = () => {
    setIsActive(true);
    setCurrentPhase('inhale');
    setRemainingTime(selectedExercise.inhale);
    setCompletedCycles(0);
  };

  const stopExercise = () => {
    setIsActive(false);
    setCurrentPhase('ready');
    setRemainingTime(0);
    breathAnimation.setValue(1);
    progressAnimation.setValue(0);
  };

  useEffect(() => {
    let interval;
    if (isActive) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            switch (currentPhase) {
              case 'inhale':
                setCurrentPhase('hold');
                animateBreathing('hold', selectedExercise.hold);
                return selectedExercise.hold;
              case 'hold':
                setCurrentPhase('exhale');
                animateBreathing('exhale', selectedExercise.exhale);
                return selectedExercise.exhale;
              case 'exhale':
                setCurrentPhase('inhale');
                animateBreathing('inhale', selectedExercise.inhale);
                setCompletedCycles((prev) => prev + 1);
                return selectedExercise.inhale;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, currentPhase, selectedExercise]);

  const renderPhaseMessage = () => {
    switch (currentPhase) {
      case 'ready':
        return 'Press start to begin';
      case 'inhale':
        return 'Breathe in...';
      case 'hold':
        return 'Hold...';
      case 'exhale':
        return 'Breathe out...';
      default:
        return '';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Breathing Exercises</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.exerciseSelector}>
        {breathingExercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={[
              styles.exerciseCard,
              selectedExercise.id === exercise.id && styles.selectedExerciseCard,
              { borderColor: exercise.color },
            ]}
            onPress={() => setSelectedExercise(exercise)}
          >
            <Text style={styles.exerciseTitle}>{exercise.title}</Text>
            <Text style={styles.exerciseDescription}>{exercise.description}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.breathingContainer}>
        <Animated.View
          style={[
            styles.breathCircle,
            {
              transform: [{ scale: breathAnimation }],
              backgroundColor: selectedExercise.color,
            },
          ]}
        />
        <View style={styles.statsContainer}>
          <Text style={styles.phaseText}>{renderPhaseMessage()}</Text>
          <Text style={styles.timerText}>{remainingTime}</Text>
          <Text style={styles.cyclesText}>Cycles: {completedCycles}</Text>
        </View>
      </View>

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionTitle}>Instructions:</Text>
        <Text style={styles.instructionText}>
          • Inhale for {selectedExercise.inhale} seconds{'\n'}
          • Hold for {selectedExercise.hold} seconds{'\n'}
          • Exhale for {selectedExercise.exhale} seconds
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.startButton, { backgroundColor: selectedExercise.color }]}
        onPress={isActive ? stopExercise : startExercise}
      >
        <Text style={styles.startButtonText}>
          {isActive ? 'Stop' : 'Start'} Exercise
        </Text>
      </TouchableOpacity>
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
  exerciseSelector: {
    padding: 16,
  },
  exerciseCard: {
    width: width * 0.7,
    padding: 16,
    marginRight: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  selectedExerciseCard: {
    transform: [{ scale: 1.02 }],
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#666',
  },
  breathingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
  },
  breathCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    opacity: 0.9,
  },
  statsContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  phaseText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  cyclesText: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  instructionsContainer: {
    padding: 16,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
  },
  instructionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  instructionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  startButton: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});