import React, { useState } from 'react';
import { Modal, View, Text, StyleSheet, ImageBackground, SafeAreaView, Image, TouchableOpacity, Button, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

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
          <Icon style={styles.searchIcon} name="search" size={20} color="#fff"/>
        </View>
      </View> 
      
      <ScrollView horizontal={false} showsHorizontalScrollIndicator={false}>
        {therapists.map((therapist, index) => (
          <View key={index} style={styles.therapy}>
            <Image source={therapist.image} style={styles.avatar}/>
            <View style={styles.therapyDesc}>
              <Text style={styles.avatarTitle}>{therapist.name}</Text>
              <Text style={styles.avatarAddress}>{therapist.location}</Text>
              <Text style={styles.avatarJob}>{therapist.job}</Text>
              <View style={styles.avatarButton}>
                <TouchableOpacity onPress={() => {setProfileModalVisible(true); setSelectedTherapist(therapist);}}>
                  <Text style={styles.avatarButtonText}>Visite</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal visible={profileModalVisible} onRequestClose={() => setProfileModalVisible(false)}>
        {selectedTherapist && (
          <View style={styles.modalContent}>
            <Image source={selectedTherapist.image} style={styles.avatarModel}/>
            <View style={styles.box}>
              <Text style={styles.title}>Doctor's Description</Text>
              <Text style={styles.avatarTitle}>{selectedTherapist.name}</Text>
              <Text style={styles.avatarAddress}>{selectedTherapist.location}</Text>
              <Text style={styles.avatarJob}>{selectedTherapist.job}</Text>
              <Text style={styles.avatarDescription}>{selectedTherapist.description}</Text>
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
        <View style={styles.box}>
          <Text style={styles.title}>Book an Appointment</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Date (dd/mm/yyyy)"
            value={date}
            onChangeText={setDate}
          />
          <TextInput
            style={styles.input}
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

const styles = StyleSheet.create({
  main: {},
  header: {
    color: 'white',
    width: '100%',
    paddingLeft: 20,
  },
  header1: {
    fontSize: 50,
    color: 'purple',
    marginTop: 20,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 30,
    color: 'black',
    marginTop: 10,
    fontWeight: 'bold'
  },
  therapy: {
    backgroundColor: 'white',
    borderColor: 'rgba(74, 8, 135, 0.157)',
    width: '90%',
    height: 120,
    padding: 20,
    borderRadius: 10,
    marginLeft: '5%',
    marginBottom: 10,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  therapyDesc: {
    width: '60%',
    height: 100,
  },
  avatar: {
    width: 100,
    height: 120,
    alignSelf: 'center',
    borderTopLeftRadius: 10, 
    borderBottomLeftRadius: 10, 
  },
  avatarTitle: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold'
  },
  avatarAddress: {
    fontSize: 13,
    color: 'black',
    fontWeight: 'bold'
  },
  avatarJob: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold'
  },
  avatarButton: {},
  avatarButtonText: {
    fontSize: 18,
    width: 100,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: 'rgba(74, 8, 135, 0.757)',
    borderRadius: 5,
    padding: 5
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    height: 'auto',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  avatarDescription: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
  },
  avatarModel: {
    width: '100%',
    height: 200,
    alignSelf: 'center',
    marginBottom: 10
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 25,
    borderColor: 'gray',
  },
  searchIcon: {
    padding: 10,
    backgroundColor: '#800080',
    borderRadius: 10,
  },
  box: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  exercisesSection: {
    marginVertical: 8,
    paddingHorizontal: 1,
  },
  exercisesList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  exerciseButton: {
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 150,
    height: 100,
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginLeft: 12,
  },
  exerciseIcon: {
    width: '100%',
    height: 60,
  },
  exerciseText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 6,
  },
 
  exerciseSubtext: {
    fontSize: 14,
    color: '#666',
  },
  seeAllButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
  },
  seeAllButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
     marginBottom: 6,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 22,
    color: '#121a26',
  },
  listAction: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#778599',
  },
})

