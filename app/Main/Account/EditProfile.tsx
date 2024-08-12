import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons, FontAwesome, Entypo, MaterialIcons, Fontisto } from '@expo/vector-icons';
import ImagePicker from 'react-native-image-crop-picker';
import { router } from 'expo-router';

const EditProfile: React.FC = () => {
  const [name, setName] = useState('John Doe');
  const [dob, setDob] = useState('12/27/1995');
  const [email, setEmail] = useState('john@example.com');
  const [phone, setPhone] = useState('+250 783 974 066');
  const [gender, setGender] = useState('Male');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // const handlePickImage = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 300,
  //     cropping: true,
  //   }).then((image) => {
  //     setProfileImage(image.path);
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // };

  const handleSave = () => {
    // Implement save functionality here
    Alert.alert('Profile Updated', 'Your profile has been updated successfully.');
    router.push('../../Main');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('../../Main')}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
      </View>
      <View style={styles.profileImageContainer}>
        <TouchableOpacity
        // onPress={handlePickImage}
        >
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <FontAwesome name="user" size={50} color="#888" />
            </View>
          )}
          <View style={styles.editIconContainer}>
            <FontAwesome name="pencil" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            value={dob}
            onChangeText={setDob}
          />
          <Fontisto name="date" size={20} color="#888" style={styles.icon} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <MaterialIcons name="email" size={20} color="#888" style={styles.icon} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
          />
          <Entypo name="chevron-down" size={20} color="#888" style={styles.icon} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={gender}
            onChangeText={setGender}
          />
          <Entypo name="chevron-down" size={20} color="#888" style={styles.icon} />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  profileImageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1E90FF',
    borderRadius: 15,
    padding: 5,
  },
  form: {
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#000',
  },
  icon: {
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: '#4A0887',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    
  },
});

export default EditProfile;
