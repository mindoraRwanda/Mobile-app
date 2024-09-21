import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const StreakCard = ({ animatedValue }) => {
  const pulseAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <View style={styles.streakCard}>
      <Animated.View style={[styles.streakIconContainer, { transform: [{ scale: pulseAnimation }] }]}>
        <MaterialCommunityIcons name="fire" size={40} color="#FFA500" />
        <Text style={styles.streakDays}>100 Days</Text>
      </Animated.View>
      <Text style={styles.streakTitle}>Legendary Streak!</Text>
      <Text style={styles.streakDescription}>
        You've been unstoppable for 100 days! Keep the momentum going!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  streakCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    elevation: 5,
  },
  streakIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  streakDays: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4b0082',
    marginLeft: 15,
  },
  streakTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4b0082',
    textAlign: 'center',
    marginBottom: 10,
  },
  streakDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default StreakCard;