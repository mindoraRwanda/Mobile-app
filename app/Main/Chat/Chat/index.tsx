import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import { useRouter } from 'expo-router';

interface User {
  id: string;
  name: string;
  image: ImageSourcePropType;
  lastSeen?: string;
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

const ChatList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleUserPress = (user: User) => {
    router.push({
      pathname: '/Main/Chat/Chat/ChatScreen',
      params: { 
        id: user.id, 
        name: user.name, 
        image: user.image, 
        lastSeen: user.lastSeen 
      },
    });
  };

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
      <View style={styles.userListContainer}>
        {users
          .filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((user) => (
            <TouchableOpacity
              key={user.id}
              style={styles.userListItem}
              onPress={() => handleUserPress(user)}
            >
              <Image source={user.image} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userStatus}>{user.lastSeen}</Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
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
});

export default ChatList;
