import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { Component } from 'react'
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ExerciseDetail() {
    const router = useRouter();
    const { exercise } = useLocalSearchParams();
    const exerciseData = exercise ? JSON.parse(exercise) : null;
    
  if (!exerciseData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No exercise data available.</Text>
      </View>
    );
  }
    return (
      <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{exerciseData.title}</Text>
        <Text style={styles.author}>By {exerciseData.author}</Text>
        <Image
          source={{ uri: exerciseData.image || 'https://via.placeholder.com/400x200' }}
          style={styles.image}
        />
        <Text style={styles.description}>{exerciseData.description}</Text>
        <Text style={styles.difficulty}>Difficulty: {exerciseData.difficultyLevel}</Text>
        {exerciseData.questions.length > 0 && (
          <View style={styles.questionsContainer}>
            <Text style={styles.questionsHeader}>Questions:</Text>
            {exerciseData.questions.map((question, index) => (
              <Text key={question.id} style={styles.questionItem}>
                {index + 1}. {question.question}
              </Text>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
    )
  }

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 15,
    marginTop: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    paddingVertical: 10,
  },
  backButtonText: {
    color: 'purple',
    fontSize: 16,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    color: '#777',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 20,
  },
  difficulty: {
    fontSize: 14,
    color: '#999',
    marginBottom: 20,
  },
  questionsContainer: {
    marginTop: 10,
  },
  questionsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
   questionItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
