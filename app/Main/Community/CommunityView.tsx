import React, { useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CommunityView() {
  // Hardcoded community data
  const community = {
    name: 'Sample Community',
    description: 'This is a sample community description.',
    picture: 'https://via.placeholder.com/150',
    details: 'Detailed information about the community.',
  };

  const [selectedTab, setSelectedTab] = useState('Posts'); 

  // Sample posts data (replace with actual data)
  const posts = [
    { id: '1', title: 'First Post', description: 'This is the first post.', votes: 120, comments: 50 },
    { id: '2', title: 'Second Post', description: 'This is the second post.', votes: 80, comments: 30 },
  ];

  // Render individual post items
  const renderPostItem = ({ item }: { item: { id: string; title: string; description: string; votes: number; comments: number } }) => (
    <View style={styles.postCard}>
      <View style={styles.voteContainer}>
        <Ionicons name="arrow-up" size={24} color="grey" />
        <Text style={styles.voteCount}>{item.votes}</Text>
        <Ionicons name="arrow-down" size={24} color="grey" />
      </View>
      <View style={styles.postContent}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postDescription}>{item.description}</Text>
        <View style={styles.postMeta}>
          <Text style={styles.metaText}>{item.comments} comments</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Community Header */}
      <View style={styles.header}>
        <Image source={{ uri: community.picture }} style={styles.headerImage} />
        <View style={styles.headerContent}>
          <Text style={styles.communityName}>{community.name}</Text>
          <Text style={styles.communityDescription}>{community.description}</Text>
        </View>
      </View>

      {/* Tabs for Posts and About */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Posts' && styles.activeTab]}
          onPress={() => setSelectedTab('Posts')}>
          <Text style={[styles.tabText, selectedTab === 'Posts' && styles.activeTabText]}>Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'About' && styles.activeTab]}
          onPress={() => setSelectedTab('About')}>
          <Text style={[styles.tabText, selectedTab === 'About' && styles.activeTabText]}>About</Text>
        </TouchableOpacity>
      </View>

      {/* Content based on selected tab */}
      {selectedTab === 'Posts' ? (
        <FlatList
          data={posts}
          renderItem={renderPostItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.postList}
        />
      ) : (
        <View style={styles.aboutContainer}>
          <Text style={styles.aboutText}>About this community</Text>
          <Text style={styles.communityDetails}>{community.details}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  headerContent: {
    marginTop: 10,
    alignItems: 'center',
  },
  communityName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  communityDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
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
  postList: {
    padding: 10,
  },
  postCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  voteContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  voteCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  postContent: {
    flex: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postDescription: {
    fontSize: 14,
    color: '#666',
  },
  postMeta: {
    marginTop: 5,
  },
  metaText: {
    fontSize: 12,
    color: '#999',
  },
  aboutContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  aboutText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  communityDetails: {
    fontSize: 14,
    color: '#666',
  },
});