import React, { useRef, useState, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  Animated, 
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Text
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Markdown from 'react-native-markdown-display';

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

const { width } = Dimensions.get('window');

const TextConversation: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);

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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;
    
    Keyboard.dismiss();
    
    const newMessage: Message = { 
      role: 'user', 
      text: userInput,
      timestamp: new Date()
    };
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
        setConversation([...newConversation, { 
          role: 'model', 
          text: aiResponse,
          timestamp: new Date()
        }]);
      } else {
        setConversation([...newConversation, { 
          role: 'model', 
          text: "Sorry, I couldn't generate a response. Please try again.",
          timestamp: new Date()
        }]);
      }
    } catch (error) {
      console.error("Error fetching AI response: ", error);
      setConversation([...newConversation, { 
        role: 'model', 
        text: "An error occurred. Please try again later.",
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const MessageBubble = ({ message }: { message: Message }) => (
    <View style={message.role === 'user' ? styles.userMessageContainer : styles.aiMessageContainer}>
      <View style={styles.messageContent}>
        <View style={message.role === 'user' ? styles.userMessage : styles.aiMessage}>
          {message.role === 'user' ? (
            <Text style={styles.userMessageText}>{message.text}</Text>
          ) : (
            <Markdown style={markdownStyles}>{message.text}</Markdown>
          )}
        </View>
        <Text style={styles.timestamp}>{formatTime(message.timestamp)}</Text>
      </View>
      {message.role === 'user' && (
        <View style={styles.userAvatar}>
          <Icon name="person" size={16} color="#fff" />
        </View>
      )}
      {message.role === 'model' && (
        <View style={styles.aiAvatar}>
          <Icon name="smart-toy" size={16} color="#fff" />
        </View>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        style={styles.conversationContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {conversation.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))}
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#4A0887" />
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={[styles.input, { maxHeight: 100 }]}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type your message..."
          placeholderTextColor="#888"
          multiline
          returnKeyType="send"
          onSubmitEditing={handleSend}
        />
        <Pressable 
          style={[styles.sendButton, !userInput.trim() && styles.sendButtonDisabled]} 
          onPress={handleSend}
          disabled={!userInput.trim()}
        >
          <Icon name="send" size={24} color={userInput.trim() ? '#fff' : '#A0A0A0'} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#4A0887',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  conversationContainer: {
    flex: 1,
    padding: 16,
  },
  messageContent: {
    flex: 1,
    maxWidth: '80%',
  },
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginVertical: 4,
    paddingLeft: width * 0.2,
  },
  aiMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginVertical: 4,
    paddingRight: width * 0.2,
  },
  userMessage: {
    backgroundColor: '#4A0887',
    color: '#fff',
    padding: 12,
    borderRadius: 20,
    borderBottomRightRadius: 4,
    fontSize: 16,
  },
  aiMessage: {
    backgroundColor: '#fff',
    color: '#000',
    padding: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'right',
  },
  userAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4A0887',
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#666',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#E1E8ED',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderColor: '#E1E8ED',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: '#fff',
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#4A0887',
    padding: 12,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E1E8ED',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignSelf: 'center',
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  loadingText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  userMessageText: {
    color: '#fff',
    fontSize: 16,
  },
});

const markdownStyles = StyleSheet.create({
  body: {
    color: '#000',
    fontSize: 16,
  },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heading3: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  listItemBullet: {
    fontSize: 20,
    marginRight: 10,
  },
  listItemText: {
    fontSize: 16,
  },
  blockquote: {
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 10,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#4A0887',
  },
  strong: {
    fontWeight: 'bold',
  },
  code: {
    backgroundColor: '#f5f5f5',
    padding: 5,
    borderRadius: 5,
    fontFamily: 'monospace',
  },
});

export default TextConversation;