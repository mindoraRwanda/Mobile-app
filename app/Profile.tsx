// Profile.tsx
import React, { useState, useEffect } from 'react';
import {
  Animated,
  Easing,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { submitProfile } from '../redux/Slices/profileSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.profile);

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

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        if (userString) {
          const parsedUser = JSON.parse(userString);
          const userId = parsedUser.id || '';
          if (userId) {
            setForm((prevForm) => ({
              ...prevForm,
              userId,
            }));
          } else {
            Alert.alert('Error', 'User ID not found. Please sign up first.');
          }
        } else {
          Alert.alert('Error', 'User not found. Please sign up first.');
        }
      } catch (err) {
        console.error('Error fetching user from AsyncStorage:', err);
        Alert.alert('Error', 'Failed to retrieve user information.');
      }
    };

    fetchUserId();
  }, []);

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
    if (!form.userId) {
      Alert.alert('Error', 'User ID is missing. Please sign up first.');
      return;
    }

    dispatch(submitProfile(form))
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Profile submitted successfully!');
        router.push('./Main/Account/Accounts');
      })
      .catch((err) => {
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
    const indicators = [];
    for (let i = 1; i <= totalSteps; i++) {
      indicators.push(
        <View
          key={i}
          style={[
            styles.stepIndicatorItem,
            currentStep === i && styles.currentStepIndicatorItem,
            i < currentStep && styles.completedStepIndicatorItem,
          ]}
        >
          <Text style={styles.stepIndicatorText}>{i}</Text>
        </View>
      );
      if (i !== totalSteps) {
        indicators.push(<View key={`line-${i}`} style={styles.stepIndicatorLine} />);
      }
    }
    return <View style={styles.stepIndicatorContainer}>{indicators}</View>;
  };

  const steps = [
    {
      title: 'Medical Profile',
      section: 'medicalProfile',
      questions: [
        {
          label: 'Do you have any diagnosed mental health conditions? If so, please specify.',
          field: 'condition',
          multiline: true,
          keyboardType: 'default',
        },
        {
          label: 'Are you currently taking any medications? Please list them and their dosages.',
          field: 'currentMedications',
          multiline: true,
          keyboardType: 'default',
        },
        {
          label: 'Have you ever received mental health treatment before? If yes, please describe.',
          field: 'mentalHealthTreatmentHistory',
          multiline: true,
          keyboardType: 'default',
        },
      ],
    },
    {
      title: 'Medical Profile (Continued)',
      section: 'medicalProfile',
      questions: [
        {
          label: 'Do you have any allergies? Please list them.',
          field: 'allergies',
          multiline: true,
          keyboardType: 'default',
        },
        {
          label: 'Have you been hospitalized for mental health or other medical reasons? If so, please provide details.',
          field: 'previousHospitalizations',
          multiline: true,
          keyboardType: 'default',
        },
        {
          label: 'Do you use substances such as alcohol, tobacco, or recreational drugs? If yes, please specify.',
          field: 'substanceUse',
          multiline: true,
          keyboardType: 'default',
        },
        {
          label: 'Describe your sleep patterns (e.g., insomnia, oversleeping).',
          field: 'sleepPatterns',
          multiline: true,
          keyboardType: 'default',
        },
        {
          label: 'Describe your dietary habits (e.g., appetite changes, special diet).',
          field: 'dietaryHabits',
          multiline: true,
          keyboardType: 'default',
        },
        {
          label: 'Describe your physical activity level.',
          field: 'physicalActivity',
          multiline: true,
          keyboardType: 'default',
        },
      ],
    },
    {
      title: 'Personal Information',
      section: 'personalInformation',
      questions: [
        {
          label: 'What is your full name?',
          field: 'fullName',
          multiline: false,
          keyboardType: 'default',
        },
        {
          label: 'What is your date of birth?',
          field: 'dateOfBirth',
          multiline: false,
          keyboardType: 'default',
        },
        {
          label: 'What is your age?',
          field: 'age',
          multiline: false,
          keyboardType: 'numeric',
        },
        {
          label: 'What is your gender?',
          field: 'gender',
          multiline: false,
          keyboardType: 'default',
        },
        {
          label: 'What is your marital status?',
          field: 'maritalStatus',
          multiline: false,
          keyboardType: 'default',
        },
        {
          label: 'What is your occupation?',
          field: 'occupation',
          multiline: false,
          keyboardType: 'default',
        },
      ],
    },
    {
      title: 'Emergency Contact',
      section: 'emergencyContact',
      questions: [
        {
          label: 'What is the name of your emergency contact?',
          field: 'name',
          multiline: false,
          keyboardType: 'default',
        },
        {
          label: 'What is your relationship with this person?',
          field: 'relationship',
          multiline: false,
          keyboardType: 'default',
        },
        {
          label: 'What is their phone number?',
          field: 'contact',
          multiline: false,
          keyboardType: 'phone-pad',
        },
        {
          label: 'Do you consent to us contacting this person in case of emergency?',
          field: 'consentToContact',
          isCheckbox: true,
        },
      ],
    },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {renderStepIndicator()}
        <Animated.ScrollView
          contentContainerStyle={[styles.formContainer, { paddingBottom: 120 }]}
          style={{ opacity: fadeAnim }}
        >
          <Text style={styles.sectionTitle}>{steps[currentStep - 1].title}</Text>
          {steps[currentStep - 1].questions.map((question, index) => (
            <View key={index} style={styles.questionContainer}>
              <Text style={styles.question}>{question.label}</Text>
              {question.isCheckbox ? (
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() =>
                    handleChange(
                      steps[currentStep - 1].section as keyof FormState,
                      question.field,
                      !(form[steps[currentStep - 1].section] as any)[question.field]
                    )
                  }
                >
                  <View
                    style={[
                      styles.checkbox,
                      (form[steps[currentStep - 1].section] as any)[question.field] &&
                        styles.checkboxChecked,
                    ]}
                  >
                    {(form[steps[currentStep - 1].section] as any)[question.field] && (
                      <Ionicons name="checkmark" size={16} color="#FFF" />
                    )}
                  </View>
                  <Text style={styles.checkboxLabel}>
                    {(form[steps[currentStep - 1].section] as any)[question.field]
                      ? 'Yes'
                      : 'No'}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TextInput
                  style={[
                    styles.input,
                    question.multiline && styles.multilineInput,
                  ]}
                  multiline={question.multiline}
                  value={(form[steps[currentStep - 1].section] as any)[question.field]}
                  onChangeText={(text) =>
                    handleChange(
                      steps[currentStep - 1].section as keyof FormState,
                      question.field,
                      text
                    )
                  }
                  keyboardType={question.keyboardType}
                />
              )}
            </View>
          ))}
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

// Styles defined outside of the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#F0F4F8',
  },
  stepIndicatorItem: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentStepIndicatorItem: {
    backgroundColor: '#4A0887',
  },
  completedStepIndicatorItem: {
    backgroundColor: '#8E44AD',
  },
  stepIndicatorText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  stepIndicatorLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#DDD',
  },
  formContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    color: '#4A0887',
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  questionContainer: {
    marginBottom: 16,
  },
  question: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FFF',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkbox: {
    height: 24,
    width: 24,
    borderWidth: 1,
    borderColor: '#4A0887',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  checkboxChecked: {
    backgroundColor: '#4A0887',
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