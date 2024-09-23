import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

export default function ProfileModal({ modalVisible, setModalVisible, selectedTherapist }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (modalVisible) {
      // Simulate data fetching
      setTimeout(() => {
        setLoading(false);
      }, 2000); // Replace with actual data fetching logic
    } else {
      setLoading(true);
    }
  }, [modalVisible]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Icon name="times" size={24} color="#FFF" />
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="large" color="#4A0887" style={styles.spinner} />
          ) : (
            <>
              <Image source={selectedTherapist.image} style={styles.modalImage} />
              <View style={styles.infoContainer}>
                <Text style={styles.modalName}>{selectedTherapist.name}</Text>
                <Text style={styles.modalJob}>{selectedTherapist.job}</Text>
                <Text style={styles.modalLocation}>{selectedTherapist.location}</Text>
                <Text style={styles.modalDescription}>{selectedTherapist.description}</Text>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: width * 0.9,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#4A0887',
    borderRadius: 15,
    padding: 5,
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#4A0887',
  },
  infoContainer: {
    alignItems: 'center',
  },
  modalName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A0887',
    marginBottom: 5,
  },
  modalJob: {
    fontSize: 18,
    color: '#4A0887',
    marginBottom: 5,
  },
  modalLocation: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});