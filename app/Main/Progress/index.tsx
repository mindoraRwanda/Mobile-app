import React from 'react';
import { View, Text, StyleSheet, ScrollView, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import XPProgress from './XPProgress';
import StreakCard from './StreakCard';
import BadgeShowcase from './BadgeShowcase';
import ConnectionPulse from './ConnectionPulse';
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const router = useRouter();
  const animatedValue = new Animated.Value(0);

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#8a2be2', '#4b0082']}
        style={styles.header}
      >
        <Text style={styles.headerText}>Your Journey</Text>
      </LinearGradient>

      <XPProgress />
      <StreakCard animatedValue={animatedValue} />
      <BadgeShowcase />
      <ConnectionPulse />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
});