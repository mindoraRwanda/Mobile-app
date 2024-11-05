// Profile.tsx
import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Easing,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store'; 
import { submitProfile } from '../redux/Slices/profileSlice'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, patientId } = useSelector((state: RootState) => state.profile);

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  type MedicalProfile = {
    condition: string;
    prison: string;
    currentMedications: string;
    mentalHealthTreatmentHistory: string;
    allergies: string;
    previousHospitalizations: string;
    substanceUse: string;
    sleepPatterns: string;
    dietaryHabits: string;
    physicalActivity: string;
  };

  type PersonalInformation = {
    fullName: string;
    dateOfBirth: string;
    age: string;
    gender: string;
    maritalStatus: string;
    occupation: string;
    educationLevel: string;
    lifestyleFactors: string;
    livingSituation: string;
    stressFactors: string;
    hobbiesAndInterests: string;
    pastTrauma: string;
  };

  type EmergencyContact = {
    name: string;
    relationship: string;
    contact: string;
    alternateContact: string;
    consentToContact: boolean;
  };

  type FormState = {
    userId: string;
    medicalProfile: MedicalProfile;
    personalInformation: PersonalInformation;
    emergencyContact: EmergencyContact;
  };

  const [form, setForm] = useState<FormState>({
    userId: '',
    medicalProfile: {
      condition: '',
      prison: '',
      currentMedications: '',
      mentalHealthTreatmentHistory: '',
      allergies: '',
      previousHospitalizations: '',
      substanceUse: '',
      sleepPatterns: '',
      dietaryHabits: '',
      physicalActivity: '',
    },
    personalInformation: {
      fullName: '',
      dateOfBirth: '',
      age: '',
      gender: '',
      maritalStatus: '',
      occupation: '',
      educationLevel: '',
      lifestyleFactors: '',
      livingSituation: '',
      stressFactors: '',
      hobbiesAndInterests: '',
      pastTrauma: '',
    },
    emergencyContact: {
      name: '',
      relationship: '',
      contact: '',
      alternateContact: '',
      consentToContact: false,
    },
  });

  // Fetch userId from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          setForm((prevForm) => ({
            ...prevForm,
            userId: parsedUser.userId || '',
          }));
        }
      } catch (err) {
        console.error('Error fetching user from AsyncStorage:', err);
        Alert.alert('Error', 'Failed to retrieve user information.');
      }
    };

    fetchUserId();
  }, []);

  // Optional: Handle displaying errors
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const handleChange = (
    section: keyof FormState,
    field: string,
    value: string | boolean
  ) => {
    setForm((prevForm) => ({
      ...prevForm,
      [section]: {
        ...(prevForm[section] as any),
        [field]: value,
      },
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
  // Basic validation to ensure userId is present
  if (!form.userId) {
    Alert.alert('Error', 'User ID is missing. Please sign up first.');
    return;
  }

  // Dispatch the submitProfile action with the form data
  dispatch(submitProfile(form))
    .unwrap()
    .then((res) => {
      Alert.alert('Success', 'Profile submitted successfully!');
      // Navigate to another screen or perform other actions here
    })
    .catch((err) => {
      // Errors are already handled in the useEffect above
      console.error('Profile submission failed:', err);
      Alert.alert('Error', `Failed to submit profile: ${err}`);
    });
};

  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [currentStep]);

  const renderStepIndicator = () => {
    const steps = [];
    for (let i = 1; i <= totalSteps; i++) {
      steps.push(
        <View
          key={i}
          style={[
            styles.step,
            currentStep === i && styles.currentStep,
            i < currentStep && styles.completedStep,
          ]}
        >
          <Text style={styles.stepText}>{i}</Text>
        </View>
      );
      if (i !== totalSteps) {
        steps.push(<View key={`line-${i}`} style={styles.stepLine} />);
      }
    }
    return <View style={styles.stepIndicator}>{steps}</View>;
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {renderStepIndicator()}
        <Animated.ScrollView
          contentContainerStyle={styles.formContainer}
          style={{ opacity: fadeAnim }}
        >
          {currentStep === 1 && (
            <>
              <Text style={styles.sectionTitle}>Medical Profile</Text>

              <Text style={styles.question}>
                Do you have any diagnosed mental health conditions? If so, please specify.
              </Text>
              <TextInput
                style={styles.input}
                multiline
                value={form.medicalProfile.condition}
                onChangeText={(text) => handleChange('medicalProfile', 'condition', text)}
              />

              <Text style={styles.question}>
                Are you currently taking any medications? Please list them and their dosages.
              </Text>
              <TextInput
                style={styles.input}
                multiline
                value={form.medicalProfile.currentMedications}
                onChangeText={(text) =>
                  handleChange('medicalProfile', 'currentMedications', text)
                }
              />

              <Text style={styles.question}>
                Have you ever received mental health treatment before? If yes, please describe.
              </Text>
              <TextInput
                style={styles.input}
                multiline
                value={form.medicalProfile.mentalHealthTreatmentHistory}
                onChangeText={(text) =>
                  handleChange('medicalProfile', 'mentalHealthTreatmentHistory', text)
                }
              />
            </>
          )}

          {currentStep === 2 && (
            <>
              <Text style={styles.sectionTitle}>Medical Profile (Continued)</Text>

              <Text style={styles.question}>Do you have any allergies? Please list them.</Text>
              <TextInput
                style={styles.input}
                multiline
                value={form.medicalProfile.allergies}
                onChangeText={(text) => handleChange('medicalProfile', 'allergies', text)}
              />

              <Text style={styles.question}>
                Have you been hospitalized for mental health or other medical reasons? If so, please
                provide details.
              </Text>
              <TextInput
                style={styles.input}
                multiline
                value={form.medicalProfile.previousHospitalizations}
                onChangeText={(text) =>
                  handleChange('medicalProfile', 'previousHospitalizations', text)
                }
              />

              <Text style={styles.question}>
                Do you use substances such as alcohol, tobacco, or recreational drugs? If yes,
                please specify.
              </Text>
              <TextInput
                style={styles.input}
                multiline
                value={form.medicalProfile.substanceUse}
                onChangeText={(text) => handleChange('medicalProfile', 'substanceUse', text)}
              />
            </>
          )}

          {currentStep === 3 && (
            <>
              <Text style={styles.sectionTitle}>Personal Information</Text>

              <Text style={styles.question}>What is your full name?</Text>
              <TextInput
                style={styles.input}
                value={form.personalInformation.fullName}
                onChangeText={(text) => handleChange('personalInformation', 'fullName', text)}
              />

              <Text style={styles.question}>What is your date of birth?</Text>
              <TextInput
                style={styles.input}
                value={form.personalInformation.dateOfBirth}
                onChangeText={(text) => handleChange('personalInformation', 'dateOfBirth', text)}
              />

              <Text style={styles.question}>What is your age?</Text>
              <TextInput
                style={styles.input}
                value={form.personalInformation.age}
                onChangeText={(text) => handleChange('personalInformation', 'age', text)}
                keyboardType="numeric"
              />

              <Text style={styles.question}>What is your gender?</Text>
              <TextInput
                style={styles.input}
                value={form.personalInformation.gender}
                onChangeText={(text) => handleChange('personalInformation', 'gender', text)}
              />
            </>
          )}

          {currentStep === 4 && (
            <>
              <Text style={styles.sectionTitle}>Emergency Contact</Text>

              <Text style={styles.question}>What is the name of your emergency contact?</Text>
              <TextInput
                style={styles.input}
                value={form.emergencyContact.name}
                onChangeText={(text) => handleChange('emergencyContact', 'name', text)}
              />

              <Text style={styles.question}>What is your relationship with this person?</Text>
              <TextInput
                style={styles.input}
                value={form.emergencyContact.relationship}
                onChangeText={(text) =>
                  handleChange('emergencyContact', 'relationship', text)
                }
              />

              <Text style={styles.question}>What is their phone number?</Text>
              <TextInput
                style={styles.input}
                value={form.emergencyContact.contact}
                onChangeText={(text) => handleChange('emergencyContact', 'contact', text)}
                keyboardType="phone-pad"
              />

              <Text style={styles.question}>
                Do you consent to us contacting this person in case of emergency?
              </Text>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() =>
                  handleChange(
                    'emergencyContact',
                    'consentToContact',
                    !form.emergencyContact.consentToContact
                  )
                }
              >
                <View
                  style={[
                    styles.checkbox,
                    form.emergencyContact.consentToContact && styles.checkboxChecked,
                  ]}
                >
                  {form.emergencyContact.consentToContact && (
                    <Ionicons name="checkmark" size={16} color="#FFF" />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>
                  {form.emergencyContact.consentToContact ? 'Yes' : 'No'}
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Animated.ScrollView>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          {currentStep > 1 && (
            <TouchableOpacity style={styles.navButton} onPress={prevStep}>
              <Ionicons name="arrow-back" size={24} color="#FFF" />
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
          )}
          {currentStep < totalSteps && (
            <TouchableOpacity style={styles.navButton} onPress={nextStep}>
              <Text style={styles.navButtonText}>Next</Text>
              <Ionicons name="arrow-forward" size={24} color="#FFF" />
            </TouchableOpacity>
          )}
          {currentStep === totalSteps && (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <>
                  <Text style={styles.submitButtonText}>Submit</Text>
                  <Ionicons name="checkmark-done" size={24} color="#FFF" />
                </>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#F0F4F8',
  },
  step: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentStep: {
    backgroundColor: '#4A0887',
  },
  completedStep: {
    backgroundColor: '#8E44AD',
  },
  stepText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#DDD',
  },
  formContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 28,
    color: '#4A0887',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  question: {
    fontSize: 16,
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 12,
    padding: 12,
    backgroundColor: '#FFF',
    elevation: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  checkbox: {
    height: 24,
    width: 24,
    borderWidth: 1,
    borderColor: '#4A0887',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF', // Default background
    borderRadius: 4,
  },
  checkboxChecked: {
    backgroundColor: '#4A0887', // Change background when checked
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    flexDirection: 'row',
    backgroundColor: '#4A0887',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
  },
  navButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 8,
  },
  submitButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#28A745',
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
});