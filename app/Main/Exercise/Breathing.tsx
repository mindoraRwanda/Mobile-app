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
  Platform,
  Vibration,
} from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';

const { width, height } = Dimensions.get('window');

const breathingExercises = [
  {
    id: '1',
    title: '4-7-8 Breathing',
    description: 'Calming breath for anxiety and sleep',
    inhale: 4,
    hold: 7,
    exhale: 8,
    colors: ['#4A0887', '#6C0BA9', '#8E44AD'],
    icon: 'moon',
  },
  {
    id: '2',
    title: 'Box Breathing',
    description: 'Equal breathing for focus and stress relief',
    inhale: 4,
    hold: 4,
    exhale: 4,
    colors: ['#4A0887', '#7B1FA2', '#9C27B0'],
    icon: 'box',
  },
  {
    id: '3',
    title: 'Deep Belly',
    description: 'Relaxing diaphragmatic breathing',
    inhale: 5,
    hold: 2,
    exhale: 5,
    colors: ['#4A0887', '#5E35B1', '#673AB7'],
    icon: 'wind',
  },
];

export default function Breathing() {
  const router = useRouter();
  const [selectedExercise, setSelectedExercise] = useState(breathingExercises[0]);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState('ready');
  const [remainingTime, setRemainingTime] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [totalCycles, setTotalCycles] = useState(5);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [showGuide, setShowGuide] = useState(true);

  const breathAnimation = useRef(new Animated.Value(0)).current;
  const backgroundAnimation = useRef(new Animated.Value(0)).current;
  const circleRotation = useRef(new Animated.Value(0)).current;

  const phaseDurations = {
    inhale: selectedExercise.inhale,
    hold: selectedExercise.hold,
    exhale: selectedExercise.exhale,
  };

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../../assets/sounds/breathing.mp3')
      );
      setSound(sound);
      await sound.playAsync();
      Vibration.vibrate(200);
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const animateBreathing = (phase: 'inhale' | 'hold' | 'exhale') => {
    const duration = phaseDurations[phase] * 1000;

    Animated.parallel([
      Animated.timing(breathAnimation, {
        toValue: phase === 'inhale' ? 1 : 0.5,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(backgroundAnimation, {
        toValue: phase === 'inhale' ? 0 : phase === 'hold' ? 0.5 : 1,
        duration,
        useNativeDriver: false,
      }),
      Animated.timing(circleRotation, {
        toValue: phase === 'inhale' ? 1 : phase === 'hold' ? 0 : -1,
        duration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const startExercise = () => {
    setIsActive(true);
    setCurrentPhase('inhale');
    setRemainingTime(selectedExercise.inhale);
    setCompletedCycles(0);
    setShowGuide(false);
    animateBreathing('inhale');
    playSound();
  };

  const stopExercise = () => {
    setIsActive(false);
    setCurrentPhase('ready');
    setRemainingTime(0);
    setCompletedCycles(0);
    setShowGuide(true);
    breathAnimation.setValue(0);
    backgroundAnimation.setValue(0);
    circleRotation.setValue(0);
    if (sound) {
      sound.unloadAsync();
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      if (remainingTime > 0) {
        interval = setInterval(() => {
          setRemainingTime((prevTime) => prevTime - 1);
        }, 1000);
      } else {
        if (currentPhase === 'exhale') {
          if (completedCycles + 1 >= totalCycles) {
            stopExercise();
            return;
          } else {
            setCompletedCycles((prev) => prev + 1);
            setCurrentPhase('inhale');
            setRemainingTime(selectedExercise.inhale);
            animateBreathing('inhale');
            playSound();
          }
        } else if (currentPhase === 'inhale') {
          setCurrentPhase('hold');
          setRemainingTime(selectedExercise.hold);
          animateBreathing('hold');
          playSound();
        } else if (currentPhase === 'hold') {
          setCurrentPhase('exhale');
          setRemainingTime(selectedExercise.exhale);
          animateBreathing('exhale');
          playSound();
        }
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, currentPhase, remainingTime]);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const spin = circleRotation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-120deg', '0deg', '120deg'],
  });

  const renderPhaseMessage = () => {
    switch (currentPhase) {
      case 'ready':
        return 'Ready to Begin';
      case 'inhale':
        return 'Inhale';
      case 'hold':
        return 'Hold';
      case 'exhale':
        return 'Exhale';
      default:
        return '';
    }
  };

  const backgroundColor = backgroundAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: selectedExercise.colors,
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Breathe & Relax</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.exerciseSelector}
          contentContainerStyle={styles.exerciseSelectorContent}
        >
          {breathingExercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={[
                styles.exerciseCard,
                selectedExercise.id === exercise.id && styles.selectedExerciseCard,
              ]}
              onPress={() => {
                if (!isActive) {
                  setSelectedExercise(exercise);
                }
              }}
              disabled={isActive}
            >
              <LinearGradient
                colors={exercise.colors}
                style={styles.cardGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Feather name={exercise.icon} size={32} color="#fff" style={styles.exerciseIcon} />
                <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                <Text style={styles.exerciseDescription}>{exercise.description}</Text>
                <View style={styles.timingContainer}>
                  <Text style={styles.timingText}>
                    {exercise.inhale}-{exercise.hold}-{exercise.exhale}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.breathingContainer}>
          <Animated.View
            style={[
              styles.breathCircle,
              {
                transform: [
                  {
                    scale: breathAnimation.interpolate({
                      inputRange: [0.5, 1],
                      outputRange: [0.8, 1],
                    }),
                  },
                  { rotate: spin },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
              style={styles.circleGradient}
            >
              <Text style={styles.phaseText}>{renderPhaseMessage()}</Text>
              <Text style={styles.timerText}>{remainingTime}</Text>
              {isActive && (
                <Text style={styles.cyclesText}>
                  Cycle {completedCycles + 1} of {totalCycles}
                </Text>
              )}
            </LinearGradient>
          </Animated.View>
          
          {showGuide && (
            <View style={styles.guideContainer}>
              <Text style={styles.guideText}>
                Find a comfortable position and tap Start when you're ready
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.startButton, isActive && styles.stopButton]}
          onPress={isActive ? stopExercise : startExercise}
        >
          <Text style={styles.startButtonText}>
            {isActive ? 'Stop Exercise' : 'Start Exercise'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 24 : 0,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '800',
    marginLeft: 16,
    color: '#fff',
  },
  exerciseSelector: {
    paddingVertical: 8,
  },
  exerciseSelectorContent: {
    paddingHorizontal: 16,
  },
  exerciseCard: {
    width: width * 0.7,
    height: 160,
    marginRight: 16,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedExerciseCard: {
    borderWidth: 3,
    borderColor: '#fff',
  },
  cardGradient: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  exerciseIcon: {
    marginBottom: 8,
  },
  exerciseTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
  },
  exerciseDescription: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  timingContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  timingText: {
    color: '#fff',
    fontWeight: '600',
  },
  breathingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathCircle: {
    width: height * 0.45,
    height: height * 0.45,
    borderRadius: height * 0.225,
    overflow: 'hidden',
  },
  circleGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phaseText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  timerText: {
    fontSize: 72,
    fontWeight: '800',
    color: '#fff',
  },
  cyclesText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 8,
    opacity: 0.8,
  },
  guideContainer: {
    position: 'absolute',
    bottom: -60,
    paddingHorizontal: 32,
  },
  guideText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.8,
  },
  startButton: {
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 32,
    alignItems: 'center',
    marginBottom: 32,
    backgroundColor: '#4A0887',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  stopButton: {
    backgroundColor: '#FF5252',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
});