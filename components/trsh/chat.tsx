import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
  ImageSourcePropType,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import Community from '../../Community';

interface User {
  id: string;
  name: string;
  image: ImageSourcePropType;
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
    image: require('../../../assets/ImgForScreen/team2.jpg'),
    lastSeen: 'Active now',
  },
  {
    id: '2',
    name: 'Uwirora Gilbert',
    image: require('../../../assets/ImgForScreen/team3.jpg'),
    lastSeen: 'Active 5h ago',
  },
  {
    id: '3',
    name: 'Murenzi Patrick',
    image: require('../../../assets/ImgForScreen/team5.jpg'),
    lastSeen: 'Active 2h ago',
  },
];

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need audio recording permissions to make this work!');
      }
    })();
  }, []);

  useEffect(() => {
    if (scrollViewRef.current && selectedUser) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [selectedUser, messages[selectedUser?.id]]);

  const sendMessage = (text: string, image?: string, audioUri?: string) => {
    if (selectedUser && (text.trim() || image || audioUri)) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: text.trim(),
        sender: 'me',
        timestamp: new Date(),
        image,
        audioUri,
      };
      setMessages(prevMessages => ({
        ...prevMessages,
        [selectedUser.id]: [...(prevMessages[selectedUser.id] || []), newMessage]
      }));
      setMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const openGallery = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      sendMessage('', result.assets[0].uri);
    }
  };

  const startRecording = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
      setRecordingDuration(0);

      const interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);

      recording.setOnRecordingStatusUpdate((status) => {
        if (status.isDoneRecording) {
          clearInterval(interval);
        }
      });
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    setIsRecording(false);
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      if (uri) {
        sendMessage('', undefined, uri);
      }
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  const playAudio = async (audioUri: string, messageId: string) => {
    try {
      if (playingAudio) {
        if (isPlaying && playingMessageId === messageId) {
          await playingAudio.pauseAsync();
          setIsPlaying(false);
        } else {
          await playingAudio.stopAsync();
          await playingAudio.unloadAsync();
          setPlayingAudio(null);
          setIsPlaying(false);
        }
      }

      if (!isPlaying || playingMessageId !== messageId) {
        const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
        setPlayingAudio(sound);
        setPlayingMessageId(messageId);
        setIsPlaying(true);
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            setIsPlaying(false);
            setPlayingMessageId(null);
            setPlayingAudio(null);
          }
        });
      }
    } catch (err) {
      console.error('Failed to play audio', err);
    }
  };

  const renderChatScreen = () => (
    <Modal
      animationType="slide"
      transparent={false}
      visible={!!selectedUser}
      onRequestClose={() => setSelectedUser(null)}
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedUser(null)}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Image style={styles.avatarSmall} source={selectedUser?.image} />
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>{selectedUser?.name}</Text>
            <Text style={styles.headerStatus}>{selectedUser?.lastSeen}</Text>
          </View>
          <TouchableOpacity style={styles.headerButton}>
            <FontAwesome name="phone" size={25} color="purple" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <FontAwesome name="video-camera" size={25} color="purple" />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.chatContainer}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.messagesContainer}
          >
            {selectedUser && messages[selectedUser.id]?.length > 0 ? (
              messages[selectedUser.id].map((msg) => (
                <View
                  key={msg.id}
                  style={[
                    styles.messageBubble,
                    msg.sender === 'me' ? styles.myMessage : styles.theirMessage,
                  ]}
                >
                  {msg.image && (
                    <Image source={{ uri: msg.image }} style={styles.messageImage} />
                  )}
                  {msg.text && <Text style={styles.messageText}>{msg.text}</Text>}
                  {msg.audioUri && (
                    <TouchableOpacity onPress={() => playAudio(msg.audioUri!, msg.id)}>
                      <Text style={styles.audioText}>
                        {isPlaying && playingMessageId === msg.id ? 'Pause Audio' : 'Play Audio'}
                      </Text>
                    </TouchableOpacity>
                  )}
                  <Text style={styles.messageTime}>{formatTime(msg.timestamp)}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.emptyStateText}>No messages yet. Start a conversation!</Text>
            )}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.inputButton} onPress={openGallery}>
              <Ionicons name="image" size={24} color="purple" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.inputButton}
              onPress={isRecording ? stopRecording : startRecording}
            >
              <Ionicons name={isRecording ? 'stop' : 'mic'} size={24} color={isRecording ? 'red' : 'purple'} />
              {isRecording && <Text style={styles.recordingDuration}>{recordingDuration}s</Text>}
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Message..."
              value={message}
              onChangeText={setMessage}
              multiline
            />
            <TouchableOpacity style={styles.emojiButton}>
              <Ionicons name="happy" size={24} color="purple" />
            </TouchableOpacity>
            {message.trim() ? (
              <TouchableOpacity style={styles.sendButton} onPress={() => sendMessage(message)}>
                <Ionicons name="send" size={24} color="purple" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.likeButton}>
                <Ionicons name="heart" size={24} color="purple" />
              </TouchableOpacity>
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.exercisesSection}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Community</Text>
          <TouchableOpacity onPress={() => {
            
          }}>
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
            <TouchableOpacity style={styles.exerciseButton} onPress={() => navigation.navigate('Online Experts' as never)}>
              <Image source={require('../../../assets/ImgForScreen/grp1.jpg')} style={styles.exerciseIcon} />
              <Text style={styles.exerciseLabel}>Consultants</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exerciseButton}>
              <Image source={require('../../../assets/ImgForScreen/team3.jpg')} style={styles.exerciseIcon} />
              <Text style={styles.exerciseLabel}>Helper</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exerciseButton}>
              <Image source={require('../../../assets/ImgForScreen/team3.jpg')} style={styles.exerciseIcon} />
              <Text style={styles.exerciseLabel}>Connections</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Text style={styles.communityText}>Chat </Text>
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
      {selectedUser && renderChatScreen()}
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
  communityText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    marginLeft: 15,
  },
  exercisesSection: {
    marginBottom: 16,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 8,
  },
  exercisesList: {
    flexDirection: 'row',
  },
  exerciseButton: {
    marginRight: 16,
    alignItems: 'center',
  },
  exerciseIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  exerciseLabel: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },
  searchContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  searchInput: {
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  chatList: {
    paddingHorizontal: 16,
  },
  userButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userStatus: {
    fontSize: 14,
    color: '#888888',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  closeButton: {
    marginRight: 16,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerStatus: {
    fontSize: 14,
    color: '#888888',
  },
  headerButton: {
    marginLeft: 16,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    padding: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'purple',
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',

  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  messageTime: {
    fontSize: 12,
    color: 'white',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#F5F5F5',
  },
  inputButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxHeight: 100,
  },
  emojiButton: {
    padding: 8,
  },
  sendButton: {
    padding: 8,
  },
  likeButton: {
    padding: 8,
  },
  emptyStateText: {
    textAlign: 'center',
    color: '#888888',
    marginTop: 24,
  },
  audioText: {
    color: 'whit',
    textDecorationLine: 'underline',
    marginBottom: 4,
  },
  recordingDuration: {
    fontSize: 12,
    color: 'green',
    marginTop: 4,
  },
});