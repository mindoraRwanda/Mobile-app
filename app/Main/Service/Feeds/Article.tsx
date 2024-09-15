import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Article() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>The Benefits of Meditation for Mental Health</Text>
        <Text style={styles.author}>By Jane Doe</Text>
        <Image
          source={{ uri: 'https://via.placeholder.com/400x200' }}
          style={styles.image}
        />
        <Text style={styles.content}>
          Meditation has been practiced for thousands of years, but it's only recently that science has begun to understand its profound effects on the brain. Regular meditation practice can lead to improved emotional health, reduced stress, and increased focus. In this article, we'll explore the many benefits of meditation and how you can incorporate it into your daily routine...
        </Text>
        {/* Add more content as needed */}
        <Text style={styles.content}>
          Placeholder for additional article content. This section can be expanded with more text, images, or other media to fully engage the reader.
        </Text>
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
  content: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 20,
  },
});
