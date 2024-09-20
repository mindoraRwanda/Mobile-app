import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';

export default function Home() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: '../../assets/images/bgAi.jpg' }}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <Animated.View style={{ ...styles.iconContainer, opacity: fadeAnim }}>
          <Image
            source={{ uri: '../../assets/images/AIlog.jpg' }}
            style={styles.icon}
          />
        </Animated.View>
        <Text style={styles.title}>AI Chatbot Coming Soon!</Text>
        <Text style={styles.subtitle}>
          Our AI chatbot is under construction and will be available soon. Stay
          tuned for updates!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ddd',
    textAlign: 'center',
  },
});