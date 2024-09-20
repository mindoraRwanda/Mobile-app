import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter,  useLocalSearchParams } from 'expo-router';

export default function Article() {
  const router = useRouter();
  const { article } = useLocalSearchParams();
  const articleData = article ? JSON.parse(article) : null;

  if (!articleData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No article data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{articleData.title}</Text>
        <Text style={styles.author}>{articleData.author}</Text>
        <Image
          source={{ uri: articleData.picture || 'https://via.placeholder.com/400x200' }}
          style={styles.image}
        />
         {articleData.content.sections.map((section, index) => (
          <View key={index}>
            <Text style={styles.sectionHeader}>{section.header}</Text>
            <Text style={styles.content}>{section.body}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
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
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});
