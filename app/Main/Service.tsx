import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, ImageBackground, SafeAreaView, Image, TouchableOpacity, Button, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

interface Therapist {
  name: string;
  location: string;
  job: string;
  image: any;
  description: string;
}

export default function Service() {
  const navigation = useNavigation();
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [profileModalVisible, setProfileModalVisible] = useState<boolean>(false);
  const [bookingModalVisible, setBookingModalVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [searchText, setSearchText] = useState<string>('');

  const therapists: Therapist[] = [
    { 
      name: 'Noella Nizigama', 
      location: 'Kigali', 
      job: 'Psychologist',
      image: require('../../assets/ImgForScreen/user.jpg'),
      description: '"Exploring the intricate landscapes of the mind and unraveling the complexities of behavior, I navigate the realm of psychology. My journey delves into understanding the human psyche, decoding emotions, and deciphering the unique tapestry of human thought. Passionately committed to unraveling the mysteries of cognition, emotions, and behaviors, I embrace the fascinating world of psychology, driven by a curiosity to comprehend the intricacies of the human experience."' 
    },
    // ... (other therapists)
  ];

  return (
    <View style={style.main}>
      <View style={style.exercisesSection}>
        <View style={style.listHeader}>
          <Text style={style.listTitle}>Mental Health Checkups</Text>
        </View>

        <ScrollView contentContainerStyle={style.listContent} horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={style.exercisesList}>
            <TouchableOpacity style={style.exerciseButton} onPress={() => navigation.navigate('UCLA Test')}>
              <Image source={require('../../assets/ImgForScreen/AITalk.jpg')} style={style.exerciseIcon} />
              <Text style={style.exerciseText}>Beck's Depression Inventory</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.exerciseButton} onPress={() => navigation.navigate('Anxiety Questionnaire')}>
              <Image source={require('../../assets/ImgForScreen/AITalk.jpg')} style={style.exerciseIcon} />
              <Text style={style.exerciseText}>Anxiety</Text>
              <Text style={style.exerciseSubtext}>Take Test</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.exerciseButton} onPress={() => navigation.navigate('SBQ Questionnaire')}>
              <Image source={require('../../assets/ImgForScreen/AITalk.jpg')} style={style.exerciseIcon} />
              <Text style={style.exerciseText}>Suicide Behaviors Questionnaire</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.exerciseButton} onPress={() => navigation.navigate('AUDIT Questionnaire')}>
              <Image source={require('../../assets/ImgForScreen/AITalk.jpg')} style={style.exerciseIcon} />
              <Text style={style.exerciseText}>Alcohol Use Disorders Identification Test</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={style.exercisesSection}>
        <View style={style.listHeader}>
          <Text style={style.listTitle}>Exercise</Text>
        </View>

        <ScrollView contentContainerStyle={style.listContent} horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={style.exercisesList}>
            <TouchableOpacity style={style.exerciseButton} onPress={() => navigation.navigate('Meditation')}>
              <Image source={require('../../assets/ImgForScreen/AITalk.jpg')} style={style.exerciseIcon} />
              <Text style={style.exerciseText}>Meditation</Text>
              <Text style={style.exerciseSubtext}>Meditate with Melody</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.exerciseButton} onPress={() => navigation.navigate('Breathing Exercise')}>
              <Image source={require('../../assets/ImgForScreen/AITalk.jpg')} style={style.exerciseIcon} />
              <Text style={style.exerciseText}>Breathing</Text>
              <Text style={style.exerciseSubtext}>Breathe Relax Revive</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.exerciseButton} onPress={() => navigation.navigate('Better Sleep')}>
              <Image source={require('../../assets/ImgForScreen/relax.jpg')} style={style.exerciseIcon} />
              <Text style={style.exerciseText}>Better Sleep</Text>
              <Text style={style.exerciseSubtext}>Relax Yourself</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.exerciseButton} onPress={() => navigation.navigate(' ')}>
              <Image source={require('../../assets/ImgForScreen/AITalk.jpg')} style={style.exerciseIcon} />
              <Text style={style.exerciseText}>Anxiety</Text>
              <Text style={style.exerciseSubtext}>Relax Yourself</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.exerciseButton} onPress={() => navigation.navigate(' ')}>
              <Image source={require('../../assets/ImgForScreen/AITalk.jpg')} style={style.exerciseIcon} />
              <Text style={style.exerciseText}>Focus</Text>
              <Text style={style.exerciseSubtext}>Relax Yourself</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <View style={style.header}>
        <Text style={style.title}>Find Your Therapist</Text>
        <View style={style.searchSection}>
          <TextInput
            style={style.searchInput}
            placeholder="Search therapists"
            onChangeText={setSearchText}
            value={searchText}
          />
          <Icon style={style.searchIcon} name="search" size={20} color="#fff" />
        </View>
      </View>

      <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
        {therapists.map((therapist, index) => (
          <View key={index} style={style.therapy}>
            <Image source={therapist.image} style={style.avatar} />
            <View style={style.dec}>
              <Text style={style.avatarTitle}>{therapist.name}</Text>
              <Text style={style.avatarAddress}>{therapist.location}</Text>
              <Text style={style.avatarJob}>{therapist.job}</Text>
              <View style={style.avatarButton}>
                <TouchableOpacity onPress={() => { setProfileModalVisible(true); setSelectedTherapist(therapist); }}>
                  <Text style={style.avatarButtonText}>Visit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal visible={profileModalVisible} onRequestClose={() => setProfileModalVisible(false)}>
        {selectedTherapist && (
          <View style={style.modalContent}>
            <Image source={selectedTherapist.image} style={style.avatarModel} />
            <View style={style.box}>
              <Text style={style.title}>Doctor's Description</Text>
              <Text style={style.avatarTitle}>{selectedTherapist.name}</Text>
              <Text style={style.avatarAddress}>{selectedTherapist.location}</Text>
              <Text style={style.avatarJob}>{selectedTherapist.job}</Text>
              <Text style={style.avatarDescription}>{selectedTherapist.description}</Text>
            </View>
          </View>
        )}
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            backgroundColor: 'rgba(74, 8, 135, 0.757)',
            borderRadius: 30,
            padding: 10
          }}
          onPress={() => setProfileModalVisible(false)}
        >
          <Icon name="times" size={24} color="white" />
        </TouchableOpacity>
        <View style={style.box}>
          <Text style={style.title}>Book an Appointment</Text>
          <TextInput
            style={style.modalInput}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={style.modalInput}
            placeholder="Date (dd/mm/yyyy)"
            value={date}
            onChangeText={setDate}
          />
          <TextInput
            style={style.modalInput}
            placeholder="Time (HH:MM)"
            value={time}
            onChangeText={setTime}
          />
          <Button title="Submit" onPress={() => {
            // Handle form submission
            setProfileModalVisible(false);
          }} />
        </View>
      </Modal>
    </View>
  );
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F3F4F6'
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: '#4A0897'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff'
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 1
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333'
  },
  searchIcon: {
    marginLeft: 10
  },
  therapy: {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 1
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10
  },
  dec: {
    flex: 1,
    justifyContent: 'center'
  },
  avatarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  avatarAddress: {
    fontSize: 14,
    color: '#777'
  },
  avatarJob: {
    fontSize: 14,
    color: '#777'
  },
  avatarButton: {
    marginTop: 10,
    alignSelf: 'flex-start'
  },
  avatarButtonText: {
    fontSize: 14,
    color: '#4A0897'
  },
  exercisesSection: {
    marginBottom: 20
  },
  listHeader: {
    paddingHorizontal: 20,
    paddingBottom: 10
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  listContent: {
    paddingLeft: 20
  },
  exercisesList: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  exerciseButton: {
    marginRight: 10,
    alignItems: 'center'
  },
  exerciseIcon: {
    width: 80,
    height: 80,
    borderRadius: 10
  },
  exerciseText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center'
  },
  exerciseSubtext: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center'
  },
  avatarModel: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginTop: 20
  },
  modalContent: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  box: {
    padding: 20,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 1
  },
  avatarDescription: {
    fontSize: 14,
    color: '#777'
  },
  modalInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10
  }
});
