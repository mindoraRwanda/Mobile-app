import React, { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Modal, TouchableOpacity, ScrollView, SafeAreaView, Text, Image, StyleSheet, ImageSourcePropType, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Audio from 'expo-av';
import JoinModal from './JoinModal';

type CommunityType = {
    id: string;
    name: string;
    image: ImageSourcePropType;
    description: string;
};

const communities: CommunityType[] = [
    { id: '1', name: 'Communities', image: require('../assets/ImgForScreen/team5.jpg'), description: 'This is Community 1' },
    { id: '2', name: 'Consultants', image: require('../assets/ImgForScreen/grp1.jpg'), description: 'This is Consultants Community' },
    { id: '3', name: 'Helper', image: require('../assets/ImgForScreen/team2.jpg'), description: 'This is Helper Community' },
    { id: '4', name: 'Connections', image: require('../assets/ImgForScreen/team3.jpg'), description: 'This is Community for connection' }
];

type Message = {
    id: string;
    text: string;
    sender: string;
    timestamp: Date;
    image?: string;
    audioUri?: string;
};

const Community: React.FC = (): JSX.Element => {
    const [openCommunity, setOpenCommunity] = useState<boolean>(false);
    const [selectedCommunity, setSelectedCommunity] = useState<CommunityType | null>(null);
    const [joinedCommunities, setJoinedCommunities] = useState<Record<string, boolean>>({});
    const [chatModalVisible, setChatModalVisible] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
    const [recording, setRecording] = useState<Audio.Recording | null>(null);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [playingAudio, setPlayingAudio] = useState<Audio.Sound | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
    const [recordingDuration, setRecordingDuration] = useState<number>(0);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const scrollViewRef = useRef<ScrollView>(null);
    const [communityToJoin, setCommunityToJoin] = useState<CommunityType | null>(null);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState<boolean>(false);

    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need audio recording permissions to make this work!');
            }
        })();
    }, []);

    useEffect(() => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

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
            setMessages(prevMessages => ({
                ...prevMessages,
                [selectedCommunity?.id || '']: [...(prevMessages[selectedCommunity?.id || ''] || []), newMessage]
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

    const handleJoinRequest = (community: CommunityType) => {
        setCommunityToJoin(community);
        setConfirmationModalVisible(true);
    };

    const confirmJoin = () => {
        if (communityToJoin) {
            setJoinedCommunities(prevState => ({
                ...prevState,
                [communityToJoin.id]: true
            }));
            setConfirmationModalVisible(false);
        }
    };

    const renderChatScreen = () => (
        <Modal
            animationType="slide"
            transparent={false}
            visible={!!selectedCommunity}
            onRequestClose={() => setSelectedCommunity(null)}
        >
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setSelectedCommunity(null)}
                    >
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Image style={styles.avatarSmall} source={selectedCommunity?.image} />
                    <View style={styles.headerInfo}>
                        <Text style={styles.headerName}>{selectedCommunity?.name}</Text>
                        <Text style={styles.headerStatus}>{selectedCommunity?.description}</Text>
                    </View>
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
                        {messages[selectedCommunity?.id || '']?.length > 0 ? (
                            messages[selectedCommunity?.id || ''].map((msg) => (
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
                            <Ionicons name={isRecording ? "stop" : "mic"} size={24} color={isRecording ? 'red' : 'purple'} />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Type a message..."
                            value={message}
                            onChangeText={setMessage}
                        />
                        <TouchableOpacity
                            style={styles.sendButton}
                            onPress={() => sendMessage(message)}
                        >
                            <Ionicons name="send" size={24} color="purple" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Modal>
    );

    const renderCommunityList = () => (
        <Modal
            animationType="slide"
            transparent={false}
            visible={openCommunity}
            onRequestClose={() => setOpenCommunity(false)}
        >
            <SafeAreaView style={styles.modalContainer}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setOpenCommunity(false)}
                    >
                        <Ionicons name="arrow-back" size={25} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Select a Community</Text>
                </View>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <ScrollView contentContainerStyle={styles.communityListContainer}>
                    {communities
                        .filter(community => community.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(community => (
                            <TouchableOpacity
                                key={community.id}
                                style={styles.communityItem}
                                onPress={() => {
                                    setSelectedCommunity(community);
                                    setChatModalVisible(true);
                                }}
                            >
                                <Image
                                    source={community.image}
                                    style={styles.communityAvatar}
                                />
                                <View style={styles.communityInfo}>
                                    <Text style={styles.communityName}>{community.name}</Text>
                                    <Text style={styles.communityDescription}>{community.description}</Text>
                                </View>
                                {!joinedCommunities[community.id] && (
                                    <TouchableOpacity
                                        style={styles.joinButton}
                                        onPress={() => handleJoinRequest(community)}
                                    >
                                        <Text style={styles.joinButtonText}>Join</Text>
                                    </TouchableOpacity>
                                )}
                            </TouchableOpacity>
                        ))}
                </ScrollView>
            </SafeAreaView>
        </Modal>
    );

    const renderConfirmationModal = () => (
        <Modal
            animationType="slide"
            transparent={true}
            visible={confirmationModalVisible}
            onRequestClose={() => setConfirmationModalVisible(false)}
        >
            <View style={styles.confirmationModalContainer}>
                <View style={styles.confirmationModalContent}>
                    <Text style={styles.confirmationModalTitle}>Join Community</Text>
                    <Text style={styles.confirmationModalText}>Are you sure you want to join {communityToJoin?.name}?</Text>
                    <View style={styles.confirmationModalButtons}>
                    <TouchableOpacity
                            style={styles.ModalButtonNo}
                            onPress={() => setConfirmationModalVisible(false)}
                        >
                            <Text style={styles.confirmationModalButtonText}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.ModalButtonYes}
                            onPress={confirmJoin}
                        >
                            <Text style={styles.confirmationModalButtonText}>Yes</Text>
                        </TouchableOpacity>
                       
                    </View>
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => setOpenCommunity(true)}
            >
                <Text style={{ color: 'black', fontSize: 18 }}>View all</Text>
            </TouchableOpacity>
            {renderCommunityList()}
            {renderChatScreen()}
            {renderConfirmationModal()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    openButton: {
        backgroundColor: 'purple',
        padding: 16,
        borderRadius: 8,
    },
    openButtonText: {
        color: '#fff',
        fontSize: 18,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#4b0889',
        justifyContent:'space-between',
    },
      
    headerInfo: {
        flex: 1,
    },
    headerName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerStatus: {
        color: '#ccc',
    },
    closeButton: {
        marginRight: 16,
    },
    avatarSmall: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    headerInfo: {
        flex: 1,
        marginLeft: 8,
    },
    headerName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    headerStatus: {
        color: '#888',
    },
    chatContainer: {
        flex: 1,
    },
    messagesContainer: {
        padding: 16,
    },
    messageBubble: {
        padding: 10,
        borderRadius: 15,
        marginBottom: 10,
        maxWidth: '80%',
    },
    myMessage: {
        backgroundColor: '#f1f1f1',
        alignSelf: 'flex-end',
    },
    theirMessage: {
        backgroundColor: '#e1bee7',
        alignSelf: 'flex-start',
    },
    messageImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    messageText: {
        fontSize: 16,
    },
    messageTime: {
        fontSize: 12,
        color: '#888',
        marginTop: 5,
    },
    audioText: {
        fontSize: 16,
        color: 'purple',
        marginTop: 5,
    },
    emptyStateText: {
        textAlign: 'center',
        marginTop: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    inputButton: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        borderRadius: 20,
        padding: 10,
        marginRight: 10,
    },
    sendButton: {
        padding: 10,
    },
    communityListContainer: {
        padding: 16,
    },
    communityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    communityAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    communityInfo: {
        marginLeft: 10,
        flex: 1,
    },
    communityName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    communityDescription: {
        color: '#888',
    },
    joinButton: {
        backgroundColor: 'purple',
        borderRadius: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    joinButtonText: {
        color: '#fff',
    },
    searchContainer: {
        padding: 16,
        backgroundColor: '#f1f1f1',
        borderRadius: 20,
    },
    searchInput: {
        backgroundColor: 'purple',
        borderRadius: 20,
        padding: 10,
        color: 'black',
    },
        searchButton: {
        backgroundColor: 'purple',
        borderRadius: 20,
        padding: 10
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    confirmationModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    confirmationModalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    confirmationModalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    confirmationModalText: {
        fontSize: 16,
        marginBottom: 20,
    },
    confirmationModalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ModalButtonNo: {
        backgroundColor: 'red',
        borderRadius: 8,
        padding: 10,
        flex: 1,
        marginHorizontal: 5,
    },
   ModalButtonYes: {
        backgroundColor: 'purple',
        borderRadius: 8,
        padding: 10,
        flex: 1,
        marginHorizontal: 5,
    },
    confirmationModalButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default Community;
