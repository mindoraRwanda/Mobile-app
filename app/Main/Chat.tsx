import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, TextInput, ScrollView, ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface User {
  name: string;
  image: ImageSourcePropType;
  lastSeen?: string;
}

interface Message {
  text: string;
  sender: 'me' | 'them';
}

const users: User[] = [
  {
    name: 'Noella Nizigama', 
    image: require('../../assets/ImgForScreen/team2.jpg'),
    lastSeen: 'Online', 
  },
  {
    name: 'Uwirora Gilbert',
    image: require('../../assets/ImgForScreen/team3.jpg'),
    lastSeen: 'Last seen yesterday',
  },
  {
    name: 'Murenzi Patrick', 
    image: require('../../assets/ImgForScreen/team5.jpg'),
    lastSeen: 'Last seen 2 hours ago', 
  },
  {
    name: 'Uwirora Gilbert',
    image: require('../../assets/ImgForScreen/team5.jpg'),
    lastSeen: 'Online',
  },
  {
    name: 'Noella Nizigama', 
    image: require('../../assets/ImgForScreen/team5.jpg'),
    lastSeen: 'Online', 
  },
  {
    name: 'Uwirora Gilbert',
    image: require('../../assets/ImgForScreen/team5.jpg'),
    lastSeen: 'Online',
  },
  {
    name: 'Noella Nizigama', 
    image: require('../../assets/ImgForScreen/team5.jpg'),
    lastSeen: 'Last seen Monday', 
  },
  {
    name: 'Uwirora Gilbert',
    image: require('../../assets/ImgForScreen/team5.jpg'),
  },
];

export default function Chat() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const navigation = useNavigation();

  const sendMessage = () => {
    if (message) {
      setMessages([...messages, { text: message, sender: 'me' }]);
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.exercisesSection}>
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Community</Text>
          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <Text style={styles.listAction}>View All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.listContent} horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.exercisesList}>
            <TouchableOpacity style={styles.exerciseButton}
              onPress={() => navigation.navigate('Join Community' as never)}>
              <Image source={require('../../assets/ImgForScreen/grp1.jpg')} style={styles.exerciseIcon} />
              <Text style={styles.exerciseText}>Kigali Community</Text>
              <Text style={styles.exerciseSubtext}>Join</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exerciseButton}
              onPress={() => navigation.navigate('Join Community' as never)}>
              <Image source={require('../../assets/ImgForScreen/grp2.jpg')} style={styles.exerciseIcon} />
              <Text style={styles.exerciseText}>Kigali Community</Text>
              <Text style={styles.exerciseSubtext}>Join</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exerciseButton}
              onPress={() => navigation.navigate('Join Community' as never)}>
              <Image source={require('../../assets/ImgForScreen/grp1.jpg')} style={styles.exerciseIcon} />
              <Text style={styles.exerciseText}>Kigali Community</Text>
              <Text style={styles.exerciseSubtext}>Join</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exerciseButton}
              onPress={() => navigation.navigate('Join Community' as never)}>
              <Image source={require('../../assets/ImgForScreen/grp1.jpg')} style={styles.exerciseIcon} />
              <Text style={styles.exerciseText}>Kigali Community</Text>
              <Text style={styles.exerciseSubtext}>Join</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exerciseButton}
              onPress={() => navigation.navigate('Join Community' as never)}>
              <Image source={require('../../assets/ImgForScreen/grp1.jpg')} style={styles.exerciseIcon} />
              <Text style={styles.exerciseText}>Kigali Community</Text>
              <Text style={styles.exerciseSubtext}>Join</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.exerciseButton}
              onPress={() => navigation.navigate('Join Community' as never)}>
              <Image source={require('../../assets/ImgForScreen/grp1.jpg')} style={styles.exerciseIcon} />
              <Text style={styles.exerciseText}>Kigali Community</Text>
              <Text style={styles.exerciseSubtext}>Join</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <ScrollView>
        <Text style={styles.messagetitle}>Messages</Text>
        {users.map((user, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.chat} 
            onPress={() => setSelectedUser(user)}
          >
            <Image style={styles.avatar} source={user.image} />
            <Text style={styles.avatarName}>
              {user.name}{'\n'}
              <Text style={styles.timeStamp}>
                Start conversation {'\n'}
                {user.lastSeen}
              </Text>
            </Text>
          </TouchableOpacity>
        ))}

        {selectedUser && (
          <Modal
            animationType="slide"
            transparent={false}
            visible={!!selectedUser}
            onRequestClose={() => setSelectedUser(null)}
          >
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedUser(null)}
              >
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Image style={styles.avatar} source={selectedUser.image} />
              <Text style={styles.modalText}>{selectedUser.name}</Text>
            </View>
            <ScrollView style={styles.chatContainer}>
              {messages.map((message, index) => (
                <Text 
                  key={index} 
                  style={[
                    styles.chatMessage, 
                    message.sender === 'me' ? styles.myMessage : styles.theirMessage
                  ]}
                >
                  {message.text}
                </Text>
              ))}
            </ScrollView>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.input} 
                placeholder="Type a message" 
                value={message}
                onChangeText={setMessage}
              />
              <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                <Ionicons name="send" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </Modal>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0
  },
  messagetitle: {
    fontSize: 26,
    fontWeight: 'bold',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3'
  },
  chat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  avatarName: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  timeStamp: {
    fontSize: 15,
    fontWeight: 'normal',
    color: 'grey'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: '#f3f3f3',
    padding: 10,
    marginTop: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#333',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
  },
  closeButton: {
    marginRight: 10,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f3f3f3',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 25,
  },
  sendButton: {
    marginLeft: 10,
  },
  chatMessage: {
    padding: 10,
    margin: 5,
    borderRadius: 10,
    maxWidth: '70%',
  },
  myMessage: {
    backgroundColor: 'rgba(74, 8, 135, 0.857)',
    alignSelf: 'flex-end',
    color: 'white',
  },
  theirMessage: {
    backgroundColor: 'rgba(74, 8, 135, 0.457)',
    alignSelf: 'flex-start',
  },
  exercisesSection: {
    marginVertical: 16,
  },
  exercisesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  exercisesList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  exerciseButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 150,
    height: 150,
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginLeft: 12,
  },
  exerciseIcon: {
    width: '100%',
    height: '80%',
  },
  exerciseText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  exerciseSubtext: {
    fontSize: 14,
    color: '#666',
  },
  seeAllButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
  },
  seeAllButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 22,
    color: '#121a26',
  },
  listAction: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#778599',
  },
  listContent: {
    // Add any specific styles for the ScrollView content here
  },
});