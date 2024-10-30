// Mindfulness.tsx

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  SafeAreaView,
  Easing,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const mindfulnessExercises = [
  {
    id: '1',
    title: 'Body Scan',
    duration: 300,
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
    duration: 180,
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
    duration: 240,
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
    duration: 180,
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
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../../assets/sounds/chime.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  const startSession = (exercise: any) => {
    setSelectedExercise(exercise);
    setIsSessionActive(true);
    setRemainingTime(exercise.duration);
    setCurrentStep(0);
    progress.setValue(0);

    Animated.timing(progress, {
      toValue: 1,
      duration: exercise.duration * 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    playSound();
  };

  const endSession = () => {
    setIsSessionActive(false);
    setSelectedExercise(null);
    setCurrentStep(0);
    setRemainingTime(0);
    progress.stopAnimation();
    progress.setValue(0);
    if (sound) {
      sound.unloadAsync();
    }
  };

  const nextStep = () => {
    if (currentStep < selectedExercise.steps.length - 1) {
      setCurrentStep(currentStep + 1);
      playSound();
    } else {
      endSession();
    }

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
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
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
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isSessionActive, remainingTime]);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const ProgressCircle = () => {
    const size = 220;
    const strokeWidth = 12;
    const halfSize = size / 2;
    const radius = halfSize - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;

    const animatedStroke = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [circumference, 0],
    });

    return (
      <View style={{ width: size, height: size }}>
        <Svg width={size} height={size}>
          <Circle
            cx={halfSize}
            cy={halfSize}
            r={radius}
            stroke="#e0e0e0"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <AnimatedCircle
            cx={halfSize}
            cy={halfSize}
            r={radius}
            stroke={selectedExercise.color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={animatedStroke}
            strokeLinecap="round"
          />
        </Svg>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: size,
            height: size,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={styles.timerText}>{formatTime(remainingTime)}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mindfulness</Text>
      </View>

      {!isSessionActive ? (
        <ScrollView contentContainerStyle={styles.exerciseList}>
          {mindfulnessExercises.map((exercise) => (
            <TouchableOpacity
              key={exercise.id}
              style={styles.exerciseCard}
              onPress={() => startSession(exercise)}
            >
              <LinearGradient
                colors={[exercise.color, `${exercise.color}AA`]}
                style={styles.cardGradient}
              >
                <MaterialIcons name={exercise.icon} size={48} color="#fff" />
                <Text style={styles.exerciseTitle}>{exercise.title}</Text>
                <Text style={styles.exerciseDuration}>
                  Duration: {formatTime(exercise.duration)}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <LinearGradient
          colors={['#005C97', '#363795']}
          style={styles.sessionContainer}
        >
          <ProgressCircle />

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
              <Text style={styles.controlButtonText}>
                {currentStep + 1 < selectedExercise.steps.length ? 'Next Step' : 'Finish'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, styles.endButton]}
              onPress={endSession}
            >
              <Text style={[styles.controlButtonText, { color: '#FF5252' }]}>
                End Session
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1F1F1F',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#fff',
  },
  exerciseList: {
    padding: 16,
  },
  exerciseCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
  },
  cardGradient: {
    padding: 24,
    alignItems: 'center',
  },
  exerciseTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
  },
  exerciseDuration: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
  },
  sessionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 32,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  instructionContainer: {
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 16,
    width: '90%',
    alignItems: 'center',
  },
  instructionStep: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 24,
    fontWeight: '500',
    color: '#fff',
    textAlign: 'center',
  },
  controlsContainer: {
    width: '90%',
  },
  controlButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  endButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF5252',
  },
});