import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, TextInput, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import React, { useState, useRef } from 'react';
import { useRouter } from 'expo-router';

interface Question {
  question: string;
  options: string[];
}

const questions: Question[] = [
  // Add your questions and options here
];

const Profile: React.FC = () => {
  const router = useRouter();
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const scrollViewRef = useRef<ScrollView>(null);

  const handleButtonPress = (questionIndex: number, option: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: option,
    }));
  };

  const handleTextInput = (questionIndex: number, text: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: text,
    }));
  };

  const handleSubmit = () => {
    console.log('Submit answers:', answers);
    router.push('/home'); // Adjust the path as needed
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const isScrollAtEnd = contentOffset.x + layoutMeasurement.width >= contentSize.width;

    if (isScrollAtEnd) {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={require('../assets/ImgForScreen/AITalk.jpg')} style={styles.logo} />
        <Text style={styles.heading}>Help us match you to the right therapist</Text>
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
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
                  value={answers[index] || ''}
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
  );
};

const styles = StyleSheet.create({
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
  },
  questionContainer: {
    padding: 20,
    maxWidth: '100%',
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
