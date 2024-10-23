import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Pressable, Animated, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const TextConversation: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

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

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessage: Message = { role: 'user', text: userInput };
    const newConversation = [...conversation, newMessage];
    setConversation(newConversation);
    setUserInput('');
    setLoading(true);

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

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.conversationContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {conversation.map((message, index) => (
          <View key={index} style={message.role === 'user' ? styles.userMessageContainer : styles.aiMessageContainer}>
            <Text style={message.role === 'user' ? styles.userMessage : styles.aiMessage}>
              {message.text}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type your message..."
          placeholderTextColor="#888"
        />
        <Pressable style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </Pressable>
      </View>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A0887" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  conversationContainer: {
    flex: 1,
    padding: 10,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  aiMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    color: '#000',
  },
  aiMessage: {
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E1E8ED',
    backgroundColor: '#FFF',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#FFF',
  },
  sendButton: {
    backgroundColor: '#4A0887',
    padding: 10,
    borderRadius: 10,
  },
  sendButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -50 }],
  },
});

export default TextConversation;