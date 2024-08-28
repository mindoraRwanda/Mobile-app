import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useRouter } from 'expo-router';

const exercises = [
  {
    id: '1',
    title: 'Meditation',
    description: 'Calm your mind with guided meditation.',
    image: 'https://via.placeholder.com/100',
    link: './Exercise/Meditation',
  },
  {
    id: '2',
    title: 'Breathing Exercises',
    description: 'Improve your mental health with breathing techniques.',
    image: 'https://via.placeholder.com/100',
    link: './Exercise/Breathing',
  },
 {
    id: '3',
    title: 'Breathing Exercises',
    description: 'Improve your mental health with breathing techniques.',
    image: 'https://via.placeholder.com/100',
    link: './Exercise/Breathing',
  },
   {
    id: '4',
    title: 'Breathing Exercises',
    description: 'Improve your mental health with breathing techniques.',
    image: 'https://via.placeholder.com/100',
    link: './Exercise/Breathing',
  },
  {
    id: '5',
    title: 'Anxiety Management',
    description: 'Learn how to manage anxiety effectively.',
    image: 'https://via.placeholder.com/100',
    link: './Exercise/Anxiety',
  },
  {
    id: '6',
    title: 'Anxiety Management',
    description: 'Learn how to manage anxiety effectively.',
    image: 'https://via.placeholder.com/100',
    link: './Exercise/Anxiety',
  },
  {
    id: '7',
    title: 'Anxiety Management',
    description: 'Learn how to manage anxiety effectively.',
    image: 'https://via.placeholder.com/100',
    link: './Exercise/Anxiety',
  },
  {
    id: '8',
    title: 'Anxiety Management',
    description: 'Learn how to manage anxiety effectively.',
    image: 'https://via.placeholder.com/100',
    link: './Exercise/Anxiety',
  },
  {
    id: '9',
    title: 'Anxiety Management',
    description: 'Learn how to manage anxiety effectively.',
    image: 'https://via.placeholder.com/100',
    link: './Exercise/Anxiety',
  },
  {
    id: '10',
    title: 'Anxiety Management',
    description: 'Learn how to manage anxiety effectively.',
    image: 'https://via.placeholder.com/100',
    link: './Exercise/Anxiety',
  },
  {
    id: '11',
    title: 'Anxiety Management',
    description: 'Learn how to manage anxiety effectively.',
    image: 'https://via.placeholder.com/100',
    link: './Exercise/Anxiety',
  },
  {
    id: '12',
    title: 'Anxiety Management',
    description: 'Learn how to manage anxiety effectively.',
    image: 'https://via.placeholder.com/100',
    link: './Exercise/Anxiety',
  },
  {
    id: '13',
    title: 'Anxiety Management',
    description: 'Learn how to manage anxiety effectively.',
    image: 'https://via.placeholder.com/100',
    link: './Exercise/Anxiety',
  },
  {
    id: '14',
    title: 'Anxiety Management',
    description: 'Learn how to manage anxiety effectively.',
    image: 'https://via.placeholder.com/100',
    link: './Exercise/Anxiety',
  },
];

export default function ExercisePage() {
  const router = useRouter();

  const renderExerciseItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => router.push(item.link)} // Navigate to the specific exercise page
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mental Health Exercises</Text>
      <FlatList 
        data={exercises}
        renderItem={renderExerciseItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'purple',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    flex: 0.48,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});
