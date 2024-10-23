import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeeds } from '@/redux/Slices/feedsSlice';
import { RootState } from '@/redux/store';

export default function Feeds() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { articles, videos, loading, error } = useSelector((state: RootState) => state.feeds);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  // Sort articles by publishedAt date in descending order
  const sortedArticles = articles.slice().sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)).reverse();

  const renderFeedItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => router.push({
        pathname: './Feeds/Article',
        params: { article: JSON.stringify(item) },
      })}
    >
      <Image source={{ uri: item.picture || 'https://via.placeholder.com/150' }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.content.sections[0].body}</Text>
        <Text style={styles.author}>By {item.author}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (error) {
    return <Text>Error: {error}</Text>;
  }
  return (
    <View style={styles.container}>
      <FlatList 
        data={sortedArticles}
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
    marginTop: 80,
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