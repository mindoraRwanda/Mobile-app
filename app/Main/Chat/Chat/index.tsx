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
    image: require('../../../../assets/ImgForScreen/team2.jpg'),
    lastSeen: 'Active now',
  },
  {
    id: '2',
    name: 'Uwirora Gilbert',
    image: require('../../../../assets/ImgForScreen/team3.jpg'),
    lastSeen: 'Active 5h ago',
  },
  {
    id: '3',
    name: 'Murenzi Patrick',
    image: require('../../../../assets/ImgForScreen/team5.jpg'),
    lastSeen: 'Active 2h ago',
  },
];

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
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

    if (!permissionResult.granted) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
        setRecordingDuration(prev => prev + 1);
      }, 1000);

      recording.setOnRecordingStatusUpdate(status => {
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
        sound.setOnPlaybackStatusUpdate(status => {
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
                    <TouchableOpacity onPress={() => playAudio(msg.audioUri, msg.id)}>
                      <Text style={styles.audioText}>
                        {isPlaying && playingMessageId === msg.id ? 'Pause Audio' : 'Play Audio'}
                      </Text>
                    </TouchableOpacity>
                  )}
                  <Text style={styles.messageTime}>{formatTime(msg.timestamp)}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noMessages}>No messages yet...</Text>
            )}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TouchableOpacity onPress={openGallery}>
              <FontAwesome name="image" size={24} color="purple" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Type your message here..."
              value={message}
              onChangeText={setMessage}
              onSubmitEditing={() => sendMessage(message)}
            />
            <TouchableOpacity
              onPress={isRecording ? stopRecording : startRecording}
              style={styles.recordButton}
            >
              <Ionicons
                name={isRecording ? 'stop-circle' : 'mic-circle'}
                size={36}
                color="purple"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => sendMessage(message)}
              style={styles.sendButton}
            >
              <Ionicons name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
        <View style={styles.bottomSection}>
          <View style={styles.line} />

        </View>
      </SafeAreaView>
    </Modal>
  );

  const renderUserList = () => (
    <View style={styles.userListContainer}>
      {users.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map(user => (
          <TouchableOpacity
            key={user.id}
            style={styles.userListItem}
            onPress={() => setSelectedUser(user)}
          >
            <Image source={user.image} style={styles.avatar} />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userStatus}>{user.lastSeen}</Text>
            </View>
          </TouchableOpacity>
        ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {renderUserList()}
      {renderChatScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  userListContainer: {
    flex: 1,
  },
  userListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
  userStatus: {
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  closeButton: {
    marginRight: 10,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  headerName: {
    fontWeight: 'bold',
  },
  headerStatus: {
    color: '#888',
  },
  headerButton: {
    marginLeft: 10,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    padding: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  myMessage: {
    backgroundColor: '#e1ffc7',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#f1f0f0',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  audioText: {
    color: 'blue',
    fontSize: 16,
    marginVertical: 5,
  },
  messageTime: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-end',
  },
  noMessages: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
    marginHorizontal: 5,
  },
  recordButton: {
    marginHorizontal: 5,
  },
  sendButton: {
    backgroundColor: 'purple',
    borderRadius: 20,
    padding: 10,
    marginLeft: 10,
  },
  bottomSection: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  communityButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'purple',
    borderRadius: 20,
    alignItems: 'center',
  },
  communityButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Chat;
