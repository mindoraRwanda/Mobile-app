// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   FlatList,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import UserSelectionModal from './UserSelectionModal';
// import { Ionicons } from '@expo/vector-icons'; // For icons

// interface User {
//   id: string;
//   firstName: string | null;
//   lastName: string | null;
//   role: string;
//   profileImage: string | null;
// }

// const Index = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
//   const router = useRouter();

//   const handleUserPress = (user: User) => {
//     if (user && user.id) {
//       router.push({
//         pathname: '/Main/Chat/Messages/ChatScreen',
//         params: { 
//           id: user.id, 
//           name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'Unknown User', 
//           image: user.profileImage || '../../../../assets/images/null.jpg', 
//         },
//       });
//     }
//   };

//   const handleSelectUser = (user: User) => {
//     if (user && user.id) {
//       setSelectedUsers((prevUsers) => [...prevUsers, user]);
//     }
//   };

//   const renderUserItem = ({ item }: { item: User }) => {
//     // Ensure the user object is defined and contains necessary properties
//     if (!item || typeof item !== 'object' || !item.firstName || !item.lastName) {
//       return null;
//     }

//     const userName = `${item.firstName ?? ''} ${item.lastName ?? ''}`.trim() || 'Unknown User';
//     const userRole = item.role || 'No role specified';

//     return (
//       <TouchableOpacity style={styles.userCard} onPress={() => handleUserPress(item)}>
//         <Image
//           source={{ uri: item.profileImage || '../../../../assets/images/null.jpg' }}
//           style={styles.avatar}
//         />
//         <View style={styles.userInfo}>
//           <Text style={styles.userName}>{userName}</Text>
//           <Text style={styles.userRole}>{userRole}</Text>
//         </View>
//         <Text style={styles.userStatus}>Online</Text>
//       </TouchableOpacity>
//     );
//   };

//   // Filter users safely, ensuring they have valid properties
//   const filteredUsers = selectedUsers.filter(
//     user => user && user.id && user.firstName && user.lastName && user.role
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchContainer}>
//         <Ionicons name="search" size={24} color="#888" style={styles.searchIcon} />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search contacts..."
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//       </View>

//       <FlatList
//         data={filteredUsers}
//         keyExtractor={(user) => user.id}
//         renderItem={renderUserItem}
//       />

//       <TouchableOpacity style={styles.newChatButton} onPress={() => setIsModalVisible(true)}>
//         <Ionicons name="add" size={20} color="#fff" />
//         <Text style={styles.newChatButtonText}>New Chat</Text>
//       </TouchableOpacity>

//       <UserSelectionModal
//         visible={isModalVisible}
//         onClose={() => setIsModalVisible(false)}
//         onSelectUser={handleSelectUser}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f2f5',
//     paddingHorizontal: 15,
//     paddingVertical: 20,
//     marginTop: 79,
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 10,
//     borderRadius: 25,
//     marginVertical: 10,
//     elevation: 5,
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//   },
//   newChatButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: '#4A0887',
//     padding: 15,
//     borderRadius: 50,
//     flexDirection: 'row',
//     alignItems: 'center',
//     elevation: 8,
//   },
//   newChatButtonText: {
//     color: '#fff',
//     marginLeft: 10,
//     fontWeight: 'bold',
//   },
//   userCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 15,
//     marginVertical: 5,
//     borderRadius: 10,
//     elevation: 2,
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   userInfo: {
//     flex: 1,
//     marginLeft: 10,
//   },
//   userName: {
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
//   userRole: {
//     color: '#888',
//     fontSize: 14,
//   },
//   userStatus: {
//     fontSize: 12,
//     color: '#34C759',
//   },
// });

// export default Index;


// import React, { useRef, useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   ScrollView, 
//   StyleSheet, 
//   TextInput, 
//   Pressable, 
//   Animated, 
//   ActivityIndicator,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   Dimensions
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import axios from 'axios';

// interface Message {
//   role: 'user' | 'model';
//   text: string;
//   timestamp: Date;
// }

// interface FormattedText {
//   type: 'text' | 'bold' | 'italic' | 'header' | 'list-item';
//   content: string;
// }

// const { width } = Dimensions.get('window');

// const TextConversation: React.FC = () => {
//   // ... (previous state and useEffect remain the same)

  

//   const FormattedContent = ({ text }: { text: string }) => {
//     const formattedParts = parseMarkdown(text);

//     return (
//       <Text>
//         {formattedParts.map((part, index) => {
//           switch (part.type) {
//             case 'header':
//               return (
//                 <Text key={index} style={styles.headerText}>
//                   {part.content}
//                 </Text>
//               );
//             case 'bold':
//               return (
//                 <Text key={index} style={styles.boldText}>
//                   {part.content}
//                 </Text>
//               );
//             case 'list-item':
//               return (
//                 <Text key={index} style={styles.listItem}>
//                   • {part.content}
//                 </Text>
//               );
//             default:
//               return <Text key={index}>{part.content}</Text>;
//           }
//         })}
//       </Text>
//     );
//   };

//   const MessageBubble = ({ message }: { message: Message }) => (
//     <View style={message.role === 'user' ? styles.userMessageContainer : styles.aiMessageContainer}>
//       <View style={styles.messageContent}>
//         <View style={message.role === 'user' ? styles.userMessage : styles.aiMessage}>
//           {message.role === 'user' ? (
//             <Text style={styles.userMessageText}>{message.text}</Text>
//           ) : (
//             <FormattedContent text={message.text} />
//           )}
//         </View>
//         <Text style={styles.timestamp}>{formatTime(message.timestamp)}</Text>
//       </View>
//       {message.role === 'user' && (
//         <View style={styles.userAvatar}>
//           <Icon name="person" size={16} color="#fff" />
//         </View>
//       )}
//       {message.role === 'model' && (
//         <View style={styles.aiAvatar}>
//           <Icon name="smart-toy" size={16} color="#fff" />
//         </View>
//       )}
//     </View>
//   );

//   // ... (rest of the component remains the same)

//   return (
//     <KeyboardAvoidingView 
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       style={styles.container}
//       keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
//     >
//       <ScrollView
//         style={styles.conversationContainer}
//         ref={scrollViewRef}
//         onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
//       >
//         {conversation.map((message, index) => (
//           <MessageBubble key={index} message={message} />
//         ))}
//         {loading && (
//           <View style={styles.loadingContainer}>
//             <ActivityIndicator size="small" color="#4A0887" />
//             <Text style={styles.loadingText}>AI is thinking...</Text>
//           </View>
//         )}
//       </ScrollView>

//       <View style={styles.inputContainer}>
//         <TextInput
//           ref={inputRef}
//           style={styles.input}
//           value={userInput}
//           onChangeText={setUserInput}
//           placeholder="Type your message..."
//           placeholderTextColor="#888"
//           multiline
//           maxHeight={100}
//           returnKeyType="send"
//           onSubmitEditing={handleSend}
//         />
//         <Pressable 
//           style={[styles.sendButton, !userInput.trim() && styles.sendButtonDisabled]} 
//           onPress={handleSend}
//           disabled={!userInput.trim()}
//         >
//           <Icon name="send" size={24} color={userInput.trim() ? '#fff' : '#A0A0A0'} />
//         </Pressable>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   // ... (previous styles remain the same)

//   userMessageText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 8,
//     color: '#000',
//   },
//   boldText: {
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   listItem: {
//     marginLeft: 8,
//     marginVertical: 2,
//     color: '#000',
//   },
//   aiMessage: {
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 20,
//     borderBottomLeftRadius: 4,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   userMessage: {
//     backgroundColor: '#4A0887',
//     padding: 12,
//     borderRadius: 20,
//     borderBottomRightRadius: 4,
//   },
// });

// export default TextConversation;

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
  Dimensions,
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
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const waveAnim1 = useRef(new Animated.Value(0)).current;
  const waveAnim2 = useRef(new Animated.Value(0)).current;
  const waveAnim3 = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    setupVoice();
    return cleanup;
  }, []);

  // ... (keep existing voice setup and cleanup functions)

  const startWaveAnimation = () => {
    setIsSpeaking(true);
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(waveAnim1, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(waveAnim1, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(waveAnim2, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(waveAnim2, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(waveAnim3, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(waveAnim3, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();
  };

  const stopWaveAnimation = () => {
    setIsSpeaking(false);
    waveAnim1.setValue(0);
    waveAnim2.setValue(0);
    waveAnim3.setValue(0);
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
        startWaveAnimation();
        Speech.speak(aiResponse, {
          onDone: () => {
            stopWaveAnimation();
          },
        });
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

  // ... (keep other existing helper functions)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Voice Assistant</Text>
        <TouchableOpacity style={styles.closeButton}>
          <Feather name="x" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        <View style={styles.aiVisualizerContainer}>
          <Animated.View
            style={[
              styles.wave,
              {
                transform: [
                  {
                    scale: waveAnim1.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.5],
                    }),
                  },
                ],
                opacity: waveAnim1.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.3, 0],
                }),
              },
            ]}
          />
          <Animated.View
            style={[
              styles.wave,
              {
                transform: [
                  {
                    scale: waveAnim2.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.3],
                    }),
                  },
                ],
                opacity: waveAnim2.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 0],
                }),
              },
            ]}
          />
          <Animated.View
            style={[
              styles.wave,
              {
                transform: [
                  {
                    scale: waveAnim3.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.1],
                    }),
                  },
                ],
                opacity: waveAnim3.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 0],
                }),
              },
            ]}
          />
          <View style={styles.aiCore}>
            <Feather name="radio" size={24} color="white" />
          </View>
        </View>

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
              <Text style={[
                styles.messageText,
                message.type === 'user' ? styles.userMessageText : styles.aiMessageText,
              ]}>
                {message.text}
              </Text>
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
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={isRecording ? stopRecording : startRecording}
            style={[styles.button, styles.recordButton]}
            disabled={isProcessing}
          >
            <Animated.View
              style={[
                styles.buttonInner,
                { transform: [{ scale: isRecording ? pulseAnim : 1 }] },
              ]}
            >
              <Feather
                name={isRecording ? 'mic-off' : 'mic'}
                size={24}
                color="white"
              />
            </Animated.View>
            <Text style={styles.buttonText}>
              {isRecording ? 'Stop' : 'Speak'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.closeButtonBottom]}
            onPress={() => Alert.alert('Close', 'Are you sure you want to close?')}
          >
            <View style={[styles.buttonInner, styles.closeButtonInner]}>
              <Feather name="x" size={24} color="white" />
            </View>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  header: {
    padding: 20,
    backgroundColor: '#4A0887',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  closeButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  messagesContent: {
    paddingBottom: 20,
  },
  aiVisualizerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    marginVertical: 20,
  },
  wave: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4A0887',
  },
  aiCore: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A0887',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
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
    backgroundColor: '#2A2A2A',
    borderWidth: 1,
    borderColor: '#4A0887',
  },
  messageText: {
    fontSize: 16,
  },
  userMessageText: {
    color: 'white',
  },
  aiMessageText: {
    color: '#E0E0E0',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  footer: {
    padding: 20,
    backgroundColor: '#2A2A2A',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    width: 100,
  },
  buttonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A0887',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 5,
  },
  closeButtonInner: {
    backgroundColor: '#FF4444',
  },
  buttonText: {
    color: '#E0E0E0',
    fontSize: 14,
    fontWeight: '600',
  },
  processingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  processingText: {
    marginLeft: 10,
    color: '#E0E0E0',
  },
});

export default AudioConversation;