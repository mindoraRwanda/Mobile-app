import React from 'react';
import { Text, View, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { createBooking } from '@/redux/Slices/bookingSlice';

const BookingModal = ({ modalVisible, setModalVisible, bookingDetails, setBookingDetails, handleBookingSubmit }) => {
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(createBooking(bookingDetails));
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Book an Appointment</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButton}>X</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Patient ID"
            value={bookingDetails.patientId}
            onChangeText={(text) => setBookingDetails({ ...bookingDetails, patientId: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Therapist ID"
            value={bookingDetails.therapistId}
            onChangeText={(text) => setBookingDetails({ ...bookingDetails, therapistId: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Start Time"
            value={bookingDetails.startTime}
            onChangeText={(text) => setBookingDetails({ ...bookingDetails, startTime: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="End Time"
            value={bookingDetails.endTime}
            onChangeText={(text) => setBookingDetails({ ...bookingDetails, endTime: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={bookingDetails.location}
            onChangeText={(text) => setBookingDetails({ ...bookingDetails, location: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Appointment Type"
            value={bookingDetails.appointmentType}
            onChangeText={(text) => setBookingDetails({ ...bookingDetails, appointmentType: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Status"
            value={bookingDetails.status}
            onChangeText={(text) => setBookingDetails({ ...bookingDetails, status: text })}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Notes"
            value={bookingDetails.notes}
            onChangeText={(text) => setBookingDetails({ ...bookingDetails, notes: text })}
            multiline
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleSubmit}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'purple',
  },
  closeButton: {
    fontSize: 20,
    color: 'purple',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 80,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  confirmButton: {
    backgroundColor: 'purple',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BookingModal;