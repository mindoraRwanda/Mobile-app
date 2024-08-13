import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const RateApp: React.FC = () => {
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    const submitRating = () => {
        Alert.alert('Thank You!', 'Your feedback has been submitted.', [
            {
                text: 'OK',
                onPress: () => router.back(), 
            },
        ]);
        setRating(0); 
        setFeedback(''); 
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Rate Mindora</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>We Value Your Feedback</Text>
                <Text style={styles.subtitle}>How would you rate your experience with Mindora?</Text>
                <AirbnbRating
                    count={6}
                    reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Great', 'Wonderful']}
                    defaultRating={0}
                    size={30}
                    onFinishRating={setRating}
                    starContainerStyle={styles.ratingContainer}
                    reviewColor='purple'
                    selectedColor='purple'
                />
                <TextInput
                    style={styles.input}
                    placeholder="Tell us more about your experience..."
                    placeholderTextColor="#999"
                    multiline
                    numberOfLines={4}
                    value={feedback}
                    onChangeText={setFeedback}
                />
                <TouchableOpacity style={styles.submitButton} onPress={submitRating}>
                    <Text style={styles.submitButtonText}>Submit Rating</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        marginTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 18,
        backgroundColor: '#4A0887',
    },
    headerTitle: {
        fontSize: 19,
        fontWeight: '600',
        color: '#fff',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        textAlign: 'center',
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 32,
        paddingBottom: 32,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: '400',
        color: '#666',
        marginBottom: 24,
        textAlign: 'center',
    },
    ratingContainer: {
        marginBottom: 24,
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 8,
        fontSize: 16,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 24,
    },
    submitButton: {
        backgroundColor: '#4A0887',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignItems: 'center',
    },
    submitButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
    },
});

export default RateApp;
