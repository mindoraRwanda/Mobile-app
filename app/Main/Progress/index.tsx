import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const router = useRouter();

  const handleViewMoreBadges = () => {
    router.push('./Badge');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Progress</Text>

      {/* XP Progress Section */}
      <View style={styles.xpSection}>
        <Text style={styles.sectionTitle}>XP Progress</Text>
        <ProgressBar progress={0.7} color="#6a0dad" style={styles.progressBar} />
        <Text style={styles.xpText}>7,000 / 10,000 XP</Text>
      </View>

      {/* Streak Card */}
      <View style={styles.streakCard}>
        <View style={styles.streakIconContainer}>
          <MaterialCommunityIcons name="fire" size={28} color="#FFA500" style={styles.iconAnimation} />
          <Text style={styles.streakDays}>100 Days</Text>
        </View>
        <Text style={styles.streakTitle}>Current Streak</Text>
        <Text style={styles.streakDescription}>
          You have consistently kept in touch with all your partners for 100 days!
        </Text>

        {/* Badge Section */}
        <View style={styles.badgeContainer}>
          <MaterialCommunityIcons name="trophy" size={48} color="#6a0dad" />
          <MaterialCommunityIcons name="medal" size={48} color="#6a0dad" />
        </View>

        {/* View More Button */}
        <TouchableOpacity onPress={handleViewMoreBadges} style={styles.viewMoreButton}>
          <Text style={styles.viewMoreText}>View More</Text>
        </TouchableOpacity>
      </View>

      {/* Daily Check-up Chart */}
      <View style={styles.chartCard}>
        <Text style={styles.sectionTitle}>Daily Check-up Progress</Text>
        <LineChart
          data={{
            labels: ['1t', '2t', '3t', '4t', '5t', '6t', '7t', '8t', '9t', '10t', '11t', '12t'],
            datasets: [
              { data: [10, 25, 15, 20, 35, 30, 45, 40, 50, 60, 55, 70], color: () => '#6a0dad' },
              { data: [5, 20, 10, 25, 30, 25, 40, 45, 55, 50, 65, 60], color: () => '#9932cc' },
              { data: [15, 10, 20, 15, 25, 35, 30, 50, 45, 55, 60, 65], color: () => '#ba55d3' },
            ],
          }}
          width={320}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#f7f3fc',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(106, 13, 173, ${opacity})`,
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

        {/* Legend Section */}
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#6a0dad' }]} />
            <Text style={styles.legendText}>Sweet</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: '#9932cc' }]} />
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
    backgroundColor: '#ffffff',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6a0dad',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#6a0dad',
    marginBottom: 10,
    textAlign: 'center',
  },
  xpSection: {
    marginBottom: 24,
    backgroundColor: '#f9f5ff',
    padding: 16,
    borderRadius: 10,
    elevation: 3,
  },
  progressBar: {
    height: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  xpText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: '#6a0dad',
    fontWeight: '600',
  },
  streakCard: {
    backgroundColor: '#f7f3fc',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 5,
  },
  streakIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  streakDays: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6a0dad',
    marginLeft: 10,
  },
  streakTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6a0dad',
    textAlign: 'center',
    marginBottom: 8,
  },
  streakDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  viewMoreButton: {
    backgroundColor: '#6a0dad',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignSelf: 'center',
    elevation: 2,
  },
  viewMoreText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  chartCard: {
    backgroundColor: '#f7f3fc',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    elevation: 3,
  },
  chart: {
    marginVertical: 12,
    borderRadius: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
  iconAnimation: {
    transform: [{ rotate: '20deg' }],
  },
});
