import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

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

  const handleViewMoreBadges = () => {
    router.push('./Progress/Badge');
  };

  const pulseAnimation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#8a2be2', '#4b0082']}
        style={styles.header}
      >
        <Text style={styles.headerText}>Your Journey</Text>
      </LinearGradient>

      {/* XP Progress Section */}
      <View style={styles.xpSection}>
        <Text style={styles.sectionTitle}>XP Progress</Text>
        <ProgressBar progress={0.7} color="#8a2be2" style={styles.progressBar} />
        <Text style={styles.xpText}>7,000 / 10,000 XP</Text>
      </View>

      {/* Streak Card */}
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

      {/* Badge Showcase */}
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

      {/* Daily Check-up Chart */}
      <View style={styles.chartCard}>
        <Text style={styles.sectionTitle}>Connection Pulse</Text>
        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [
              { data: [40, 45, 50, 60, 65, 70, 80], color: (opacity = 1) => `rgba(138, 43, 226, ${opacity})` },
              { data: [30, 40, 35, 50, 55, 60, 70], color: (opacity = 1) => `rgba(75, 0, 130, ${opacity})` },
              { data: [20, 30, 40, 35, 45, 50, 60], color: (opacity = 1) => `rgba(186, 85, 211, ${opacity})` },
            ],
          }}
          width={340}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(138, 43, 226, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: '#ffffff',
            },
          }}
          bezier
          style={styles.chart}
        />
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#8a2be2' }]} />
            <Text style={styles.legendText}>Sweet</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#4b0082' }]} />
            <Text style={styles.legendText}>Jane</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#ba55d3' }]} />
            <Text style={styles.legendText}>Mary</Text>
          </View>
        </View>
      </View>
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4b0082',
    marginBottom: 15,
    textAlign: 'center',
  },
  xpSection: {
    margin: 20,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },
  progressBar: {
    height: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  xpText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 18,
    color: '#4b0082',
    fontWeight: '600',
  },
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
  badgeShowcase: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    elevation: 5,
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
  chartCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    margin: 20,
    elevation: 5,
  },
  chart: {
    marginVertical: 15,
    borderRadius: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
});