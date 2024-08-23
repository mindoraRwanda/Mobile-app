import React from 'react';
import { StyleSheet, View, Text, Button, Image } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// You can replace this with an appropriate motivational image or icon
// const motivationalImage = require('../assets/motivational-image.png');

const MotivationalFeedback: React.FC = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { progress } = route.params as { progress: number };

    const getFeedbackMessage = (progress: number) => {
        if (progress === 100) return "Awesome job! You've completed everything!";
        if (progress >= 75) return "Great work! You're almost there!";
        if (progress >= 50) return "Good job! Keep going!";
        return "Keep up the effort!";
    };

    const handleExploreMore = () => {
        router.push('./');
    };

    return (
        <View style={styles.container}>
            {/* <Image source={motivationalImage} style={styles.image} /> */}
            <Text style={styles.feedbackText}>{getFeedbackMessage(progress)}</Text>
            <View style={styles.buttonContainer}>
                <Button title="Back to Progress Tracking" onPress={() => navigation.goBack()} color="#4A0887"/>
                {progress < 100 && (
                    <Button title="Explore More Resources" onPress={handleExploreMore} color="#4A0887" />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
    },
    feedbackText: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
        marginVertical: 16,
        fontWeight: 'bold',
    },
    buttonContainer: {
        marginTop: 16,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 16,
    },
});

export default MotivationalFeedback;
