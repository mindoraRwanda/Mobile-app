import React, { useState, useCallback, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import BookingModal from './BookingModel';
import ProfileModal from './ProfileModal';
import { useDispatch } from 'react-redux';
import { fetchTherapists } from '@/redux/Slices/therapistSlice';
import createBooking from '@/redux/Slices/bookingSlice';
import { debounce } from 'lodash';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

interface Therapist {
  id: string;
  name: string;
  location: string;
  job: string;
  image: { uri: string };
  description: string;
  availableDay: string;
  startTime: string;
  endTime: string;
}

const TherapistCard = React.memo(
  ({
    item,
    onProfilePress,
    onBookingPress,
  }: {
    item: Therapist;
    onProfilePress: () => void;
    onBookingPress: () => void;
  }) => (
    <TouchableOpacity style={styles.therapistCard} onPress={onProfilePress}>
      <Image source={item.image} style={styles.avatar} />
      <View style={styles.therapistInfo}>
        <Text style={styles.therapistName}>{item.name}</Text>
        <Text style={styles.therapistJob}>{item.job}</Text>
        <Text style={styles.therapistLocation}>{item.location}</Text>
        <View style={styles.availabilityContainer}>
          <Icon name="calendar" size={14} color="#4A0887" style={styles.icon} />
          <Text style={styles.therapistAvailableDay}>{item.availableDay}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Icon name="clock-o" size={14} color="#4A0887" style={styles.icon} />
          <Text style={styles.therapistTime}>
            {item.startTime} - {item.endTime}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.bookButton} onPress={onBookingPress}>
        <Text style={styles.bookButtonText}>Book</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
);

export default function Appointment() {
  const dispatch = useDispatch();
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(
    null
  );
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
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const xpProgressRef = useRef(null);

  const fetchTherapistsData = async () => {
    setLoading(true);
    try {
      const data = await dispatch(fetchTherapists()).unwrap();
      const therapistsData: Therapist[] = data.map((item: any) => {
        const therapist = item.therapist;

        // Handle personalInformation which might be a JSON string
        let personalInformation = therapist.personalInformation;
        if (typeof personalInformation === 'string') {
          personalInformation = JSON.parse(personalInformation);
        }

        return {
          id: therapist.id,
          name: `${therapist.user.firstName} ${therapist.user.lastName}`,
          location: personalInformation.address || 'N/A',
          job: personalInformation.degree || 'N/A',
          image: { uri: therapist.user.profileImage },
          description: `Gender: ${personalInformation.gender}\nEmail: ${therapist.user.email}\nAge: ${personalInformation.age}\nDiploma: ${therapist.diploma}\nLicense: ${therapist.license}`,
          availableDay: item.availableDay || 'N/A',
          startTime: item.startTime ? new Date(item.startTime).toLocaleTimeString() : 'N/A',
          endTime: item.endTime ? new Date(item.endTime).toLocaleTimeString() : 'N/A',
        };
      });
      setTherapists(therapistsData);
    } catch (error) {
      console.error('Error fetching therapists:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTherapistsData();
    }, [dispatch])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTherapistsData().then(() => setRefreshing(false));
  }, []);

  const debouncedSetSearchText = useCallback(
    debounce((text: string) => setSearchText(text), 300),
    []
  );

  const filteredTherapists = useMemo(
    () =>
      therapists.filter(
        (therapist) =>
          therapist.name.toLowerCase().includes(searchText.toLowerCase()) ||
          therapist.job.toLowerCase().includes(searchText.toLowerCase()) ||
          therapist.location.toLowerCase().includes(searchText.toLowerCase())
      ),
    [therapists, searchText]
  );

  const handleModalOpen = useCallback(
    (therapist: Therapist, type: 'profile' | 'booking') => {
      setSelectedTherapist(therapist);
      setModalType(type);
      setModalVisible(true);
    },
    []
  );

  const handleBookingSubmit = useCallback(() => {
    console.log('Booking Details:', bookingDetails);
    if (
      !bookingDetails.patientId ||
      !bookingDetails.therapistId ||
      !bookingDetails.startTime ||
      !bookingDetails.endTime ||
      !bookingDetails.location ||
      !bookingDetails.appointmentType ||
      !bookingDetails.status
    ) {
      alert('Please fill in all required fields.');
      return;
    }
    dispatch(createBooking(bookingDetails));
    setModalVisible(false);
  }, [bookingDetails, dispatch]);

  const renderTherapistCard = useCallback(
    ({ item }: { item: Therapist }) => (
      <TherapistCard
        item={item}
        onProfilePress={() => handleModalOpen(item, 'profile')}
        onBookingPress={() => handleModalOpen(item, 'booking')}
      />
    ),
    [handleModalOpen]
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F0F4F8" />
      <View style={styles.header}>
        <Text style={styles.title}>Find Your Therapist</Text>
        <Button
          mode="contained"
          onPress={() => router.push('./Service/Booking/Plan')}
          style={styles.button}
          labelStyle={styles.buttonText}
          contentStyle={styles.buttonContent}
          icon="calendar"
        >
          View Upcoming Appointments
        </Button>
        <View style={styles.searchBar}>
          <Icon
            name="search"
            size={20}
            color="#4A0887"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search therapists"
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={debouncedSetSearchText}
          />
        </View>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4A0887" />
        </View>
      ) : (
        <FlatList
          data={filteredTherapists}
          renderItem={renderTherapistCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={5}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#4A0887']}
            />
          }
        />
      )}

      {modalType === 'profile' && selectedTherapist && (
        <ProfileModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedTherapist={selectedTherapist}
        />
      )}

      {modalType === 'booking' && selectedTherapist && (
        <BookingModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          bookingDetails={bookingDetails}
          setBookingDetails={setBookingDetails}
          handleBookingSubmit={handleBookingSubmit}
          selectedTherapist={selectedTherapist} // Pass the selected therapist
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... existing styles ...

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
  button: {
    backgroundColor: '#6200ee',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonContent: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  therapistCard: {
    flexDirection: 'row',
    backgroundColor: '#F9F9FB',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    alignItems: 'flex-start',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#E1E8ED',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  therapistInfo: {
    flex: 1,
    paddingRight: 10,
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
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  icon: {
    marginRight: 5,
  },
  therapistAvailableDay: {
    fontSize: 14,
    color: '#666',
  },
  therapistTime: {
    fontSize: 14,
    color: '#666',
  },
  bookButton: {
    backgroundColor: '#6200ee',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  bookButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});