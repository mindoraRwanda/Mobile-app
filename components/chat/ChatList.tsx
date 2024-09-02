// File: components/Chat/ChatList.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface User {
  id: string;
  name: string;
  image: any; // Using 'any' for image type to accommodate require() syntax
  lastSeen?: string;
}

interface ChatListProps {
  users: User[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setSelectedUser: (user: User) => void;
}

const ChatList: React.FC<ChatListProps> = ({ users, searchQuery, setSearchQuery, setSelectedUser }) => {
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <Text style={styles.communityText}>Chat</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search helpers..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <ScrollView contentContainerStyle={styles.chatList}>
        {filteredUsers.map((user) => (
          <TouchableOpacity key={user.id} style={styles.userButton} onPress={() => setSelectedUser(user)}>
            <Image style={styles.avatar} source={user.image} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userStatus}>{user.lastSeen}</Text>
            </View>
            <Ionicons name="chatbubble-ellipses" size={24} color="purple" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (styles from the original component)
});

export default ChatList;

// File: components/Chat/ChatScreen.tsx
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, TextInput, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';

interface User {
  id: string;
  name: string;
  image: any;
  lastSeen?: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: Date;
  image?: string;
  audioUri?: string;
}

interface ChatScreenProps {
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
  messages: { [key: string]: Message[] };
  setMessages: React.Dispatch<React.SetStateAction<{ [key: string]: Message[] }>>;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ selectedUser, setSelectedUser, messages, setMessages }) => {
  const [message, setMessage] = useState<string>('');
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need audio recording permissions to make this work!');
      }
    })();
  }, []);

  // ... (rest of the functions from the original component)

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={!!selectedUser}
      onRequestClose={() => setSelectedUser(null)}
    >
      {/* ... (rest of the JSX from the original component) */}
    </Modal>
  );
};

const styles = StyleSheet.create({
  // ... (styles from the original component)
});

export default ChatScreen;

// File: components/Chat/CommunitySection.tsx
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Community from '../../Community';

const CommunitySection: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.exercisesSection}>
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Community</Text>
        <TouchableOpacity onPress={() => {}}>
          <Community />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={styles.listContent}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.exercisesList}>
          <TouchableOpacity style={styles.exerciseButton} onPress={() => navigation.navigate('Community' as never)}>
            <Image source={require('../../../assets/ImgForScreen/grp1.jpg')} style={styles.exerciseIcon} />
            <Text style={styles.exerciseLabel}>Communities</Text>
          </TouchableOpacity>
          {/* ... (other buttons) */}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (styles from the original component)
});

export default CommunitySection;

// File: app/main/chat.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import CommunitySection from '../../components/Chat/CommunitySection';
import ChatList from '../../components/Chat/ChatList';
import ChatScreen from '../../components/Chat/ChatScreen';

interface User {
  id: string;
  name: string;
  image: any;
  lastSeen?: string;
}

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: Date;
  image?: string;
  audioUri?: string;
}

const users: User[] = [
  {
    id: '1',
    name: 'Noella Nizigama',
    image: require('../../assets/ImgForScreen/team2.jpg'),
    lastSeen: 'Active now',
  },
  {
    id: '2',
    name: 'Uwirora Gilbert',
    image: require('../../assets/ImgForScreen/team3.jpg'),
    lastSeen: 'Active 5h ago',
  },
  {
    id: '3',
    name: 'Murenzi Patrick',
    image: require('../../assets/ImgForScreen/team5.jpg'),
    lastSeen: 'Active 2h ago',
  },
];

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <CommunitySection />
      <ChatList
        users={users}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setSelectedUser={setSelectedUser}
      />
      <ChatScreen
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        messages={messages}
        setMessages={setMessages}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
    marginTop: 20,
  },
  // ... (other styles)
});