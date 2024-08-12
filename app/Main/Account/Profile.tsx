import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAppDispatch } from '@/redux/hooks';

const questions = [
  {
    question: 'What type of therapy are you looking for?',
    options: [
      'Individual (for myself)',
      'Couples (for myself and my partner)',
      'Teen (for my child)',
    ],
  },
  {
    question: 'Do you have any current medical conditions?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Are you currently taking any medications?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Have you been diagnosed with any psychiatric conditions in the past?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Have you been hospitalized for psychiatric reasons in the past?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Do any of your family members have a history of mental health conditions?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Do any of your family members have medical conditions?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Please describe your symptoms.',
    options: ['Open-ended response'],
  },
  {
    question: 'How do your symptoms impact your daily life?',
    options: ['Open-ended response'],
  },
  {
    question: 'Do you experience any sleep issues?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Do you experience any appetite issues?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Do you experience any energy level issues?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Have you noticed any changes in your behavior or mood?',
    options: ['Yes', 'No'],
  },
  {
    question: 'What is your current living situation?',
    options: ['Open-ended response'],
  },
  {
    question: 'What is your current employment status?',
    options: ['Open-ended response'],
  },
  {
    question: 'Do you have a support system?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Have you experienced any recent life changes or stressors?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Do you use any substances?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Have you struggled with substance abuse in the past?',
    options: ['Yes', 'No'],
  },
  {
    question: 'What coping mechanisms do you use?',
    options: ['Open-ended response'],
  },
  {
    question: 'What are your strengths?',
    options: ['Open-ended response'],
  },
  {
    question: 'Have you had any thoughts of self-harm?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Have you attempted suicide in the past?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Are you currently having thoughts of self-harm?',
    options: ['Yes', 'No'],
  },
  {
    question: 'What are your goals for treatment?',
    options: ['Open-ended response'],
  },
  {
    question: 'What are your expectations for treatment?',
    options: ['Open-ended response'],
  },
  {
    question: 'Do you have any cultural beliefs that should be considered?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Do you have any religious beliefs that should be considered?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Do you experience any cognitive issues?',
    options: ['Yes', 'No'],
  },
  {
    question: 'Please provide some information about your developmental history.',
    options: ['Open-ended response'],
  },
  {
    question: 'Do you have any legal issues that should be considered?',
    options: ['Yes', 'No'],
  },
];

const Profile: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleButtonPress = (option: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: option,
    }));
  };

  const handleTextInput = (text: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: text,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      Alert.alert('Please answer all questions before submitting.');
      return;
    }

    console.log('Submit answers:', answers);
    Alert.alert('Profile updated successfully');
    router.push('/Main');
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswerProvided = answers[currentQuestionIndex] !== undefined;
  const selectedOption = answers[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.topContainer}>
          <Image source={require('../../../assets/ImgForScreen/AITalk.jpg')} style={styles.logo} />
          <Text style={styles.heading}>Help us match you to the right therapist</Text>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{currentQuestion.question}</Text>
          {currentQuestion.options.map((option, optionIndex) => (
            option === 'Open-ended response' ? (
              <TextInput
                key={optionIndex}
                style={styles.textInput}
                placeholder="Enter your response"
                multiline
                onChangeText={handleTextInput}
                value={answers[currentQuestionIndex] || ''}
              />
            ) : (
              <TouchableOpacity
                key={optionIndex}
                style={[
                  styles.button,
                  selectedOption === option && styles.selectedButton,
                ]}
                onPress={() => handleButtonPress(option)}
              >
                <Text style={[
                  styles.buttonText,
                  selectedOption === option && styles.selectedButtonText,
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            )
          ))}
        </View>
        <View style={styles.navigationContainer}>
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            <Text style={styles.navigationButtonText}>Previous</Text>
          </TouchableOpacity>
          {currentQuestionIndex === questions.length - 1 ? (
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.navigationButton}
              onPress={handleNext}
              disabled={!isAnswerProvided}
            >
              <Text style={styles.navigationButtonText}>Next</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  topContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 350,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  questionContainer: {
    padding: 20,
    justifyContent: 'center',
  },
  question: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  selectedButton: {
    backgroundColor: '#4a4a4a', // Change this to your preferred color
  },
  buttonText: {
    fontSize: 16,
  },
  selectedButtonText: {
    color: '#fff', // Change this to match the button color if needed
  },
  textInput: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    textAlignVertical: 'top',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  navigationButton: {
    padding: 10,
    backgroundColor: 'rgba(74, 8, 135, 1)',
    borderRadius: 5,
  },
  navigationButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  submitButton: {
    padding: 10,
    backgroundColor: 'rgba(74, 8, 135, 1)',
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Profile;
