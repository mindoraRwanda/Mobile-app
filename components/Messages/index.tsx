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


import React, { useRef, useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  Animated, 
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

interface FormattedText {
  type: 'text' | 'bold' | 'italic' | 'header' | 'list-item';
  content: string;
}

const { width } = Dimensions.get('window');

const TextConversation: React.FC = () => {
  // ... (previous state and useEffect remain the same)

  

  const FormattedContent = ({ text }: { text: string }) => {
    const formattedParts = parseMarkdown(text);

    return (
      <Text>
        {formattedParts.map((part, index) => {
          switch (part.type) {
            case 'header':
              return (
                <Text key={index} style={styles.headerText}>
                  {part.content}
                </Text>
              );
            case 'bold':
              return (
                <Text key={index} style={styles.boldText}>
                  {part.content}
                </Text>
              );
            case 'list-item':
              return (
                <Text key={index} style={styles.listItem}>
                  • {part.content}
                </Text>
              );
            default:
              return <Text key={index}>{part.content}</Text>;
          }
        })}
      </Text>
    );
  };

  const MessageBubble = ({ message }: { message: Message }) => (
    <View style={message.role === 'user' ? styles.userMessageContainer : styles.aiMessageContainer}>
      <View style={styles.messageContent}>
        <View style={message.role === 'user' ? styles.userMessage : styles.aiMessage}>
          {message.role === 'user' ? (
            <Text style={styles.userMessageText}>{message.text}</Text>
          ) : (
            <FormattedContent text={message.text} />
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

  // ... (rest of the component remains the same)

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
            <Text style={styles.loadingText}>AI is thinking...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={userInput}
          onChangeText={setUserInput}
          placeholder="Type your message..."
          placeholderTextColor="#888"
          multiline
          maxHeight={100}
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
  // ... (previous styles remain the same)

  userMessageText: {
    color: '#fff',
    fontSize: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#000',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  listItem: {
    marginLeft: 8,
    marginVertical: 2,
    color: '#000',
  },
  aiMessage: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userMessage: {
    backgroundColor: '#4A0887',
    padding: 12,
    borderRadius: 20,
    borderBottomRightRadius: 4,
  },
});

export default TextConversation;