import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const ConnectionPulse = () => {
  return (
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
  );
};

const styles = StyleSheet.create({
  chartCard: {
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

export default ConnectionPulse;