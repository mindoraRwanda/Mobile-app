import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Define questions and options
const questions = [
    {
        question: "How are you feeling right now?",
        type: 'multiple-choice',
        options: ['Happy', 'Sad', 'Anxious', 'Relaxed']
    },
    {
        question: "How would you describe your current level of stress?",
        type: 'multiple-choice',
        options: ['Low', 'Moderate', 'High', 'Very High']
    },
    {
        question: "Which type of support do you find most helpful?",
        type: 'multiple-choice',
        options: ['Professional Therapy', 'Support from Friends/Family', 'Online Communities', 'Self-Help Resources']
    },
    {
        question: "How often do you practice mindfulness or relaxation techniques?",
        type: 'multiple-choice',
        options: ['Daily', 'Several times a week', 'Once a week', 'Rarely']
    },
    {
        question: "What type of exercise do you prefer for managing stress?",
        type: 'multiple-choice',
        options: ['Physical Exercise', 'Meditation', 'Breathing Exercises', 'Creative Activities']
    },
    {
        question: "What motivates you the most to keep up with mental health exercises?",
        type: 'multiple-choice',
        options: ['Personal Growth', 'Support from Others', 'Rewards and Incentives', 'Seeing Progress']
    },
    {
        question: "What time of day do you feel most motivated to engage in mental health activities?",
        type: 'multiple-choice',
        options: ['Morning', 'Afternoon', 'Evening', 'Night']
    },
    {
        question: "How do you prefer to receive mental health tips and resources?",
        type: 'multiple-choice',
        options: ['Email', 'In-App Notifications', 'SMS', 'Social Media']
    },
    {
        question: "What kind of content would you like to see more of in the app?",
        type: 'multiple-choice',
        options: ['Guided Meditations', 'Success Stories', 'Interactive Exercises', 'Expert Interviews']
    },
    {
        question: "Which feature would enhance your experience with the app the most?",
        type: 'multiple-choice',
        options: ['Personalized Feedback', 'More Gamified Exercises', 'Community Interaction', 'Customizable Reminders']
    },
    {
        question: "How do you usually handle setbacks in your mental health journey?",
        type: 'multiple-choice',
        options: ['Seek Professional Help', 'Talk to Loved Ones', 'Engage in Self-Care', 'Ignore and Move On']
    },
    {
        question: "What specific goal are you hoping to achieve with this exercise?",
        type: 'text',
    },
    {
        question: "How often do you plan to complete mood-boosting exercises?",
        type: 'text',
    },
    {
        question: "Did you enjoy the mood-boosting exercise today?",
        type: 'text',
    },
    {
        question: "How would you rate the difficulty of this exercise?",
        type: 'text',
    },
    {
        question: "What kind of rewards would motivate you the most?",
        type: 'text',
    },
    {
        question: "What additional features would you like to see in the gamified exercises?",
        type: 'text',
    },
    {
        question: "How do you feel this exercise has impacted your mood?",
        type: 'text',
    },
    {
        question: "Which type of exercise do you prefer?",
        type: 'text',
    },
    {
        question: "How do you feel about the design and layout of the exercise?",
        type: 'text',
    },
];

const moodIcons = {
    Happy: 'happy-outline',
    Sad: 'sad-outline',
    Anxious: 'alert-circle-outline',
    Relaxed: 'leaf-outline',
    Low: 'thumbs-down-outline',
    Moderate: 'trending-neutral-outline',
    High: 'trending-up-outline',
    'Very High': 'flame-outline',
    'Professional Therapy': 'medkit-outline',
    'Support from Friends/Family': 'people-outline',
    'Online Communities': 'globe-outline',
    'Self-Help Resources': 'book-outline',
    Daily: 'calendar-outline',
    'Several times a week': 'repeat-outline',
    'Once a week': 'time-outline',
    Rarely: 'time-off-outline',
    'Physical Exercise': 'barbell-outline',
    Meditation: 'body-outline',
    'Breathing Exercises': 'leaf-outline',
    'Creative Activities': 'brush-outline',
    'Personal Growth': 'trophy-outline',
    'Support from Others': 'heart-outline',
    'Rewards and Incentives': 'gift-outline',
    'Seeing Progress': 'trending-up-outline',
    Morning: 'sunny-outline',
    Afternoon: 'partly-sunny-outline',
    Evening: 'moon-outline',
    Night: 'moon-outline',
    Email: 'mail-outline',
    'In-App Notifications': 'notifications-outline',
    SMS: 'chatbubbles-outline',
    'Social Media': 'share-social-outline',
    'Guided Meditations': 'meditation-outline',
    'Success Stories': 'ribbon-outline',
    'Interactive Exercises': 'play-outline',
    'Expert Interviews': 'microphone-outline',
    'Personalized Feedback': 'thumbs-up-outline',
    'More Gamified Exercises': 'game-controller-outline',
    'Community Interaction': 'people-outline',
    'Customizable Reminders': 'alarm-outline',
    'Seek Professional Help': 'help-circle-outline',
    'Talk to Loved Ones': 'heart-circle-outline',
    'Engage in Self-Care': 'happy-outline',
    'Ignore and Move On': 'remove-circle-outline',
};

const GamifiedExercise: React.FC = () => {
    const [completed, setCompleted] = useState<boolean>(false);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    const navigation = useNavigation();

    const handleComplete = () => {
        setCompleted(true);
        // Add logic to update progress and award badges
    };

    const handleSubmit = () => {
        // Handle form submission, e.g., send data to backend or update state
        console.log(answers);
        navigation.goBack();  // Navigate back after submission
    };

    const handleAnswerChange = (text: string) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questions[currentQuestionIndex].question]: text
        }));
    };

    const handleOptionSelect = (option: string) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questions[currentQuestionIndex].question]: option
        }));
        goToNextQuestion();
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Mood-Boosting Exercise</Text>
            <Text style={styles.description}>
                Complete this exercise to boost your mood and earn rewards!
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleComplete} disabled={completed}>
                <Ionicons name="checkmark" size={24} color="#fff" />
                <Text style={styles.buttonText}>{completed ? "Completed" : "Complete Exercise"}</Text>
            </TouchableOpacity>
            {completed && <Text style={styles.successMessage}>Congratulations! You've earned a reward!</Text>}

            {!completed && (
                <View style={styles.formContainer}>
                    <Text style={styles.question}>{currentQuestion.question}</Text>
                    {currentQuestion.type === 'multiple-choice' ? (
                        <View style={styles.optionsContainer}>
                            {currentQuestion.options?.map(option => (
                                <TouchableOpacity
                                    key={option}
                                    style={styles.optionButton}
                                    onPress={() => handleOptionSelect(option)}
                                >
                                    <Ionicons name={moodIcons[option] || 'help-outline'} size={24} color="#4A0887" />
                                    <Text style={styles.optionText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : (
                        <TextInput
                            style={styles.input}
                            value={answers[currentQuestion.question] || ''}
                            onChangeText={handleAnswerChange}
                            placeholder="Your answer"
                        />
                    )}

                    <View style={styles.navigationButtons}>
                        <TouchableOpacity
                            style={[styles.navButton, styles.prevButton]}
                            onPress={goToPreviousQuestion}
                            disabled={currentQuestionIndex === 0}
                        >
                            <Text style={styles.navButtonText}>Previous</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.navButton, styles.nextButton]}
                            onPress={goToNextQuestion}
                            disabled={currentQuestionIndex === questions.length - 1}
                        >
                            <Text style={styles.navButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>

                    {currentQuestionIndex === questions.length - 1 && (
                        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                            <Text style={styles.submitButtonText}>Submit</Text>
                        </TouchableOpacity>
                    )}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        flexGrow: 1, 
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4A0887',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#4A0887',
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4A0887',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 8,
    },
    successMessage: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4A0887',
        textAlign: 'center',
        marginBottom: 20,
    },
    formContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 2,
        flexGrow: 1, // Ensures that the form container takes up the remaining space
        justifyContent: 'center', // Centers the question vertically
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center', // Centers the question horizontally
        marginBottom: 12,
    },
    optionsContainer: {
        marginBottom: 20,
    },
    optionButton: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    optionText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff',
        marginBottom: 20,
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    navButton: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    prevButton: {
        backgroundColor: '#e0e0e0',
        marginRight: 10,
    },
    nextButton: {
        backgroundColor: '#4A0887',
    },
    navButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: '#4A0887',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default GamifiedExercise;