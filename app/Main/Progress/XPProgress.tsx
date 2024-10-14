import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const XPProgress = forwardRef((props, ref) => {
  const [xp, setXp] = useState(0);
  const maxXp = 10000;

  const updateXp = (newXp) => {
    setXp((prevXp) => Math.min(prevXp + newXp, maxXp));
  };

  useImperativeHandle(ref, () => ({
    addXp: (amount) => {
      updateXp(amount);
    },
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      updateXp(500);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.xpSection}>
      <Text style={styles.sectionTitle}>XP Progress</Text>
      <ProgressBar progress={xp / maxXp} color="#8a2be2" style={styles.progressBar} />
      <Text style={styles.xpText}>{xp} / {maxXp} XP</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  xpSection: {
    margin: 10,
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