import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TextConversation from './TextConversation';
import AudioConversation from './AudioConversation';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'text' | 'audio'>('text');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mindora AI Companion</Text>
        <Text style={styles.subtitle}>
          Hey y'all! I'm Mindora, your friendly AI assistant. How can I help you today?
        </Text>
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, currentPage === 'text' && styles.activeNavButton]}
          onPress={() => setCurrentPage('text')}
        >
          <Text style={styles.navButtonText}>Text Conversation</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, currentPage === 'audio' && styles.activeNavButton]}
          onPress={() => setCurrentPage('audio')}
        >
          <Text style={styles.navButtonText}>Audio Conversation</Text>
        </TouchableOpacity>
      </View>
      {currentPage === 'text' ? <TextConversation /> : <AudioConversation />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A0887',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#4A0887',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  navButton: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#ECECEC',
  },
  activeNavButton: {
    backgroundColor: '#4A0887',
  },
  navButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Home;