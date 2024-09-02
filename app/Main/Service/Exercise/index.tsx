import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { fetchExercises } from '@/redux/exerciseSlice';
import { RootState } from '@/redux/store';

export default function ExercisePage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { exercises, status, error } = useSelector((state: RootState) => state.exercises);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchExercises());
    }
  }, [status, dispatch]);

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`./Exercise/${item.id}`)} 
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
      {status === 'loading' && <Text>Loading...</Text>}
      {status === 'failed' && <Text>{error}</Text>}
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
