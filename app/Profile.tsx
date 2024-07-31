import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, TextInput, NativeSyntheticEvent, NativeScrollEvent, Alert, LayoutChangeEvent } from 'react-native';
import React, { useState, useRef } from 'react';
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

interface Question {
  question: string;
  options: string[];
}


const Profile: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionWidth, setQuestionWidth] = useState<number>(0);


  const handleButtonPress = (questionIndex: number, option: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: option,
    }));
    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        if (scrollViewRef.current && questionWidth) {
          scrollViewRef.current.scrollTo({
            x: nextIndex * questionWidth,
            animated: true,
          });
        }
        return nextIndex;
      });
    }, 200); // Short delay to allow color change animation
  };

  const handleTextInput = (questionIndex: number, text: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: text,
    }));
  };

  const handleSubmit = () => {
    console.log('Submit answers:', answers);
    Alert.alert('Profile updated successfully')
    router.push('/home'); // Adjust the path as needed
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setQuestionWidth(width);
  };




  return (
    <ScrollView style={styles.verticalScrollContainer}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image source={require('../assets/ImgForScreen/AITalk.jpg')} style={styles.logo} />
          <Text style={styles.heading}>Help us match you to the right therapist</Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {questions.map((question, index) => (
            <View key={index} style={styles.questionContainer}>
              <Text style={styles.question}>{question.question}</Text>
              {question.options.map((option, optionIndex) => (
                option === 'Open-ended response' ? (
                  <TextInput
                    key={optionIndex}
                    style={styles.textInput}
                    placeholder="Enter your response"
                    multiline
                    onChangeText={(text) => handleTextInput(index, text)}
                    value={answers[index + 9] || ''}
                  />
                ) : (
                  <TouchableOpacity
                    key={optionIndex}
                    style={[
                      styles.button,
                      answers[index] === option && styles.selectedButton,
                    ]}
                    onPress={() => handleButtonPress(index, option)}
                  >
                    <Text style={styles.buttonText}>{option}</Text>
                  </TouchableOpacity>
                )
              ))}
              {index === questions.length - 1 && (
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  verticalScrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  topContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
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
  },
  scrollContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
  },
  sectionContainer: {
    padding: 20,
    maxWidth: '100%',
  },  
  questionContainer: {
    padding: 20,
    maxWidth: '100%',
    justifyContent: 'center',
  },
  question: {
    fontSize: 16,
    marginBottom: 10,
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
    backgroundColor: '#eee',
  },
  buttonText: {
    fontSize: 16,
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
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: 'rgba(74, 8, 135, 1)',
    borderColor: 'rgba(74, 8, 135, 1)',
  },
  submitButtonText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Profile;
