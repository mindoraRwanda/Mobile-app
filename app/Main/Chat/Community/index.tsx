import React, { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Modal, TouchableOpacity, ScrollView, SafeAreaView, Text, Image, StyleSheet, ImageSourcePropType, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Audio from 'expo-av';

type CommunityType = {
    id: string;
    name: string;
    image: ImageSourcePropType;
    description: string;
};

const communities: CommunityType[] = [
    { id: '1', name: 'Communities', image: require('../../../../assets/ImgForScreen/team5.jpg'), description: 'This is Community 1' },
    { id: '2', name: 'Consultants', image: require('../../../../assets/ImgForScreen/grp1.jpg'), description: 'This is Consultants Community' },
    { id: '3', name: 'Helper', image: require('../../../../assets/ImgForScreen/team2.jpg'), description: 'This is Helper Community' },
    { id: '4', name: 'Connections', image: require('../../../../assets/ImgForScreen/team3.jpg'), description: 'This is Community for connection' }
];

type Message = {
    id: string;
    text: string;
    sender: string;
    timestamp: Date;
    image?: string;
    audioUri?: string;
};

const Index: React.FC = (): JSX.Element => {
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
                            <Text style={styles.emptyStateText}>Start a conversation!</Text>
                        )}
                    </ScrollView>

                    <View style={styles.inputContainer}>
                        <TouchableOpacity onPress={openGallery} style={styles.iconButton}>
                            <Ionicons name="image-outline" size={24} color="black" />
                        </TouchableOpacity>
                        <TextInput
                            value={message}
                            onChangeText={setMessage}
                            style={styles.input}
                            placeholder="Type a message"
                            multiline
                        />
                        {isRecording ? (
                            <TouchableOpacity onPress={stopRecording} style={styles.iconButton}>
                                <Ionicons name="mic-off-outline" size={24} color="red" />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity onPress={startRecording} style={styles.iconButton}>
                                <Ionicons name="mic-outline" size={24} color="black" />
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={() => sendMessage(message)} style={styles.iconButton}>
                            <Ionicons name="send-outline" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </Modal>
    );

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search Communities"
            />
            <ScrollView>
                {communities
                    .filter((community) => community.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((community) => (
                        <TouchableOpacity
                            key={community.id}
                            style={styles.communityContainer}
                            onPress={() =>
                                joinedCommunities[community.id]
                                    ? setSelectedCommunity(community)
                                    : handleJoinRequest(community)
                            }
                        >
                            <Image style={styles.avatar} source={community.image} />
                            <View style={styles.infoContainer}>
                                <Text style={styles.communityName}>{community.name}</Text>
                                <Text style={styles.communityDescription}>{community.description}</Text>
                            </View>
                            {joinedCommunities[community.id] ? (
                                <Text style={styles.joinedText}>Joined</Text>
                            ) : (
                                <Text style={styles.joinText}>Join</Text>
                            )}
                        </TouchableOpacity>
                    ))}
            </ScrollView>

            {renderChatScreen()}

            <Modal
                animationType="slide"
                transparent={true}
                visible={confirmationModalVisible}
                onRequestClose={() => setConfirmationModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.centeredModalContainer}>
                        <Text style={styles.modalTitle}>Join {communityToJoin?.name}?</Text>
                        <Text style={styles.modalMessage}>
                            Are you sure you want to join this community?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => setConfirmationModalVisible(false)}
                            >
                                <Text style={styles.cancelText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.confirmButton} onPress={confirmJoin}>
                                <Text style={styles.confirmText}>Join</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 100
    },
    searchInput: {
        padding: 10,
        margin: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
    },
    communityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginHorizontal: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 10,
    },
    communityName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    communityDescription: {
        color: '#888',
    },
    joinText: {
        color: '#4A0887',
        fontWeight: 'bold',
    },
    joinedText: {
        color: 'green',
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    centeredModalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ccc',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#aaa',
    },
    confirmButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#4A0887',
        borderRadius: 5,
    },
    cancelText: {
        color: '#333',
        fontWeight: 'bold',
    },
    confirmText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
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
        fontSize: 16,
    },
    headerStatus: {
        color: '#888',
    },
    chatContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    messagesContainer: {
        padding: 10,
    },
    messageBubble: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#4A0887',
        borderBottomRightRadius: 0,
    },
    theirMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#ccc',
        borderBottomLeftRadius: 0,
    },
    messageText: {
        color: 'white',
    },
    messageImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    messageTime: {
        color: '#888',
        fontSize: 12,
        alignSelf: 'flex-end',
    },
    emptyStateText: {
        textAlign: 'center',
        color: '#888',
        marginTop: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopColor: '#ccc',
        borderTopWidth: 1,
    },
    input: {
        flex: 1,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        marginHorizontal: 10,
    },
    iconButton: {
        padding: 5,
    },
    audioText: {
        color: 'white',
        fontStyle: 'italic',
    },
});
