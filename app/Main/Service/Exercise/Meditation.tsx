import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Meditation() {
  const router = useRouter();
  const [activeSession, setActiveSession] = useState(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [sessionNotes, setSessionNotes] = useState('');
  const timerRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const meditationSessions = [
    {
      id: 1,
      title: 'Mindful Breathing',
      duration: 300, // 5 minutes in second
      description: 'Focus on your breath to center yourself',
      icon: 'air',
      color: '#4CAF50',
      steps: [
        'Find a comfortable seated position',
        'Close your eyes gently',
        'Focus on your natural breath',
        'Notice the rise and fall of your chest',
        'When mind wanders, return to breath'
      ]
    },
    {
      id: 2,
      title: 'Body Scan',
      duration: 600, // 10 minutes
      description: 'Progressive awareness of your body',
      icon: 'accessibility-new',
      color: '#2196F3',
      steps: [
        'Lie down comfortably',
        'Start from your toes',
        'Move attention upward slowly',
        'Notice any sensations',
        'Release any tension found'
      ]
    },
    {
      id: 3,
      title: 'Loving Kindness',
      duration: 480, // 8 minutes
      description: 'Cultivate compassion for self and others',
      icon: 'favorite',
      color: '#E91E63',
      steps: [
        'Begin with self-compassion',
        'Extend to loved ones',
        'Include neutral people',
        'Embrace difficult relationships',
        'Extend to all beings'
      ]
    },
    {
      id: 4,
      title: 'Quick Calm',
      duration: 180, // 3 minutes
      description: 'Brief relaxation for busy moments',
      icon: 'schedule',
      color: '#FF9800',
      steps: [
        'Take a comfortable position',
        'Three deep breaths',
        'Scan for tension',
        'Release with each exhale',
        'Return to regular activity'
      ]
    },
    {
      id: 5,
      title: 'Nature Visualization',
      duration: 420, // 7 minutes
      description: 'Mental journey through peaceful scenery',
      icon: 'landscape',
      color: '#009688',
      steps: [
        'Close eyes and relax',
        'Imagine peaceful nature scene',
        'Engage all senses',
        'Explore the environment',
        'Slowly return to awareness'
      ]
    }
  ];

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const startSession = (session) => {
    setActiveSession(session);
    setTimeRemaining(session.duration);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const toggleTimer = () => {
    if (isTimerRunning) {
      clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    setIsTimerRunning(!isTimerRunning);
  };

  const endSession = () => {
    clearInterval(timerRef.current);
    setIsTimerRunning(false);
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setActiveSession(null));
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
          <MaterialIcons name="self-improvement" size={40} color="#673AB7" />
          <Text style={styles.title}>Meditation</Text>
          <Text style={styles.subtitle}>
            Guided sessions for inner peace
          </Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Today's Progress</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Minutes</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Streak</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Meditation Sessions</Text>
        
        {meditationSessions.map((session) => (
          <TouchableOpacity
            key={session.id}
            style={styles.sessionCard}
            onPress={() => startSession(session)}
          >
            <View style={[styles.iconContainer, { backgroundColor: session.color }]}>
              <MaterialIcons name={session.icon} size={24} color="white" />
            </View>
            <View style={styles.sessionInfo}>
              <Text style={styles.sessionTitle}>{session.title}</Text>
              <Text style={styles.sessionDescription}>{session.description}</Text>
              <Text style={styles.sessionDuration}>
                {formatTime(session.duration)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.notesCard}>
          <Text style={styles.cardTitle}>Meditation Journal</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Record your thoughts and experiences..."
            multiline
            value={sessionNotes}
            onChangeText={setSessionNotes}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      {activeSession && (
        <Animated.View 
          style={[
            styles.modal,
            {
              opacity: fadeAnim,
              transform: [{
                scale: fadeAnim.interpolate({
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
              onPress={endSession}
            >
              <MaterialIcons name="close" size={24} color="#666" />
            </TouchableOpacity>

            <MaterialIcons name={activeSession.icon} size={48} color={activeSession.color} />
            <Text style={styles.modalTitle}>{activeSession.title}</Text>
            <Text style={styles.timer}>{formatTime(timeRemaining)}</Text>

            <TouchableOpacity
              style={[styles.timerButton, isTimerRunning && styles.timerButtonActive]}
              onPress={toggleTimer}
            >
              <MaterialIcons 
                name={isTimerRunning ? "pause" : "play-arrow"} 
                size={32} 
                color="white" 
              />
            </TouchableOpacity>

            <View style={styles.stepsList}>
              {activeSession.steps.map((step, index) => (
                <View key={index} style={styles.stepItem}>
                  <MaterialIcons name="radio-button-unchecked" size={20} color={activeSession.color} />
                  <Text style={styles.stepText}>{step}</Text>
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
  statsCard: {
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
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#673AB7',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A237E',
    marginBottom: 16,
  },
  sessionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    padding: 16,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sessionInfo: {
    flex: 1,
    padding: 16,
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  sessionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  sessionDuration: {
    fontSize: 14,
    color: '#673AB7',
    fontWeight: '500',
  },
  notesCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 24,
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
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#673AB7',
    marginVertical: 24,
  },
  timerButton: {
    backgroundColor: '#673AB7',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  timerButtonActive: {
    backgroundColor: '#FF5722',
  },
  stepsList: {
    width: '100%',
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
});