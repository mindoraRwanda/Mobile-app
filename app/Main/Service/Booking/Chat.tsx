import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Image,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Sample message data
const initialMessages = [
  {
    id: 1,
    sender: 'doctor',
    message: 'Hello! How are you feeling today?',
    time: '9:00 AM',
    read: true,
  },
  {
    id: 2,
    sender: 'user',
    message: 'Hi Dr. Wilson, I\'ve been feeling better since our last session.',
    time: '9:02 AM',
    read: true,
  },
  {
    id: 3,
    sender: 'doctor',
    message: 'That\'s great to hear! Have you been practicing the relaxation techniques we discussed?',
    time: '9:03 AM',
    read: true,
  },
  {
    id: 4,
    sender: 'user',
    message: 'Yes, I\'ve been doing the breathing exercises every morning.',
    time: '9:05 AM',
    read: true,
  },
];

interface Message {
  id: number;
  sender: 'user' | 'doctor';
  message: string;
  time: string;
  read: boolean;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  const doctorInfo = {
    name: 'Dr. Sarah Wilson',
    specialty: 'Psychologist',
    status: 'Online',
    avatar: 'https://via.placeholder.com/60',
  };

  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const newMsg: Message = {
      id: messages.length + 1,
      sender: 'user',
      message: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');

    // Simulate doctor response after 1 second
    setTimeout(() => {
      const doctorResponse: Message = {
        id: messages.length + 2,
        sender: 'doctor',
        message: 'I\'m glad you\'re keeping up with the exercises. How do you feel they\'re helping?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false,
      };
      setMessages(prevMessages => [...prevMessages, doctorResponse]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.doctorInfo}>
          <Image
            source={{ uri: doctorInfo.avatar }}
            style={styles.avatar}
          />
          <View style={styles.doctorTextInfo}>
            <Text style={styles.doctorName}>{doctorInfo.name}</Text>
            <View style={styles.statusContainer}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>{doctorInfo.status}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          style={styles.videoCallButton}
          onPress={() => router.push('./VideoCallScreen')}
        >
          <MaterialIcons name="videocam" size={24} color="#2196F3" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg) => (
          <View 
            key={msg.id}
            style={[
              styles.messageWrapper,
              msg.sender === 'user' ? styles.userMessageWrapper : styles.doctorMessageWrapper
            ]}
          >
            <View 
              style={[
                styles.messageBubble,
                msg.sender === 'user' ? styles.userMessage : styles.doctorMessage
              ]}
            >
              <Text style={styles.messageText}>{msg.message}</Text>
              <View style={styles.messageFooter}>
                <Text style={styles.messageTime}>{msg.time}</Text>
                {msg.sender === 'user' && (
                  <MaterialIcons 
                    name={msg.read ? "done-all" : "done"} 
                    size={16} 
                    color={msg.read ? "#2196F3" : "#999"}
                  />
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.attachButton}>
          <MaterialIcons name="attach-file" size={24} color="#666" />
        </TouchableOpacity>
        
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          multiline
          maxLength={500}
        />
        
        <TouchableOpacity 
          style={[styles.sendButton, newMessage.trim() ? styles.sendButtonActive : {}]}
          onPress={sendMessage}
          disabled={!newMessage.trim()}
        >
          <Ionicons 
            name="send" 
            size={24} 
            color={newMessage.trim() ? "#2196F3" : "#999"} 
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  doctorInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  doctorTextInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
  videoCallButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  messageWrapper: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  doctorMessageWrapper: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  userMessage: {
    backgroundColor: '#E3F2FD',
    borderBottomRightRadius: 4,
  },
  doctorMessage: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
    marginRight: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    marginHorizontal: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    padding: 8,
  },
  sendButtonActive: {
    opacity: 1,
  },
});

export default Chat;