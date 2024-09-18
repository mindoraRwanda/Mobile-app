import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import UserSelectionModal from './UserSelectionModal';
import { Ionicons } from '@expo/vector-icons'; // For icons

interface User {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  profileImage: string | null;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const router = useRouter();

  const handleUserPress = (user: User) => {
    router.push({
      pathname: '/Main/Chat/Messages/ChatScreen',
      params: { 
        id: user.id, 
        name: `${user.firstName} ${user.lastName}`, 
        image: user.profileImage || '../../../../assets/images/null.jpg', 
        //lastSeen: user.lastSeen 
      },
    });
  };

  const handleSelectUser = (user: User) => {
    setSelectedUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search contacts..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={selectedUsers}
        keyExtractor={(user) => user.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userCard} onPress={() => handleUserPress(item)}>
            <Image
              source={{ uri: item.profileImage || '../../../../assets/images/null.jpg' }}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={styles.userRole}>{item.role}</Text>
            </View>
            <Text style={styles.userStatus}>Online</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.newChatButton} onPress={() => setIsModalVisible(true)}>
        <Ionicons name="add" size={20} color="#fff" />
        <Text style={styles.newChatButtonText}>New Chat</Text>
      </TouchableOpacity>

      <UserSelectionModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectUser={handleSelectUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginTop: 79,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 25,
    marginVertical: 10,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  newChatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#4A0887',
    padding: 15,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 8,
  },
  newChatButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  userRole: {
    color: '#888',
    fontSize: 14,
  },
  userStatus: {
    fontSize: 12,
    color: '#34C759',
  },
});

export default Index;
