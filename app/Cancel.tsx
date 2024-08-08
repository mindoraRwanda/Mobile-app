import { useRouter } from 'expo-router'; // Note the useRouter import
import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CancelBooking() {
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const router = useRouter(); // Use the hook to get the router instance

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCancelModalVisible(true)} style={styles.openModalButton}>
        <Text style={styles.openModalButtonText}>Cancel</Text>
      </TouchableOpacity>

      <Modal visible={cancelModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cancel Appointment</Text>
            <Text style={styles.modalText}>Are you sure you want to cancel your appointment?</Text>
            <Text style={styles.modalSubText}>Only 50% of the funds will be returned to your account.</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.backButton} onPress={() => setCancelModalVisible(false)}>
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setCancelModalVisible(false);
                  router.push('../Main'); // Updated path to ensure correctness
                }}
              >
                <Text style={styles.cancelButtonText}>Yes, Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  openModalButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  openModalButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A0887',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalSubText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
  },
  backButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: '#007BFF',
    borderWidth: 1,
    marginRight: 10,
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#4A0887',
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});
