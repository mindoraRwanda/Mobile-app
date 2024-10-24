import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

const exerciseCategories = [
  {
    id: '1',
    title: '4-7-8 Breathing',
    description: 'A simple breathing technique to reduce anxiety and promote relaxation.',
    icon: 'air',
    route: './Exercise/Breathing',
    color: '#4CAF50',
    exercises: [
      'Sit or lie comfortably',
      'Exhale completely through your mouth',
      'Inhale through nose for 4 seconds',
      'Hold breath for 7 seconds',
      'Exhale through mouth for 8 seconds',
      'Repeat 4 times'
    ]
  },
  {
    id: '2',
    title: 'Body Scan',
    description: 'Progressive relaxation exercise to release tension and improve awareness.',
    icon: 'accessibility-new',
    route: './Exercise/Mindfulness',
    color: '#2196F3',
    exercises: [
      'Lie down comfortably',
      'Focus on your toes',
      'Move attention slowly upward',
      'Notice any tension',
      'Release tension as you go',
      'Reach the top of your head'
    ]
  },
  {
    id: '3',
    title: '5-4-3-2-1 Grounding',
    description: 'Mindfulness exercise to manage anxiety and panic attacks.',
    icon: 'grass',
    route: './Exercise/Anxiety',
    color: '#9C27B0',
    exercises: [
      'Name 5 things you can see',
      'Name 4 things you can touch',
      'Name 3 things you can hear',
      'Name 2 things you can smell',
      'Name 1 thing you can taste'
    ]
  },
  {
    id: '4',
    title: 'Gratitude Practice',
    description: 'Daily exercise to improve mood and combat depression.',
    icon: 'favorite',
    route: './Exercise/Depression',
    color: '#FF9800',
    exercises: [
      'List 3 good things today',
      'Write why they happened',
      'How they made you feel',
      'What you learned',
      "Plan tomorrow's gratitude",
      'Share with someone'
    ]
  },
  {
    id: '5',
    title: 'Sleep Preparation',
    description: 'Evening routine to improve sleep quality.',
    icon: 'bedtime',
    route: './Exercise/Sleep',
    color: '#3F51B5',
    exercises: [
      'Dim lights 1 hour before bed',
      'Do light stretching',
      "Write tomorrow's tasks",
      'Practice deep breathing',
      'Avoid screens',
      'Use white noise if needed'
    ]
  },
  {
    id: '6',
    title: 'Stress Release',
    description: 'Quick exercises to release physical stress.',
    icon: 'spa',
    route: './Exercise/Stress',
    color: '#E91E63',
    exercises: [
      'Roll shoulders backward',
      'Stretch neck gently',
      'Clench and release fists',
      'Take 5 deep breaths',
      'Shake out limbs',
      'Progressive muscle relaxation'
    ]
  },
  {
  id: '7',
  title: 'Daily Meditation',
  description: 'Simple meditation practice to cultivate mindfulness and inner peace.',
  icon: 'nature-people', 
  route: './Exercise/Meditation',
  color: '#8BC34A', 
  exercises: [
    'Find a quiet comfortable spot',
    'Sit with straight but relaxed posture',
    'Focus on your natural breath',
    'Notice when mind wanders',
    'Gently return to breath',
    'Start with 5-10 minutes daily'
  ]
}
  
];

export default function ExercisePage() {
  const router = useRouter();

  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: item.color }]}
      onPress={() => router.push(item.route)}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <MaterialIcons name={item.icon} size={32} color="white" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <View style={styles.exerciseCount}>
          <MaterialIcons name="format-list-bulleted" size={16} color={item.color} />
          <Text style={[styles.countText, { color: item.color }]}>
            {item.exercises.length} steps
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Mental Health</Text>
        <Text style={styles.subHeader}>Daily Exercises</Text>
      </View>
      <FlatList
        data={exerciseCategories}
        renderItem={renderExerciseItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    padding: 16,
  },
  headerContainer: {
    marginBottom: 24,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 18,
    color: '#666',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderLeftWidth: 4,
  },
  iconContainer: {
    padding: 16,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  exerciseCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '500',
  },
});