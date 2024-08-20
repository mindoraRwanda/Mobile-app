import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';

const EducationalResources: React.FC = () => {
    const articles = [
        { id: '1', title: 'Understanding Anxiety', type: 'Article', icon: 'book' },
        { id: '2', title: 'Coping with Depression', type: 'Video', icon: 'videocam' },
        { id: '3', title: 'The Science Behind Mindfulness', type: 'Article', icon: 'book' },
        { id: '4', title: 'Meditation Techniques for Beginners', type: 'Video', icon: 'videocam' },
        { id: '5', title: 'Exploring Cognitive Behavioral Therapy', type: 'Article', icon: 'book' },
        { id: '6', title: 'Managing Panic Attacks', type: 'Video', icon: 'videocam' },
    ];

    const courses = [
        { id: '1', title: 'Mindfulness 101', icon: 'school' },
        { id: '2', title: 'Cognitive Behavioral Therapy', icon: 'clipboard' },
        { id: '3', title: 'Stress Management Strategies', icon: 'happy' },
        { id: '4', title: 'Building Resilience', icon: 'heart' },
        { id: '5', title: 'Overcoming Negative Thoughts', icon: 'telescope' },
        { id: '6', title: 'Emotional Regulation Techniques', icon: 'body' },
    ];

    const recommendedContent = [
        { id: '1', title: 'Dealing with Stress', type: 'Article', icon: 'book' },
        { id: '2', title: 'Overcoming Social Anxiety', type: 'Course', icon: 'school' },
        { id: '3', title: 'Understanding Sleep Patterns', type: 'Article', icon: 'book' },
        { id: '4', title: 'Managing Anger Effectively', type: 'Video', icon: 'videocam' },
        { id: '5', title: 'The Role of Nutrition in Mental Health', type: 'Article', icon: 'nutrition' },
        { id: '6', title: 'Positive Psychology Practices', type: 'Course', icon: 'happy' },
    ];

    const renderItem = ({ item }: { item: { title: string, type: string, icon: string } }) => (
        <TouchableOpacity style={styles.card}>
            <Ionicons name={item.icon} size={32} color="#4A0887" />
            <Text style={styles.itemText}>{item.title}</Text>
            <Text style={styles.itemType}>{item.type}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push(`./Service`)} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#4A0887" />
                </TouchableOpacity>
                <Text style={styles.title}>Educational Resources</Text>
            </View>

            <Text style={styles.sectionTitle}>Articles and Videos</Text>
            <View style={styles.gridContainer}>
                {articles.map(item => renderItem({ item }))}
            </View>

            <Text style={styles.sectionTitle}>Courses</Text>
            <View style={styles.gridContainer}>
                {courses.map(item => (
                    <TouchableOpacity style={styles.card} key={item.id}>
                        <Ionicons name={item.icon} size={32} color="#4A0887" />
                        <Text style={styles.itemText}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <View style={styles.gridContainer}>
                {recommendedContent.map(item => renderItem({ item }))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
        marginTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        justifyContent: 'space-between',
    },
    backButton: {
        padding: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4A0887',
        flex: 1,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 12,
        color: '#4A0887',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start', // Align items to the start
    },
    card: {
        backgroundColor: '#fff',
        width: '30%',  // Adjust width to fit more cards in a row
        height: 160,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        marginRight: '3%',  // Add margin to the right for spacing between columns
        borderRadius: 8, // Rounded corners for a more polished look
        elevation: 3, // For Android
        shadowColor: '#000', // For iOS
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.8, 
        shadowRadius: 3, 
    },
    itemText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    itemType: {
        fontSize: 12,
        textAlign: 'center',
        color: '#4A0887',
        fontWeight: 'bold',
    },
});

export default EducationalResources;
