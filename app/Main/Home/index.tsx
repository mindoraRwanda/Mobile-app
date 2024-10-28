import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TextConversation from './TextConversation';
import AudioConversation from './AudioConversation';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'text' | 'audio'>('text');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mindora AI Companion</Text>
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity
          style={[styles.navButton, currentPage === 'text' && styles.activeNavButton]}
          onPress={() => setCurrentPage('text')}
        >
          <Icon name="chat" size={24} color={currentPage === 'text' ? '#fff' : '#4A0887'} />
          <Text style={[styles.navButtonText, currentPage === 'text' && styles.activeNavButtonText]}>
            Text Conversation
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, currentPage === 'audio' && styles.activeNavButton]}
          onPress={() => setCurrentPage('audio')}
        >
          <Icon name="mic" size={24} color={currentPage === 'audio' ? '#fff' : '#4A0887'} />
          <Text style={[styles.navButtonText, currentPage === 'audio' && styles.activeNavButtonText]}>
            Audio Conversation
          </Text>
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
    padding: 16,
    backgroundColor: '#4A0887',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4A0887',
    backgroundColor: '#fff',
  },
  activeNavButton: {
    backgroundColor: '#4A0887',
  },
  navButtonText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#4A0887',
  },
  activeNavButtonText: {
    color: '#fff',
  },
});