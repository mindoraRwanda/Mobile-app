import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const BadgeShowcase = () => {
  const router = useRouter();

  const handleViewMoreBadges = () => {
    router.push('./Progress/Badge');
  };

  return (
    <View style={styles.badgeShowcase}>
      <Text style={styles.sectionTitle}>Your Achievements</Text>
      <View style={styles.badgeContainer}>
        <View style={styles.badgeItem}>
          <MaterialCommunityIcons name="trophy" size={48} color="#FFD700" />
          <Text style={styles.badgeText}>Master Communicator</Text>
        </View>
        <View style={styles.badgeItem}>
          <MaterialCommunityIcons name="medal" size={48} color="#C0C0C0" />
          <Text style={styles.badgeText}>Consistency King</Text>
        </View>
        <View style={styles.badgeItem}>
          <MaterialCommunityIcons name="star" size={48} color="#CD7F32" />
          <Text style={styles.badgeText}>Rising Star</Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleViewMoreBadges} style={styles.viewMoreButton}>
        <Text style={styles.viewMoreText}>Explore All Badges</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  badgeShowcase: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4b0082',
    marginBottom: 15,
    textAlign: 'center',
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  badgeItem: {
    alignItems: 'center',
  },
  badgeText: {
    marginTop: 5,
    fontSize: 12,
    color: '#4b0082',
    textAlign: 'center',
  },
  viewMoreButton: {
    backgroundColor: '#8a2be2',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  viewMoreText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BadgeShowcase;