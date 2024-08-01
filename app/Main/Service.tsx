import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, SafeAreaView, Platform, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const depressionQuestions = [
  {
    question: 'Which of the following is a common symptom of depression?',
    options: ['Increased energy levels', 'Persistent sadness', 'Improved concentration', 'Increased social interactions'],
    correctAnswer: 'Persistent sadness',
  },
  // other questions...
];

const anxietyQuestions = [
  {
    question: 'What is a common goal of meditation?',
    options: ['Increasing stress', 'Mindfulness', 'Physical exercise', 'Social interaction'],
    correctAnswer: 'Mindfulness',
  },
  // other questions...
];

const suicideBehaviorQuestions = [
  {
    question: 'Have you ever thought about or attempted to kill yourself?',
    options: ['Never', 'It was just a brief passing thought', 'I have had a plan at least once', 'I have attempted to kill myself'],
    correctAnswer: 'Never',
  },
  // other questions...
];

const alcoholUseDisorderQuestions = [
  {
    question: 'How often do you have a drink containing alcohol?',
    options: ['Never', 'Monthly or less', '2-4 times a month', '2-3 times a week', '4 or more times a week'],
    correctAnswer: 'Never',
  },
  {
    question: 'How many drinks containing alcohol do you have on a typical day when you are drinking?',
    options: ['1 or 2', '3 or 4', '5 or 6', '7 to 9', '10 or more'],
    correctAnswer: '1 or 2',
  },
  {
    question: 'How often do you have six or more drinks on one occasion?',
    options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or almost daily'],
    correctAnswer: 'Never',
  },
  {
    question: 'How often during the last year have you found that you were not able to stop drinking once you had started?',
    options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or almost daily'],
    correctAnswer: 'Never',
  },
  {
    question: 'How often during the last year have you failed to do what was normally expected from you because of drinking?',
    options: ['Never', 'Less than monthly', 'Monthly', 'Weekly', 'Daily or almost daily'],
    correctAnswer: 'Never',
  },
];

export default function Service() {
  const [depressionModalVisible, setDepressionModalVisible] = useState(false);
  const [anxietyModalVisible, setAnxietyModalVisible] = useState(false);
  const [suicideBehaviorModalVisible, setSuicideBehaviorModalVisible] = useState(false);
  const [alcoholUseDisorderModalVisible, setAlcoholUseDisorderModalVisible] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);

  const handleDepressionButtonPress = () => {
    setDepressionModalVisible(true);
  };

  const handleAnxietyButtonPress = () => {
    setAnxietyModalVisible(true);
  };

  const handleSuicideBehaviorButtonPress = () => {
    setSuicideBehaviorModalVisible(true);
  };

  const handleAlcoholUseDisorderButtonPress = () => {
    setAlcoholUseDisorderModalVisible(true);
  };

  const handleCloseModal = (modalType) => {
    if (modalType === 'depression') {
      setDepressionModalVisible(false);
    } else if (modalType === 'anxiety') {
      setAnxietyModalVisible(false);
    } else if (modalType === 'suicideBehavior') {
      setSuicideBehaviorModalVisible(false);
    } else if (modalType === 'alcoholUseDisorder') {
      setAlcoholUseDisorderModalVisible(false);
    }
    setSelectedAnswers({});
    setScore(0);
  };

  const handleAnswerPress = (questionIndex, answer, questions) => {
    const newSelectedAnswers = { ...selectedAnswers, [questionIndex]: answer };
    setSelectedAnswers(newSelectedAnswers);

    const correctAnswersCount = questions.reduce((count, question, index) => {
      if (newSelectedAnswers[index] === question.correctAnswer) {
        return count + 1;
      }
      return count;
    }, 0);

    setScore(correctAnswersCount);
  };

  const renderModal = (modalVisible, setModalVisible, questions, title) => (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => handleCloseModal(title.toLowerCase().replace(/ /g, ''))}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => handleCloseModal(title.toLowerCase().replace(/ /g, ''))}>
                <Icon name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{title}</Text>
            </View>
            {questions.map((question, questionIndex) => (
              <View key={questionIndex} style={styles.questionContainer}>
                <Text style={styles.modalText}>{question.question}</Text>
                {question.options.map((option, optionIndex) => (
                  <TouchableOpacity
                    key={optionIndex}
                    style={[
                      styles.answerButton,
                      selectedAnswers[questionIndex] === option && styles.selectedAnswer
                    ]}
                    onPress={() => handleAnswerPress(questionIndex, option, questions)}
                  >
                    <Text style={styles.answerText}>{option}</Text>
                    {selectedAnswers[questionIndex] === option && option === question.correctAnswer && (
                      <Icon name="checkmark" size={20} color="green" style={styles.answerIcon} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            ))}
            <Text style={styles.scoreText}>Your score: {score} / {questions.length}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Mental Health Support</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDepressionButtonPress}>
          <Icon name="clipboard-outline" size={24} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Depression</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.anxietyButton]} onPress={handleAnxietyButtonPress}>
          <Icon name="leaf-outline" size={24} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Anxiety</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.suicideBehaviorButton]} onPress={handleSuicideBehaviorButtonPress}>
          <Icon name="help-buoy-outline" size={24} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Suicide Behavior Questionnaire</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.alcoholUseDisorderButton]} onPress={handleAlcoholUseDisorderButtonPress}>
          <Icon name="wine-outline" size={24} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Alcohol Use Disorder Identification Test</Text>
        </TouchableOpacity>
      </View>

      {renderModal(depressionModalVisible, setDepressionModalVisible, depressionQuestions, "Beck Depression Inventory")}
      {renderModal(anxietyModalVisible, setAnxietyModalVisible, anxietyQuestions, "Anxiety Inventory")}
      {renderModal(suicideBehaviorModalVisible, setSuicideBehaviorModalVisible, suicideBehaviorQuestions, "Suicide Behavior Questionnaire")}
      {renderModal(alcoholUseDisorderModalVisible, setAlcoholUseDisorderModalVisible, alcoholUseDisorderQuestions, "Alcohol Use Disorder Identification Test")}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#6200EE',
    marginLeft: 5,
    marginRight: 5,
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: 'purple',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 5,
  },
  anxietyButton: {
    backgroundColor: 'purple',
  },
  suicideBehaviorButton: {
    backgroundColor: 'purple',
  },
  alcoholUseDisorderButton: {
    backgroundColor: 'purple',
  },
  buttonIcon: {
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  scrollContainer: {
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  questionContainer: {
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  answerButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedAnswer: {
    backgroundColor: '#c0c0c0',
  },
  answerText: {
    fontSize: 16,
  },
  answerIcon: {
    marginLeft: 10,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});
