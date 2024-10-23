import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  Alert,
  ScrollView,
} from 'react-native';
import { Audio } from 'expo-av';
import * as Speech from 'expo-speech';
import Voice from '@wdragon/react-native-voice';
import axios from 'axios';
import { Feather } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
  type: 'user' | 'ai';
  timestamp: Date;
}

const AudioConversation: React.FC = () => {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setupVoice();
    return cleanup;
  }, []);

  const setupVoice = async () => {
    try {
      const available = await Voice.isAvailable();
      if (available) {
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechResults = onSpeechResults;
        Voice.onSpeechError = onSpeechError;
        
        await Audio.requestPermissionsAsync();
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          playThroughEarpieceAndroid: false,
        });
      } else {
        throw new Error('Voice recognition is not available');
      }
    } catch (error) {
      console.error('Error setting up voice:', error);
      Alert.alert('Error', 'Failed to initialize voice recognition');
    }
  };

  const cleanup = () => {
    Voice.destroy().then(() => Voice.removeAllListeners());
    if (recording) {
      recording.stopAndUnloadAsync();
    }
  };

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopPulseAnimation = () => {
    pulseAnim.setValue(1);
    pulseAnim.stopAnimation();
  };

  const onSpeechStart = (e: any) => {
    console.log('onSpeechStart:', e);
  };

  const onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd:', e);
    stopRecording();
  };

  const onSpeechResults = async (e: any) => {
    const userInput = e.value[0];
    if (userInput) {
      addMessage(userInput, 'user');
      await handleSendToAI(userInput);
    }
  };

  const onSpeechError = (e: any) => {
    console.error('Speech recognition error:', e);
    Alert.alert('Error', 'Failed to recognize speech. Please try again.');
    stopRecording();
  };

  const startRecording = async () => {
    try {
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      await Voice.start('en-US');
      startPulseAnimation();
    } catch (err) {
      console.error('Failed to start recording:', err);
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        setIsRecording(false);
        stopPulseAnimation();
        await recording.stopAndUnloadAsync();
        await Voice.stop();
        setRecording(null);
      }
    } catch (err) {
      console.error('Failed to stop recording:', err);
      Alert.alert('Error', 'Failed to stop recording');
    }
  };

  const addMessage = (text: string, type: 'user' | 'ai') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      type,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    
    // Scroll to bottom after message is added
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSendToAI = async (userInput: string) => {
    setIsProcessing(true);
    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY',
        {
          contents: [{ role: 'user', parts: [{ text: userInput }] }]
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        const aiResponse = response.data.candidates[0].content.parts[0].text;
        addMessage(aiResponse, 'ai');
        Speech.speak(aiResponse);
      } else {
        throw new Error('Invalid AI response format');
      }
    } catch (error) {
      console.error('Error fetching AI response:', error);
      Alert.alert('Error', 'Failed to get AI response');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Voice Assistant</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {messages.map((message) => (
          <View
            key={message.id}
            style={[
              styles.messageWrapper,
              message.type === 'user' ? styles.userMessageWrapper : styles.aiMessageWrapper,
            ]}
          >
            <View
              style={[
                styles.message,
                message.type === 'user' ? styles.userMessage : styles.aiMessage,
              ]}
            >
              <Text style={styles.messageText}>{message.text}</Text>
              <Text style={styles.timestamp}>
                {formatTimestamp(message.timestamp)}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        {isProcessing && (
          <View style={styles.processingContainer}>
            <ActivityIndicator color="#4A0887" />
            <Text style={styles.processingText}>Processing...</Text>
          </View>
        )}
        
        <TouchableOpacity
          onPress={isRecording ? stopRecording : startRecording}
          style={styles.recordButton}
          disabled={isProcessing}
        >
          <Animated.View
            style={[
              styles.recordButtonInner,
              { transform: [{ scale: isRecording ? pulseAnim : 1 }] },
            ]}
          >
            <Feather
              name={isRecording ? 'stop-circle' : 'mic'}
              size={30}
              color="white"
            />
          </Animated.View>
          <Text style={styles.recordButtonText}>
            {isRecording ? 'Stop' : 'Start Recording'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#4A0887',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  messagesContent: {
    paddingBottom: 20,
  },
  messageWrapper: {
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessageWrapper: {
    alignSelf: 'flex-end',
  },
  aiMessageWrapper: {
    alignSelf: 'flex-start',
  },
  message: {
    padding: 12,
    borderRadius: 15,
    elevation: 1,
  },
  userMessage: {
    backgroundColor: '#4A0887',
  },
  aiMessage: {
    backgroundColor: 'white',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  footer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  processingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  processingText: {
    marginLeft: 10,
    color: '#666',
  },
  recordButton: {
    alignItems: 'center',
  },
  recordButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4A0887',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  recordButtonText: {
    color: '#4A0887',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default AudioConversation;