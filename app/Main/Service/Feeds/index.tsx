import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

const feeds = [
  {
    id: '1',
    title: 'Understanding Mental Health',
    description: 'A brief overview of mental health and why it is important.',
    author: 'John Doe',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    title: 'Tips for Managing Anxiety',
    description: 'Practical tips to help you manage anxiety effectively.',
    author: 'Jane Smith',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    title: 'Tips for Managing Anxiety',
    description: 'Practical tips to help you manage anxiety effectively.',
    author: 'Jane Smith',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    title: 'Understanding Mental Health',
    description: 'A brief overview of mental health and why it is important.',
    author: 'John Doe',
    image: 'https://via.placeholder.com/150',
  },
];

export default function Feeds() {
  const router = useRouter();

  const renderFeedItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => router.push(`./Feeds/Article`)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.author}>By {item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={feeds}
        renderItem={renderFeedItem}
        keyExtractor={item => item.id}
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
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 3, 
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  content: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  author: {
    fontSize: 12,
    color: '#999',
  },
});
