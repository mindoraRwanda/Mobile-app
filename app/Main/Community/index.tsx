// index.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCommunities,
  fetchCommunitiesByUserId,
  joinCommunity,
} from '@/redux/Slices/supportCommunitySlice';
import { RootState, AppDispatch } from '@/redux/store';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define TypeScript interfaces for better type safety

interface Moderator {
  id: string;
  firstName: string;
  lastName: string;
  username: string | null;
  email: string;
  phoneNumber: string | null;
  profileImage: string | null;
  password: string;
  role: string;
  resetPasswordToken: string | null;
  resetPasswordExpiry: string | null;
  createdAt: string;
  updatedAt: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  attachments: string[];
  createdAt: string;
  updatedAt: string;
  communityId: string;
  isFlagged: boolean;
  createdBy: string;
}

interface UserCommunity {
  communityId: string;
  userId: string;
  joinedAt: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface Community {
  id: string;
  moderatorId: string;
  name: string;
  description: string;
  isPrivate: boolean;
  posts: Post[];
  members: string[];
  createdAt: string;
  updatedAt: string;
  UserCommunity: UserCommunity;
  moderator?: Moderator;
  picture?: string; // Assuming there's a picture field
}

const CommunityList: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'My Community' | 'Explore'>('My Community');
  const [userId, setUserId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Access Redux state
  const { communities, userCommunities, loading, error } = useSelector(
    (state: RootState) => state.supportCommunity
  );

  // Fetch user data and communities on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        if (userString) {
          const { id } = JSON.parse(userString);
          setUserId(id);
          await dispatch(fetchCommunitiesByUserId()).unwrap(); // Await to handle potential errors
        } else {
          Alert.alert('Error', 'User not found. Please log in.');
        }
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        Alert.alert('Error', 'Failed to retrieve user information.');
      }
    };

    fetchUserData();
    dispatch(fetchCommunities());
  }, [dispatch]);

  // Prompt user to join community
  const handleJoinPrompt = (community: Community) => {
    Alert.alert(
      'Join Community',
      `Do you want to join "${community.name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Join',
          onPress: () => handleJoinCommunity(community.id),
        },
      ],
      { cancelable: true }
    );
  };

  // Handle joining a community
  const handleJoinCommunity = async (communityId: string) => {
    if (!userId) {
      Alert.alert('Error', 'User ID is missing. Please log in again.');
      return;
    }

    const data = {
      communityId,
      userId,
      role: 'member',
      status: 'active',
    };

    try {
      await dispatch(joinCommunity(data)).unwrap();
      Alert.alert('Success', 'You have joined the community.');
      await dispatch(fetchCommunitiesByUserId()).unwrap(); // Refresh user communities
      setSelectedTab('My Community');
    } catch (err: any) {
      console.error('Error joining community:', err);
      Alert.alert('Error', err || 'Failed to join the community.');
    }
  };

  // Render each community item
  const renderCommunityItem = ({ item }: { item: Community }) => {
    const moderatorName = item.moderator
      ? `${item.moderator.firstName || 'Unknown'} ${item.moderator.lastName || 'User'}`
      : 'Moderator Info Unavailable';

    const handlePress = () => {
      if (selectedTab === 'My Community') {
        router.push({
          pathname: './Community/CommunityView',
          params: { community: JSON.stringify(item) },
        });
      } else {
        handleJoinPrompt(item);
      }
    };

    return (
      <TouchableOpacity style={styles.card} onPress={handlePress}>
        <Image
          source={{ uri: item.picture || 'https://via.placeholder.com/150' }}
          style={styles.image}
        />
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

  // Determine which data to display based on selected tab
  const data = selectedTab === 'My Community' ? userCommunities : communities;

  return (
    <View style={styles.container}>
      {/* Top Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'My Community' && styles.activeTab]}
          onPress={() => setSelectedTab('My Community')}
        >
          <Text
            style={[styles.tabText, selectedTab === 'My Community' && styles.activeTabText]}
          >
            My Community
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Explore' && styles.activeTab]}
          onPress={() => setSelectedTab('Explore')}
        >
          <Text style={[styles.tabText, selectedTab === 'Explore' && styles.activeTabText]}>
            Explore
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#4A0887" />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      ) : data.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            {selectedTab === 'My Community'
              ? 'You have not joined any communities yet.'
              : 'No communities available to explore.'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={renderCommunityItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default CommunityList;

// Stylesheet for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#4A0887',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
  },
  activeTabText: {
    color: '#4A0887',
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 120, // Fixed height for consistency
  },
  cardContent: {
    flex: 1,
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flexShrink: 1,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 8,
  },
  moderatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moderator: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});