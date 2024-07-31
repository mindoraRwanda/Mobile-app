import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Service() {
  const [modalVisible, setModalVisible] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service</Text>
      <TouchableOpacity style={styles.bookButton} onPress={() => setModalVisible(true)}>
        <Icon name="calendar" size={24} color="white" />
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Book Mental Health Appointment</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Appointment Details"
            value={appointmentDetails}
            onChangeText={setAppointmentDetails}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.buttonSubmit}
              onPress={() => {
                // Add your appointment booking logic here
                setModalVisible(false);
              }}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonCancel}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  bookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  bookButtonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 18,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonSubmit: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginRight: 10,
    flex: 1,
  },
  buttonCancel: {
    backgroundColor: '#f44336',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    flex: 1,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
