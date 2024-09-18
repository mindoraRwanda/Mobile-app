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

// Constants
const ICON_SIZE = 24;
const PURPLE_COLOR = 'purple';

// Message Interface
interface Message {
  id: string;
  text: string;
  sender: 'me' | 'them';
  timestamp: Date;
  image?: string;
  audioUri?: string;
}

// Header Component
const Header = ({ name, image, lastSeen, onBackPress }) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.closeButton} onPress={onBackPress}>
      <Ionicons name="arrow-back" size={ICON_SIZE} color="black" />
    </TouchableOpacity>
    <Image style={styles.avatarSmall} source={image} />
    <View style={styles.headerInfo}>
      <Text style={styles.headerName}>{name}</Text>
      <Text style={styles.headerStatus}>{lastSeen}</Text>
    </View>
  </View>
);

// Message Bubble Component
const MessageBubble = ({ msg, isPlaying, playingMessageId, playAudio }) => (
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
          size={ICON_SIZE}
          color={PURPLE_COLOR}
        />
      </TouchableOpacity>
    )}
    <Text style={styles.timestamp}>{msg.timestamp.toLocaleTimeString()}</Text>
  </View>
);

const ChatScreen = () => {
  const route = useRoute();
  const router = useRouter();
  const { id, name, image, lastSeen } = route.params as {
    id: string;
    name: string;
    image: ImageSourcePropType;
    lastSeen?: string;
  };

  const [state, setState] = useState({
    message: '',
    messages: {} as { [key: string]: Message[] },
    recording: null as Audio.Recording | null,
    isRecording: false,
    playingAudio: null as Audio.Sound | null,
    isPlaying: false,
    playingMessageId: null as string | null,
  });

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [state.messages[id]]);

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
      setState((prevState) => ({
        ...prevState,
        messages: {
          ...prevState.messages,
          [id]: [...(prevState.messages[id] || []), newMessage],
        },
        message: '',
      }));
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
      setState((prevState) => ({
        ...prevState,
        recording,
        isRecording: true,
      }));
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (state.recording) {
        await state.recording.stopAndUnloadAsync();
        const uri = state.recording.getURI();
        sendMessage('', '', uri!);
        setState((prevState) => ({
          ...prevState,
          recording: null,
          isRecording: false,
        }));
      }
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  const playAudio = async (audioUri: string, messageId: string) => {
    if (state.playingAudio) {
      await state.playingAudio.unloadAsync();
      setState((prevState) => ({
        ...prevState,
        playingAudio: null,
        isPlaying: false,
        playingMessageId: null,
      }));
    }

    const { sound } = await Audio.Sound.createAsync({ uri: audioUri });
    setState((prevState) => ({
      ...prevState,
      playingAudio: sound,
      isPlaying: true,
      playingMessageId: messageId,
    }));

    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        setState((prevState) => ({
          ...prevState,
          isPlaying: false,
          playingMessageId: null,
        }));
      }
    });

    await sound.playAsync();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header name={name} image={image} lastSeen={lastSeen} onBackPress={() => router.back()} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.chatContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <ScrollView ref={scrollViewRef} contentContainerStyle={styles.messagesContainer}>
          {state.messages[id]?.length > 0 ? (
            state.messages[id].map((msg) => (
              <MessageBubble
                key={msg.id}
                msg={msg}
                isPlaying={state.isPlaying}
                playingMessageId={state.playingMessageId}
                playAudio={playAudio}
              />
            ))
          ) : (
            <Text style={styles.noMessages}>No messages yet...</Text>
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={openGallery}>
            <FontAwesome name="image" size={ICON_SIZE} color={PURPLE_COLOR} />
          </TouchableOpacity>
          <TouchableOpacity onPress={state.isRecording ? stopRecording : startRecording}>
            <FontAwesome name={state.isRecording ? 'stop' : 'microphone'} size={ICON_SIZE} color={PURPLE_COLOR} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type your message here..."
            value={state.message}
            onChangeText={(text) => setState((prevState) => ({ ...prevState, message: text }))}
            onSubmitEditing={() => sendMessage(state.message)}
          />
          <TouchableOpacity onPress={() => sendMessage(state.message)}>
            <FontAwesome name="send" size={ICON_SIZE} color={PURPLE_COLOR} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 90,
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