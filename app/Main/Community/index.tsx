import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, ActivityIndicator, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCommunities } from '@/redux/Slices/supportCommunitySlice';
import { RootState } from '@/redux/store';
import { useRouter } from 'expo-router';

const CommunityList: React.FC = (): JSX.Element => {
  const [selectedTab, setSelectedTab] = useState('My Community'); // Default tab
  const dispatch = useDispatch();
  const router = useRouter();
  const { communities, loading, error } = useSelector((state: RootState) => state.Community);

  useEffect(() => {
    dispatch(fetchCommunities());
  }, [dispatch]);

  const renderCommunityItem = ({ item }) => {
    const moderatorName = item.moderator
      ? `${item.moderator.firstName ?? 'Unknown'} ${item.moderator.lastName ?? 'User'}`
      : 'Moderator Info Unavailable';

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push({
            pathname: './Chat/CommunityView',
            params: { community: JSON.stringify(item) },
          })
        }>
        <Image source={{ uri: item.picture || 'https://via.placeholder.com/150' }} style={styles.image} />
        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.title}>{item.name}</Text>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </View>
          <Text style={styles.description}>{item.description}</Text>
          <View style={styles.moderatorContainer}>
            <Ionicons name="person-circle" size={20} color="#666" />
            <Text style={styles.moderator}>Moderator: {moderatorName}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Top Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'My Community' && styles.activeTab]}
          onPress={() => setSelectedTab('My Community')}>
          <Text style={[styles.tabText, selectedTab === 'My Community' && styles.activeTabText]}>My Community</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Explore' && styles.activeTab]}
          onPress={() => setSelectedTab('Explore')}>
          <Text style={[styles.tabText, selectedTab === 'Explore' && styles.activeTabText]}>Explore</Text>
        </TouchableOpacity>
      </View>

      {/* Community List */}
      <FlatList
        data={communities} // You may need to filter the data here based on `selectedTab`
        renderItem={renderCommunityItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default CommunityList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#6200ee',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 150,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardContent: {
    flex: 1,
    padding: 15,
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
