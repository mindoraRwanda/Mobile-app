import React, { useState, useCallback } from 'react';
import {
  View, Text, StyleSheet, Image, FlatList, TouchableOpacity,
  Modal, TextInput, SafeAreaView, StatusBar
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CancelBooking from '../../../../components/Cancel';

interface Therapist {
  id: string;
  name: string;
  location: string;
  job: string;
  image: any;
  description: string;
}

export default function Appointment() {
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
      const fetchTherapists = async () => {
        const data: Therapist[] = [
          {
            id: '1',
            name: 'Noella Nizigama',
            location: 'Kigali',
            job: 'Psychologist',
            image: require('../../../../assets/ImgForScreen/team3.jpg'),
            description: '"Exploring the intricate landscapes of the mind and unraveling the complexities of behavior, I navigate the realm of psychology. My journey delves into understanding the human psyche, decoding emotions, and deciphering the unique tapestry of human thought. Passionately committed to unraveling the mysteries of cognition, emotions, and behaviors, I embrace the fascinating world of psychology, driven by a curiosity to comprehend the intricacies of the human experience."'
          },
           {
            id: '2',
            name: 'Uwirora Gilbert',
            location: 'Kigali',
            job: 'Clinical Psychologist',
            image: require('../../../../assets/ImgForScreen/team2.jpg'),
            description: '"Exploring the intricate landscapes of the mind and unraveling the complexities of behavior, I navigate the realm of psychology. My journey delves into understanding the human psyche, decoding emotions, and deciphering the unique tapestry of human thought. Passionately committed to unraveling the mysteries of cognition, emotions, and behaviors, I embrace the fascinating world of psychology, driven by a curiosity to comprehend the intricacies of the human experience."'
           },
            {
              id: '3',
              name: 'Murenzi Patrick',
              location: 'Kigali',
              job: 'Psychologist',
              image: require('../../../../assets/ImgForScreen/team5.jpg'),
              description: '"Exploring the intricate landscapes of the mind and unraveling the complexities of behavior, I navigate the realm of psychology. My journey delves into understanding the human psyche, decoding emotions, and deciphering the unique tapestry of human thought. Passionately committed to unraveling the mysteries of cognition, emotions, and behaviors, I embrace the fascinating world of psychology, driven by a curiosity to comprehend the intricacies of the human experience."'
            },
            {
              id: '4',
              name: 'Nsengiyumva Athanaze',
              location: 'Kigali',
              job: 'Psychologist',
              image: require('../../../../assets/ImgForScreen/team6.jpg'),
              description: '"Exploring the intricate landscapes of the mind and unraveling the complexities of behavior, I navigate the realm of psychology. My journey delves into understanding the human psyche, decoding emotions, and deciphering the unique tapestry of human thought. Passionately committed to unraveling the mysteries of cognition, emotions, and behaviors, I embrace the fascinating world of psychology, driven by a curiosity to comprehend the intricacies of the human experience."'
            },
          {
            id: '5',
            name: 'Nsengiyumva Athanaze',
            location: 'Kigali',
            job: 'Psychologist',
            image: require('../../../../assets/ImgForScreen/team6.jpg'),
            description: '"Exploring the intricate landscapes of the mind and unraveling the complexities of behavior, I navigate the realm of psychology. My journey delves into understanding the human psyche, decoding emotions, and deciphering the unique tapestry of human thought. Passionately committed to unraveling the mysteries of cognition, emotions, and behaviors, I embrace the fascinating world of psychology, driven by a curiosity to comprehend the intricacies of the human experience."'
},
        ];
        setTherapists(data);
      };

      fetchTherapists();
    }, [])
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
    // Implement booking logic here
    console.log('Booking submitted:', bookingDetails);
    setModalVisible(false);
    // Reset booking details
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
    marginBottom: 4,
  },
  therapistJob: {
    fontSize: 14,
    color: '#4A0887',
    marginBottom: 2,
  },
  therapistLocation: {
    fontSize: 14,
    color: '#888',
  },
  bookButton: {
    backgroundColor: '#4A0887',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  bookButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 15,
  },
  modalName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  modalJob: {
    fontSize: 18,
    color: '#4A0887',
    textAlign: 'center',
    marginBottom: 5,
  },
  modalLocation: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A0887',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F0F4F8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: '#4A0887',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});