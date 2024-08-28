import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Dashboard() {
  const days = 30;
  const data = Array.from({ length: days }, () => Math.floor(Math.random() * 4));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.badgeSection}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.badgeContainer}>
          <MaterialCommunityIcons name="trophy" size={48} color="#6a0dad" />
          <MaterialCommunityIcons name="star-circle" size={48} color="#6a0dad" />
          <MaterialCommunityIcons name="medal" size={48} color="#6a0dad" />
        </View>
      </View>
      <View style={styles.xpSection}>
        <Text style={styles.sectionTitle}>XP Progress</Text>
        <ProgressBar progress={0.7} color="#6a0dad" style={styles.progressBar} />
        <Text style={styles.xpText}>7,000 / 10,000 XP</Text>
      </View>

      <View style={styles.commitGraphSection}>
        <Text style={styles.sectionTitle}>Activity</Text>
        <View style={styles.commitGraphContainer}>
          {data.map((activityLevel, index) => (
            <View
              key={index}
              style={[
                styles.commitBox,
                {
                  backgroundColor: getShadeOfPurple(activityLevel), 
                },
              ]}
            />
          ))}
        </View>
      </View>

        <View style={styles.reportSection}>
            <Text style={styles.sectionTitle}>Mood Tracker</Text>
            <LineChart
            data={{
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{ data: [3, 4, 2, 3, 4, 3, 4] }],
            }}
            width={320}
            height={220}
            chartConfig={{
                backgroundColor: '#f5f5f5',
                backgroundGradientFrom: '#f5f5f5',
                backgroundGradientTo: '#f5f5f5',
                color: (opacity = 1) => `rgba(106, 13, 173, ${opacity})`,
                strokeWidth: 2,
            }}
            style={styles.graphStyle}
            />
            <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Mood Analysis</Text>
            <Text style={styles.cardContent}>
                Your average mood has improved by 10% over the last week.
            </Text>
            </View>
        </View>
      <View style={styles.reportSection}>
        <Text style={styles.sectionTitle}>Sleep Cycle</Text>
        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{ data: [6, 7, 8, 5, 6, 7, 8] }],
          }}
          width={320}
          height={220}
          chartConfig={{
            backgroundColor: '#f5f5f5',
            backgroundGradientFrom: '#f5f5f5',
            backgroundGradientTo: '#f5f5f5',
            color: (opacity = 1) => `rgba(106, 13, 173, ${opacity})`,
            strokeWidth: 2,
          }}
          style={styles.graphStyle}
        />
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Sleep Quality</Text>
          <Text style={styles.cardContent}>
            Your average sleep quality has improved by 15% over the last week.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const getShadeOfPurple = (level) => {
  const shades = ['#e5ccff', '#cc99ff', '#b266ff', '#6a0dad']; 
  return shades[level];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6a0dad',
    marginBottom: 8,
  },
  badgeSection: {
    marginBottom: 24,
  },
  badgeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  xpSection: {
    marginBottom: 24,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginTop: 8,
  },
  xpText: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
    color: '#6a0dad',
  },
  commitGraphSection: {
    marginBottom: 24,
  },
  commitGraphContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  commitBox: {
    width: 20,
    height: 20,
    backgroundColor: '#6a0dad',
    marginBottom: 4,
  },
  reportSection: {
    marginBottom: 24,
  },
  graphStyle: {
    borderRadius: 16,
  },
  infoCard: {
    backgroundColor: '#f0e6ff',
    padding: 16,
    borderRadius: 10,
    marginTop: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a0dad',
  },
  cardContent: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
  },
});
