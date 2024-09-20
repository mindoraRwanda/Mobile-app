import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, ActivityIndicator, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommunities } from '@/redux/Slices/supportCommunitySlice';
import { RootState } from '@/redux/store';
import { useRouter } from 'expo-router';

const Index: React.FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { communities, loading, error } = useSelector((state: RootState) => state.Community);

  useEffect(() => {
    dispatch(fetchCommunities());
  }, [dispatch]);

  const renderCommunityItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push({
        pathname: './Community/CommunityView',
        params: { community: JSON.stringify(item) },
        })}>
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{item.name}</Text>
        <Ionicons name="chevron-forward" size={24} color="#666" />
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.moderatorContainer}>
        <Ionicons name="person-circle" size={20} color="#666" />
        <Text style={styles.moderator}>Moderator: {item.moderator.firstName} {item.moderator.lastName}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={communities}
        renderItem={renderCommunityItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginTop: 100,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 3, 
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  moderatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moderator: {
    fontSize: 12,
    color: '#999',
    marginLeft: 5,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});