import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, Image, FlatList, TouchableOpacity,
  Modal, TextInput, SafeAreaView, StatusBar
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CancelBooking from '../../../../components/Cancel';
import { useDispatch } from 'react-redux';
import { fetchTherapists } from '@/redux/therapistSlice';

interface Therapist {
  id: string;
  name: string;
  location: string;
  job: string;
  image: any;
  description: string;
}

export default function Appointment() {
  const dispatch = useDispatch();
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'profile' | 'booking'>('profile');
  const [searchText, setSearchText] = useState<string>('');
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    date: '',
    time: '',
    reason: ''
  });

  useFocusEffect(
    useCallback(() => {
      const fetchTherapistsData = async () => {
        const data = await dispatch(fetchTherapists()).unwrap();
        const therapistsData: Therapist[] = data.map((item: any) => ({
          id: item.id,
          name: `${item.user.firstName} ${item.user.lastName}`,
          location: item.personalInformation.address || 'N/A',
          job: item.personalInformation.degree || 'N/A',
          image: { uri: item.user.profileImage },
          description: `Gender: ${item.personalInformation.gender}\nEmail: ${item.user.email}\nPhone: ${item.personalInformation.phone}\nDate of Birth: ${item.personalInformation.dateOfBirth}\nDiploma: ${item.personalInformation.diploma}\nLicense: ${item.personalInformation.licence}`
        }));
        setTherapists(therapistsData);
      };

      fetchTherapistsData();
    }, [dispatch])
  );

  const filteredTherapists = therapists.filter(therapist =>
    therapist.name.toLowerCase().includes(searchText.toLowerCase()) ||
    therapist.job.toLowerCase().includes(searchText.toLowerCase()) ||
    therapist.location.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleModalOpen = (therapist: Therapist, type: 'profile' | 'booking') => {
    setSelectedTherapist(therapist);
    setModalType(type);
    setModalVisible(true);
  };

  const handleBookingSubmit = () => {
    console.log('Booking submitted:', bookingDetails);
    setModalVisible(false);
    setBookingDetails({ name: '', date: '', time: '', reason: '' });
  };

  const renderTherapistCard = ({ item }: { item: Therapist }) => (
    <TouchableOpacity
      style={styles.therapistCard}
      onPress={() => handleModalOpen(item, 'profile')}
    >
      <Image source={item.image} style={styles.avatar} />
      <View style={styles.therapistInfo}>
        <Text style={styles.therapistName}>{item.name}</Text>
        <Text style={styles.therapistJob}>{item.job}</Text>
        <Text style={styles.therapistLocation}>{item.location}</Text>
      </View>
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => handleModalOpen(item, 'booking')}
      >
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F4F8" />
      <View style={styles.header}>
        <Text style={styles.title}>Find Your Therapist</Text>
        <View style={styles.searchBar}>
          <Icon name="search" size={20} color="#4A0887" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search therapists"
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      <FlatList
        data={filteredTherapists}
        renderItem={renderTherapistCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

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
              <Icon name="times" size={24} color="#333" />
            </TouchableOpacity>

            {modalType === 'profile' && selectedTherapist && (
              <View>
                <Image source={selectedTherapist.image} style={styles.modalImage} />
                <Text style={styles.modalName}>{selectedTherapist.name}</Text>
                <Text style={styles.modalJob}>{selectedTherapist.job}</Text>
                <Text style={styles.modalLocation}>{selectedTherapist.location}</Text>
                <Text style={styles.modalDescription}>{selectedTherapist.description}</Text>
              </View>
            )}

            {modalType === 'booking' && (
              <View>
                <Text style={styles.modalTitle}>Book an Appointment</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your Name"
                  value={bookingDetails.name}
                  onChangeText={(text) => setBookingDetails({ ...bookingDetails, name: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Date (YYYY-MM-DD)"
                  value={bookingDetails.date}
                  onChangeText={(text) => setBookingDetails({ ...bookingDetails, date: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Time (HH:MM)"
                  value={bookingDetails.time}
                  onChangeText={(text) => setBookingDetails({ ...bookingDetails, time: text })}
                />
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Reason for Visit"
                  value={bookingDetails.reason}
                  onChangeText={(text) => setBookingDetails({ ...bookingDetails, reason: text })}
                  multiline
                />
                <View style={styles.buttonContainer}>
                  <CancelBooking />
                  <TouchableOpacity style={styles.confirmButton} onPress={handleBookingSubmit}>
                    <Text style={styles.confirmButtonText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A0887',
    marginBottom: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  listContainer: {
    padding: 15,
  },
  therapistCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  therapistInfo: {
    flex: 1,
  },
  therapistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  therapistJob: {
    fontSize: 16,
    color: '#4A0887',
  },
  therapistLocation: {
    fontSize: 14,
    color: '#777',
  },
  bookButton: {
    backgroundColor: '#4A0887',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  bookButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  modalName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  modalJob: {
    fontSize: 18,
    color: '#4A0887',
  },
  modalLocation: {
    fontSize: 16,
    color: '#777',
  },
  modalDescription: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 45,
    borderColor: '#E1E8ED',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    width: '100%',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#4A0887',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
  },
  confirmButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
