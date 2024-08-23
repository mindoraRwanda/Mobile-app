import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const ProgressTracking: React.FC = () => {
    const [progress, setProgress] = useState<number>(0);
    const navigation = useNavigation();

    const milestones = [5, 10, 15];

    useEffect(() => {
        // Logic to update progress
        // Example: setProgress(getUserProgress());
    }, []);

    const checkMilestones = (currentProgress: number) => {
        milestones.forEach(milestone => {
            if (currentProgress >= milestone) {
                Alert.alert('Congratulations!', `You've reached a milestone of ${milestone} actions!`);
                // Add code to award a badge or reward
            }
        });
    };

    useEffect(() => {
        checkMilestones(progress);
    }, [progress]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Progress</Text>
            <View style={styles.progressBar}>
                <View style={[styles.progress, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{progress}% Completed</Text>
            <TouchableOpacity style={styles.button} onPress={() => setProgress(prev => prev + 10)}>
                <Ionicons name="add" size={24} color="#fff" />
                <Text style={styles.buttonText}>Increase Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={() => {
                router.push('./MotivationFeedback');
            }}>
                <Text style={styles.navButtonText}>Go to Motivational Feedback</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.navButton} onPress={() => {
                router.push('./GamifiedExercise');
            }}>
                <Text style={styles.navButtonText}>Start Gamified Exercise</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4A0887',
        marginBottom: 16,
    },
    progressBar: {
        width: '100%',
        height: 20,
        backgroundColor: '#ddd',
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 16,
    },
    progress: {
        height: '100%',
        backgroundColor: '#4A0887',
    },
    progressText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 16,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4A0887',
        padding: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        marginLeft: 8,
    },
    navButton: {
        marginTop: 16,
        backgroundColor: '#4A0887',
        padding: 12,
        borderRadius: 8,
    },
    navButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ProgressTracking;
