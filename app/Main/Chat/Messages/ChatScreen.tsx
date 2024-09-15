import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ImageSourcePropType,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import { useRoute } from '@react-navigation/native';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: Date;
  image?: string;
  audioUri?: string;
}

const ChatScreen = () => {
  const route = useRoute();
  const router = useRouter();

  const { id, name, image, lastSeen } = route.params as {
    id: string;
    name: string;
    image: ImageSourcePropType;
    lastSeen?: string;
  };

  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [playingAudio, setPlayingAudio] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages[id]]);

  const sendMessage = (text: string, image?: string, audioUri?: string) => {
    if (text.trim() || image || audioUri) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: text.trim(),
        sender: 'me',
        timestamp: new Date(),
        image,
        audioUri,
      };
      setMessages((prevMessages) => ({
        ...prevMessages,
        [id]: [...(prevMessages[id] || []), newMessage],
      }));
      setMessage('');
    }
  };

  const openGallery = async () => {
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
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access microphone was denied');
        return;
      }

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        sendMessage('', '', uri!);
        setRecording(null);
        setIsRecording(false);
      }
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  const playAudio = async (audioUri: string, messageId: string) => {
    if (playingAudio) {
      await playingAudio.unloadAsync();
      setPlayingAudio(null);
      setIsPlaying(false);
      setPlayingMessageId(null);
    }

    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
    setPlayingAudio(sound);
    setIsPlaying(true);
    setPlayingMessageId(messageId);

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setIsPlaying(false);
        setPlayingMessageId(null);
      }
    });

    await sound.playAsync();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Image style={styles.avatarSmall} source={image} />
        <View style={styles.headerInfo}>
          <Text style={styles.headerName}>{name}</Text>
          <Text style={styles.headerStatus}>{lastSeen}</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.chatContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView ref={scrollViewRef} contentContainerStyle={styles.messagesContainer}>
          {messages[id]?.length > 0 ? (
            messages[id].map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageBubble,
                  msg.sender === 'me' ? styles.myMessage : styles.theirMessage,
                ]}
              >
                {msg.image && <Image source={{ uri: msg.image }} style={styles.messageImage} />}
                {msg.text && <Text style={styles.messageText}>{msg.text}</Text>}
                {msg.audioUri && (
                  <TouchableOpacity onPress={() => playAudio(msg.audioUri!, msg.id)}>
                    <Ionicons
                      name={isPlaying && playingMessageId === msg.id ? 'pause' : 'play'}
                      size={24}
                      color="purple"
                    />
                  </TouchableOpacity>
                )}
                <Text style={styles.timestamp}>{msg.timestamp.toLocaleTimeString()}</Text>
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
          <TouchableOpacity onPress={isRecording ? stopRecording : startRecording}>
            <FontAwesome name={isRecording ? 'stop' : 'microphone'} size={24} color="purple" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type your message here..."
            value={message}
            onChangeText={setMessage}
            onSubmitEditing={() => sendMessage(message)}
          />
          <TouchableOpacity onPress={() => sendMessage(message)}>
            <FontAwesome name="send" size={24} color="purple" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginLeft: 10,
  },
  headerName: {
    fontWeight: 'bold',
  },
  headerStatus: {
    color: '#888',
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    padding: 10,
  },
  messageBubble: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#d0f0c0',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#e6e6e6',
    alignSelf: 'flex-start',
  },
  messageImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 10,
    color: '#888',
    marginTop: 5,
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
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  noMessages: {
    alignSelf: 'center',
    marginTop: 20,
    color: '#888',
  },
});

export default ChatScreen;
