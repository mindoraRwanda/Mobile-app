import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../../redux/Slices/userChatList';
import { RootState } from '../../../../redux/store';

interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  role: string;
  profileImage: string | null;
}

interface UserSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectUser: (user: User) => void;
}

const UserSelectionModal: React.FC<UserSelectionModalProps> = ({
  visible,
  onClose,
  onSelectUser,
}) => {
  const dispatch = useDispatch();
  const { users, status, error } = useSelector((state: RootState) => state.chatList);

  const [imageSources, setImageSources] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers());
    }
  }, [status, dispatch]);

  const handleImageError = (userId: string) => {
    setImageSources((prev) => ({
      ...prev,
      [userId]: '../../../../assets/images/null.jpg',
    }));
  };

  const renderUserImage = (profileImage: string | null, userId: string) => {
    const imageSource = imageSources[userId] || profileImage || '../../../../assets/images/null.jpg';

    return (
      <Image
        source={{ uri: imageSource }}
        style={styles.avatar}
        onError={() => handleImageError(userId)}
      />
    );
  };

  const renderItem = ({ item }: { item: User }) => {
    if (!item || typeof item !== 'object') return null;

    const firstName = item.firstName ?? '';
    const lastName = item.lastName ?? '';
    const role = item.role ?? 'No role specified';

    return (
      <TouchableOpacity
        style={styles.userListItem}
        onPress={() => {
          onSelectUser(item);
          onClose();
        }}
      >
        {renderUserImage(item.profileImage, item.id)}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            {firstName} {lastName}
          </Text>
          <Text style={styles.userStatus}>{role}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const filteredUsers = (users ?? []).filter((user): user is User => 
    user !== null && 
    typeof user === 'object' && 
    typeof user.id === 'string' && 
    (user.firstName === null || typeof user.firstName === 'string') &&
    (user.lastName === null || typeof user.lastName === 'string') &&
    typeof user.role === 'string'
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select a User to Chat With</Text>
          {status === 'loading' && <ActivityIndicator size="large" color="#4A0887" />}
          {error && <Text>Error: {error}</Text>}

          {status === 'succeeded' && (
            <FlatList
              data={filteredUsers}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
            />
          )}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};


const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    height: '70%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
  closeButton: {
    marginTop: 20,
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
});

export default UserSelectionModal;