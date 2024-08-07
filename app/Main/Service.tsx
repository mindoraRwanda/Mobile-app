import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Button, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import CancelBooking from '../Cancel';

interface Therapist {
  name: string;
  location: string;
  job: string;
  image: any;
  description: string;
}

export default function Appointment() {
  const navigation = useNavigation();
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [profileModalVisible, setProfileModalVisible] = useState<boolean>(false);
  const [bookingModalVisible, setBookingModalVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');

  const therapists: Therapist[] = [
    {
      name: 'Noella Nizigama',
      location: 'Kigali',
      job: 'Psychologist',
      image: require('../../assets/ImgForScreen/team3.jpg'),
      description: '"Exploring the intricate landscapes of the mind and unraveling the complexities of behavior, I navigate the realm of psychology. My journey delves into understanding the human psyche, decoding emotions, and deciphering the unique tapestry of human thought. Passionately committed to unraveling the mysteries of cognition, emotions, and behaviors, I embrace the fascinating world of psychology, driven by a curiosity to comprehend the intricacies of the human experience."'
    },
    {
      name: 'Uwirora Gilbert',
      location: 'Kigali',
      job: 'Clinical Psychologist',
      image: require('../../assets/ImgForScreen/team2.jpg'),
      description: '"Exploring the intricate landscapes of the mind and unraveling the complexities of behavior, I navigate the realm of psychology. My journey delves into understanding the human psyche, decoding emotions, and deciphering the unique tapestry of human thought. Passionately committed to unraveling the mysteries of cognition, emotions, and behaviors, I embrace the fascinating world of psychology, driven by a curiosity to comprehend the intricacies of the human experience."'
    },
    {
      name: 'Murenzi Patrick',
      location: 'Kigali',
      job: 'Psychologist',
      image: require('../../assets/ImgForScreen/team5.jpg'),
      description: '"Exploring the intricate landscapes of the mind and unraveling the complexities of behavior, I navigate the realm of psychology. My journey delves into understanding the human psyche, decoding emotions, and deciphering the unique tapestry of human thought. Passionately committed to unraveling the mysteries of cognition, emotions, and behaviors, I embrace the fascinating world of psychology, driven by a curiosity to comprehend the intricacies of the human experience."'
    },
    {
      name: 'Nsengiyumva Athanaze',
      location: 'Kigali',
      job: 'Psychologist',
      image: require('../../assets/ImgForScreen/team6.jpg'),
      description: '"Exploring the intricate landscapes of the mind and unraveling the complexities of behavior, I navigate the realm of psychology. My journey delves into understanding the human psyche, decoding emotions, and deciphering the unique tapestry of human thought. Passionately committed to unraveling the mysteries of cognition, emotions, and behaviors, I embrace the fascinating world of psychology, driven by a curiosity to comprehend the intricacies of the human experience."'
    },
  ];

  // Function to filter therapists based on search text
  const filteredTherapists = therapists.filter(therapist =>
    therapist.name.toLowerCase().includes(searchText.toLowerCase()) ||
    therapist.job.toLowerCase().includes(searchText.toLowerCase()) ||
    therapist.location.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.main}>
      <ScrollView>
        <View style={styles.exercisesSection}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Mental Health Checkups</Text>
          </View>

          <ScrollView contentContainerStyle={styles.listContent} horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.exercisesList}>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Test' as never)}>
                <Image source={require('../../assets/ImgForScreen/EUC.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Beck's Depression Inventory</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Anxietys' as never)}>
                <Image source={require('../../assets/ImgForScreen/analysis.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Anxiety</Text>
                <Text style={styles.exerciseSubtext}>Take Test</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Suicide' as never)}>
                <Image source={require('../../assets/ImgForScreen/booking.png')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Suicide Behaviors Questionnaire</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Questionnaire' as never)}>
                <Image source={require('../../assets/ImgForScreen/booking.png')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Alcohol Use Disorders Identification Test</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <View style={styles.exercisesSection}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Exercise</Text>
          </View>

          <ScrollView contentContainerStyle={styles.listContent} horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.exercisesList}>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Meditation' as never)}>
                <Image source={require('../../assets/ImgForScreen/med.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Meditation</Text>
                <Text style={styles.exerciseSubtext}>Meditate with Melody</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Breathing' as never)}>
                <Image source={require('../../assets/ImgForScreen/Breathing.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Breathing</Text>
                <Text style={styles.exerciseSubtext}>Breathe Relax Revive</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Better' as never)}>
                <Image source={require('../../assets/ImgForScreen/med1.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Better Sleep</Text>
                <Text style={styles.exerciseSubtext}>Relax Yourself</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Anxiety' as never)}>
                <Image source={require('../../assets/ImgForScreen/relax.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Anxiety</Text>
                <Text style={styles.exerciseSubtext}>Relax Yourself</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Focus' as never)}>
                <Image source={require('../../assets/ImgForScreen/relax.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Focus</Text>
                <Text style={styles.exerciseSubtext}>Relax Yourself</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Find Your Therapist</Text>
          <View style={styles.searchSection}>
            <TextInput
              style={styles.input}
              placeholder="Search therapists"
              onChangeText={text => setSearchText(text)}
              value={searchText}
            />
            <Icon style={styles.searchIcon} name="search" size={20} color="#fff" />
          </View>
        </View>

        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
          {filteredTherapists.map((therapist, index) => (
            <View key={index} style={styles.therapy}>
              <Image source={therapist.image} style={styles.avatar} />
              <View style={styles.therapyDesc}>
                <Text style={styles.avatarTitle}>{therapist.name}</Text>
                <Text style={styles.avatarAddress}>{therapist.location}</Text>
                <Text style={styles.avatarJob}>{therapist.job}</Text>
                <View style={styles.avatarButton}>
                  <TouchableOpacity onPress={() => { setProfileModalVisible(true); setSelectedTherapist(therapist); }} style={styles.button}>
                    <Text style={styles.buttonText}>View Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => { setBookingModalVisible(true); setSelectedTherapist(therapist); }} style={styles.button}>
                    <Text style={styles.buttonText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      <Modal visible={profileModalVisible} animationType="slide">
        <View style={styles.profileModal}>
          <View style={styles.profileContent}>
            <Image source={selectedTherapist?.image} style={styles.profileImage} />
            <Text style={styles.profileName}>{selectedTherapist?.name}</Text>
            <Text style={styles.profileJob}>{selectedTherapist?.job}</Text>
            <Text style={styles.profileDescription}>{selectedTherapist?.description}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setProfileModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={bookingModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Book an Appointment</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Date (YYYY-MM-DD)"
            value={date}
            onChangeText={setDate}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Time (HH:MM)"
            value={time}
            onChangeText={setTime}
          />
          <TextInput
            style={styles.modalInput}
            placeholder="Reason for Visit"
            value={reason}
            onChangeText={setReason}
            multiline
            numberOfLines={4}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton}>
              <CancelBooking />
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setBookingModalVisible(false)} style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    marginTop: 50,
  },
  exercisesSection: {
    marginBottom: 20,
  },
  listHeader: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 10,
  },
  exercisesList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  exerciseButton: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    padding: 10,
    elevation: 3,
    width: 120,
  },
  exerciseIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 5,
  },
  exerciseText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  exerciseSubtext: {
    fontSize: 12,
    color: '#888',
  },
  header: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  searchSection: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  searchIcon: {
    padding: 10,
    backgroundColor: '#4A0887',
    borderRadius: 10,
  },
  therapy: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  therapyDesc: {
    flex: 1,
    justifyContent: 'center',
  },
  avatarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatarAddress: {
    fontSize: 14,
    color: '#666',
  },
  avatarJob: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  avatarButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Corrected to 'flex-end'
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4A0887',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  profileContent: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderColor: '#DDD',
    borderWidth: 2,
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  profileJob: {
    fontSize: 20,
    color: '#666',
    marginBottom: 16,
  },
  profileDescription: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    lineHeight: 22,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#4A0887',
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  modalInput: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f8f8f8',
  },
  modalReasonInput: {
    width: '100%',
    height: 150, // Adjust height for multiline input
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingTop: 15, // Add padding at the top
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f8f8f8',
    textAlignVertical: 'top', // Align text at the top
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#4A0887',
    paddingVertical: 15,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
