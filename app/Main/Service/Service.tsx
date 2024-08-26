import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import CancelBooking from '../../Cancel';

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
      image: require('../../../assets/ImgForScreen/team3.jpg'),
      description: '"Exploring the intricate landscapes of the mind and unraveling the complexities of behavior, I navigate the realm of psychology. My journey delves into understanding the human psyche, decoding emotions, and deciphering the unique tapestry of human thought. Passionately committed to unraveling the mysteries of cognition, emotions, and behaviors, I embrace the fascinating world of psychology, driven by a curiosity to comprehend the intricacies of the human experience."'
    },
    {
      name: 'Uwirora Gilbert',
      location: 'Kigali',
      job: 'Clinical Psychologist',
      image: require('../../../assets/ImgForScreen/team2.jpg'),
      description: '"Exploring the intricate landscapes of the mind and unraveling the complexities of behavior, I navigate the realm of psychology. My journey delves into understanding the human psyche, decoding emotions, and deciphering the unique tapestry of human thought. Passionately committed to unraveling the mysteries of cognition, emotions, and behaviors, I embrace the fascinating world of psychology, driven by a curiosity to comprehend the intricacies of the human experience."'
    },
    {
      name: 'Murenzi Patrick',
      location: 'Kigali',
      job: 'Psychologist',
      image: require('../../../assets/ImgForScreen/team5.jpg'),
      description: '"Exploring the intricate landscapes of the mind and unraveling the complexities of behavior, I navigate the realm of psychology. My journey delves into understanding the human psyche, decoding emotions, and deciphering the unique tapestry of human thought. Passionately committed to unraveling the mysteries of cognition, emotions, and behaviors, I embrace the fascinating world of psychology, driven by a curiosity to comprehend the intricacies of the human experience."'
    },
    {
      name: 'Nsengiyumva Athanaze',
      location: 'Kigali',
      job: 'Psychologist',
      image: require('../../../assets/ImgForScreen/team6.jpg'),
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
                <Image source={require('../../../assets/ImgForScreen/EUC.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Beck's Depression Inventory</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Resources' as never)}>
                <Image source={require('../../../assets/ImgForScreen/EUC.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Resource</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Anxietys' as never)}>
                <Image source={require('../../../assets/ImgForScreen/analysis.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Anxiety</Text>
                <Text style={styles.exerciseSubtext}>Take Test</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Suicide' as never)}>
                <Image source={require('../../../assets/ImgForScreen/booking.png')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Suicide Behaviors Questionnaire</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Questionnaire' as never)}>
                <Image source={require('../../../assets/ImgForScreen/booking.png')} style={styles.exerciseIcon} />
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
                <Image source={require('../../../assets/ImgForScreen/med.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Meditation</Text>
                <Text style={styles.exerciseSubtext}>Meditate with Melody</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Breathing' as never)}>
                <Image source={require('../../../assets/ImgForScreen/Breathing.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Breathing</Text>
                <Text style={styles.exerciseSubtext}>Breathe Relax Revive</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Better' as never)}>
                <Image source={require('../../../assets/ImgForScreen/med1.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Better Sleep</Text>
                <Text style={styles.exerciseSubtext}>Relax Yourself</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Anxiety' as never)}>
                <Image source={require('../../../assets/ImgForScreen/relax.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Anxiety</Text>
                <Text style={styles.exerciseSubtext}>Relax Yourself</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Focus' as never)}>
                <Image source={require('../../../assets/ImgForScreen/relax.jpg')} style={styles.exerciseIcon} />
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
                    <Text style={styles.buttonText}>Booking</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </ScrollView>

      {/* Therapist Profile Modal */}
      <Modal visible={profileModalVisible} animationType="slide" transparent={true}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <ScrollView>
              <TouchableOpacity onPress={() => setProfileModalVisible(false)} style={styles.closeButton}>
                <Icon name="times" size={30} color="#333" />
              </TouchableOpacity>
              <Image source={selectedTherapist?.image} style={styles.modalImage} />
              <Text style={styles.modalTitle}>{selectedTherapist?.name}</Text>
              <Text style={styles.modalText}>{selectedTherapist?.location}</Text>
              <Text style={styles.modalText}>{selectedTherapist?.job}</Text>
              <Text style={styles.modalDescription}>{selectedTherapist?.description}</Text>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Appointment Booking Modal */}
      <Modal visible={bookingModalVisible} animationType="slide" transparent={true}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Book an Appointment</Text>

            <TextInput
              style={styles.modalInput}
              placeholder="Your Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#888"
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Date (YYYY-MM-DD)"
              value={date}
              onChangeText={setDate}
              placeholderTextColor="#888"
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Time (HH:MM)"
              value={time}
              onChangeText={setTime}
              placeholderTextColor="#888"
            />

            <TextInput
              style={styles.modalReasonInput}
              placeholder="Reason for Visit"
              value={reason}
              onChangeText={setReason}
              multiline
              numberOfLines={4}
              placeholderTextColor="#888"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity >
                <CancelBooking/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={() => setBookingModalVisible(false)}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#E5E8E8',
    marginTop: 30,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A0887',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    marginRight: 10,
  },
  searchIcon: {
    padding: 10,
    color: '#4A0887',

  },
  therapy: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  therapyDesc: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  avatarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  avatarAddress: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  avatarJob: {
    fontSize: 16,
    color: '#4A0887',
    marginBottom: 5,
  },
  avatarButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4A0887',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  exercisesSection: {
    marginVertical: 5,
  },
  listHeader: {
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  listTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A0887',
  },
  listContent: {
    paddingHorizontal: 20,
  },
  exercisesList: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exerciseButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginRight: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: 150,
    height: 150,
  },
  exerciseIcon: {
    width: 100,
    height: 55,
    marginBottom: 3,
  },
  exerciseText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  exerciseSubtext: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalInput: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  modalReasonInput: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingTop: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 15,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  confirmButton: {
    backgroundColor: '#4A0887',
    paddingVertical: 15,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  cancelButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});
