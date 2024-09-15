import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, Image, FlatList, TouchableOpacity,
  TextInput, SafeAreaView, StatusBar
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BookingModal from './BookingModel'; 
import ProfileModal from './ProfileModal';
import { useDispatch } from 'react-redux';
import { fetchTherapists } from '@/redux/Slices/therapistSlice';
import createBooking from '@/redux/Slices/bookingSlice';

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
    patientId: '',
    therapistId: '',
    startTime: '',
    endTime: '',
    location: 'online',
    appointmentType: 'Screening',
    status: 'Scheduled',
    notes: '',
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

  // Submit the booking request
   const handleBookingSubmit = () => {
    console.log('Booking Details:', bookingDetails);
    if (!bookingDetails.patientId || !bookingDetails.therapistId || !bookingDetails.startTime || !bookingDetails.endTime || !bookingDetails.location || !bookingDetails.appointmentType || !bookingDetails.status) {
      alert('Please fill in all required fields.');
      return;
    }
    dispatch(createBooking(bookingDetails));
    setModalVisible(false);
  };

  // Render each therapist card
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

      {modalType === 'profile' && selectedTherapist && (
        <ProfileModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedTherapist={selectedTherapist}
        />
      )}

      {modalType === 'booking' && (
        <BookingModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        bookingDetails={bookingDetails}
        setBookingDetails={setBookingDetails}
        handleBookingSubmit={handleBookingSubmit}
      />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    paddingTop: 70,
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
});