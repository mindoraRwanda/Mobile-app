import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, ImageBackground, SafeAreaView, Image, TouchableOpacity, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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
                onPress={() => navigation.navigate('UCLA Test' as never)}>
                <Image source={require('../../assets/ImgForScreen/EUC.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Beck's Depression Inventory</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Anxiety Questionnaire' as never)}>
                <Image source={require('../../assets/ImgForScreen/analysis.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Anxiety</Text>
                <Text style={styles.exerciseSubtext}>Take Test</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('SBQ Questionnaire' as never)}>
                <Image source={require('../../assets/ImgForScreen/booking.png')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Suicide Behaviors Questionnaire</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('AUDIT Questionnaire' as never)}>
                <Image source={require('../../assets/ImgForScreen/booking.png')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Alcohol Use Disorders Identification Test</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>

        <View style={styles.exercisesSection}>
          <View style={styles.listHeader}>
            <Text style={styles.listTitle}>Exercise </Text>
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
                onPress={() => navigation.navigate('Breathing Exercise' as never)}>
                <Image source={require('../../assets/ImgForScreen/Breathing.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Breathing</Text>
                <Text style={styles.exerciseSubtext}>Breathe Relax Revive</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Better Sleep' as never)}>
                <Image source={require('../../assets/ImgForScreen/med1.jpg')} style={styles.exerciseIcon} />
                <Text style={styles.exerciseText}>Better Sleep</Text>
                <Text style={styles.exerciseSubtext}>Relax Yourself</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.exerciseButton}
                onPress={() => navigation.navigate('Anxiety Management' as never)}>
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
          <Text style={styles.title}>Find Your Therapist </Text>
          <View style={styles.searchSection}>
            <TextInput
              style={styles.input}
              placeholder="Search therapists"
              onChangeText={text => setSearchText(text)}
            />
            <Icon style={styles.searchIcon} name="search" size={20} color="#fff" />
          </View>
        </View>

        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
          {therapists.map((therapist, index) => (
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
            <Button title="Close" onPress={() => setProfileModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={bookingModalVisible} animationType="slide">
        <ScrollView>
          <View style={styles.bookingModal}>
            <Text style={styles.bookingTitle}>Book Appointment with {selectedTherapist?.name}</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              onChangeText={text => setName(text)}
              value={name}
            />
            <TextInput
              style={styles.input}
              placeholder="Preferred Date (YYYY-MM-DD)"
              onChangeText={text => setDate(text)}
              value={date}
            />
            <TextInput
              style={styles.input}
              placeholder="Preferred Time (HH:MM)"
              onChangeText={text => setTime(text)}
              value={time}
            />
            <TextInput
              style={styles.textArea}
              placeholder="Reason for Appointment"
              onChangeText={text => setReason(text)}
              value={reason}
              multiline
              numberOfLines={4}
            />
            <View style={styles.buttonRow}>

              <TouchableOpacity style={styles.bookBtn}
                onPress={() => {
                  console.log(`Appointment booked with ${selectedTherapist?.name}`);
                  console.log(`Name: ${name}`);
                  console.log(`Date: ${date}`);
                  console.log(`Time: ${time}`);
                  console.log(`Reason: ${reason}`);
                  setBookingModalVisible(false);
                }}>
                <Text style={styles.bookBtnText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity  >
                <CancelBooking />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#F3F3F3',
    paddingHorizontal: 16,
  },
  exercisesSection: {
    marginBottom: 20,
  },
  listHeader: {
    marginBottom: 10,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    flexDirection: 'row',
  },
  exercisesList: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  exerciseButton: {
    alignItems: 'center',
    marginRight: 15,
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
    color: '#333',
  },
  exerciseSubtext: {
    fontSize: 12,
    color: '#666',
  },
  header: {
    paddingTop: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  searchIcon: {
    marginLeft: 8,
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#333',
  },
  therapy: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  therapyDesc: {
    flex: 1,
  },
  avatarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  avatarAddress: {
    fontSize: 14,
    color: '#666',
  },
  avatarJob: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  avatarButton: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#4A0887',
    borderRadius: 8,
    marginRight: 8,
  },
  buttonText: {
    fontSize: 14,
    color: '#FFF',
  },
  profileModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
  },
  modalBtn: {
    backgroundColor: '#4A0887'
  },
  profileContent: {
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  profileJob: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  profileDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  bookingModal: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    backgroundColor: '#FFF',
    padding: 16,
  },
  bookingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  bookBtn: {
    backgroundColor: '#4A0887',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  bookBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textArea: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: '#333',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
});