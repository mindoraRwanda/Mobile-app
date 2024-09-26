import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, Pressable, TextInput, ScrollView, Image } from 'react-native';
import axios from 'axios';
import * as Speech from 'expo-speech';
import LottieView from 'lottie-react-native';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function Home() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [spokenText, setSpokenText] = useState(''); // Track spoken text
  const scrollViewRef = useRef<ScrollView>(null);
  const lottieRef = useRef<LottieView>(null);

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

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    const newConversation: Message[] = [...conversation, { role: 'user', text: userInput }];
    setConversation(newConversation);
    setUserInput('');

    try {
      const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCtlJWloMQQ7KQCH7I4uk2eS4VWaSGXe84',
        {
          contents: [{ role: 'user', parts: [{ text: userInput }] }]
        },
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );

      if (response.data && response.data.candidates && response.data.candidates[0].content) {
        const aiResponse = response.data.candidates[0].content.parts[0].text;
        setConversation([...newConversation, { role: 'model', text: aiResponse }]);
        speakResponse(aiResponse);
      } else {
        setConversation([...newConversation, { role: 'model', text: "Sorry, I couldn't generate a response. Please try again." }]);
      }
    } catch (error) {
      console.error("Error fetching AI response: ", error);
      setConversation([...newConversation, { role: 'model', text: "An error occurred. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  const speakResponse = (text: string) => {
    setSpokenText(text); // Set spoken text to highlight it
    if (!isMuted) {
      Speech.speak(text, {
        language: 'en',
        pitch: 1.5,
        rate: 0.9,
        voice: 'com.apple.ttsbundle.Moira-compact',
        onDone: () => setSpokenText(''), // Reset spoken text after speaking
      });
      if (lottieRef.current) {
        lottieRef.current.play();
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/loki.jpeg')}
        style={styles.backgroundImage}
      />
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.title}>Mindora AI Companion</Text>
          <Text style={styles.subtitle}>
            Hey y'all! I'm Mindora, your friendly AI assistant. How can I help you today?
          </Text>
        </View>

        <ScrollView
          style={styles.conversationContainer}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {conversation.map((message, index) => (
            <View key={index} style={message.role === 'user' ? styles.userMessageContainer : styles.aiMessageContainer}>
              <Text style={message.role === 'user' ? styles.userMessage : styles.aiMessage}>
                {message.role === 'model' && message.text === spokenText ? (
                  <Text style={styles.highlight}>{message.text}</Text>
                ) : (
                  message.text
                )}
              </Text>
            </View>
          ))}
          {loading && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Mindora is thinking...</Text>
              <LottieView
                source={require('../../../assets/animation/clock-loading-animation.json')}
                autoPlay
                loop
                style={styles.loadingAnimation}
              />
            </View>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your question..."
            placeholderTextColor="#999"
            value={userInput}
            onChangeText={text => setUserInput(text)}
            onSubmitEditing={handleUserInput}
          />
          <Pressable
            style={({ pressed }) => [
              styles.sendButton,
              { backgroundColor: pressed ? '#A66DFF' : '#B79CFF' } // Purple shades
            ]}
            onPress={handleUserInput}
            disabled={loading || !userInput.trim()}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </Pressable>
          <Pressable
            style={styles.muteButton}
            onPress={toggleMute}
          >
            <Text style={styles.muteButtonText}>{isMuted ? 'Unmute' : 'Mute'}</Text>
          </Pressable>
        </View>

        <View style={styles.characterContainer}>
          <LottieView
            ref={lottieRef}
            source={require('../../../assets/animation/miss-minutes-animation.json')}
            style={styles.characterAnimation}
            loop={false}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.5, // Make the background image less distracting
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay for better text visibility
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A66DFF', // Purple
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#D5C6FF', // Lighter purple
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  conversationContainer: {
    flex: 1,
    marginBottom: 20,
  },
  userMessageContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  aiMessageContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  userMessage: {
    fontSize: 16,
    color: '#FFF',
    backgroundColor: '#4A90E2', // Adjust this color if needed
    padding: 10,
    borderRadius: 15,
    maxWidth: '80%',
    elevation: 2, // Add shadow to the user message for depth
  },
  aiMessage: {
    fontSize: 16,
    color: '#FFF', // Change text color to white
    backgroundColor: '#A66DFF', // Purple background for AI messages
    padding: 10,
    borderRadius: 15,
    maxWidth: '80%',
    elevation: 2, // Add shadow to the AI message for depth
  },
  highlight: {
    color: '#FFD700', // Highlight color (gold)
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#FFD700',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  loadingAnimation: {
    width: 100,
    height: 100,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#A66DFF', // Purple border
    borderRadius: 15,
    padding: 10,
    color: '#FFF', // Input text color
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Input background color
  },
  sendButton: {
    padding: 10,
    borderRadius: 15,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  muteButton: {
    marginLeft: 10,
    padding: 10,
  },
  muteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  characterContainer: {
    alignItems: 'center',
  },
  characterAnimation: {
    width: 150,
    height: 150,
  },
});
