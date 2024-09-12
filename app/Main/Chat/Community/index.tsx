import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, ScrollView, Text, Image, StyleSheet, TextInput } from 'react-native';
import ChatScreen from './CommunityScreen'; 
import { router } from 'expo-router';

type CommunityType = {
  id: string;
  name: string;
  image: any;
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
};

const Community: React.FC = (): JSX.Element => {
  const [selectedCommunity, setSelectedCommunity] = useState<CommunityType | null>(null);
  const [joinedCommunities, setJoinedCommunities] = useState<Record<string, boolean>>({});
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
  const [confirmationModalVisible, setConfirmationModalVisible] = useState<boolean>(false);
  const [communityToJoin, setCommunityToJoin] = useState<CommunityType | null>(null);

  const sendMessage = (text: string) => {
    if (text.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: text.trim(),
        sender: 'me',
        timestamp: new Date(),
      };
      setMessages(prevMessages => ({
        ...prevMessages,
        [selectedCommunity?.id || '']: [...(prevMessages[selectedCommunity?.id || ''] || []), newMessage]
      }));
      setMessage('');
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
      router.push({
        pathname: '/Main/Chat/Community/CommunityScreen',
        params: {
          id: communityToJoin.id,
          name: communityToJoin.name,
          image: communityToJoin.image,
          description: communityToJoin.description,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {communities.map(community => (
          <View key={community.id} style={styles.card}>
            <TouchableOpacity
              onPress={() => setSelectedCommunity(community)}
              style={styles.communityButton}
            >
              <Image style={styles.avatar} source={community.image} />
              <View style={styles.communityInfo}>
                <Text style={styles.communityName}>{community.name}</Text>
                <Text style={styles.communityDescription}>{community.description}</Text>
              </View>
            </TouchableOpacity>
            {!joinedCommunities[community.id] ? (
              <TouchableOpacity style={styles.joinButton} onPress={() => handleJoinRequest(community)}>
                <Text style={styles.joinButtonText}>Join</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.joinedText}>Joined</Text>
            )}
          </View>
        ))}
      </ScrollView>

      <ChatScreen
        selectedCommunity={selectedCommunity}
        messages={messages}
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
        setSelectedCommunity={setSelectedCommunity}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmationModalVisible}
        onRequestClose={() => setConfirmationModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Do you want to join this community?</Text>
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.modalButton} onPress={confirmJoin}>
              <Text style={styles.modalButtonText}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setConfirmationModalVisible(false)}>
              <Text style={styles.modalButtonText}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  communityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  communityInfo: {
    marginLeft: 15,
  },
  communityName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  communityDescription: {
    color: '#666',
  },
  joinButton: {
    backgroundColor: '#4A0887',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  joinedText: {
    color: 'green',
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
  },
  modalButton: {
    backgroundColor: '#4A0887',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Community;
