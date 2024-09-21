import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const XPProgress = () => {
  return (
    <View style={styles.xpSection}>
      <Text style={styles.sectionTitle}>XP Progress</Text>
      <ProgressBar progress={0.7} color="#8a2be2" style={styles.progressBar} />
      <Text style={styles.xpText}>7,000 / 10,000 XP</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  xpSection: {
    margin: 20,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 20,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4b0082',
    marginBottom: 15,
    textAlign: 'center',
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
});

export default XPProgress;