import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ScrollView } from 'react-native';

const EducationalResources: React.FC = () => {
    const articles = [
        { id: '1', title: 'Understanding Anxiety', type: 'Article' },
        { id: '2', title: 'Coping with Depression', type: 'Video' },
        { id: '3', title: 'The Science Behind Mindfulness', type: 'Article' },
        { id: '4', title: 'Meditation Techniques for Beginners', type: 'Video' },
    ];

    const courses = [
        { id: '1', title: 'Mindfulness 101' },
        { id: '2', title: 'Cognitive Behavioral Therapy' },
        { id: '3', title: 'Stress Management Strategies' },
        { id: '4', title: 'Building Resilience' },
    ];

    const recommendedContent = [
        { id: '1', title: 'Dealing with Stress', type: 'Article' },
        { id: '2', title: 'Overcoming Social Anxiety', type: 'Course' },
        { id: '3', title: 'Understanding Sleep Patterns', type: 'Article' },
        { id: '4', title: 'Managing Anger Effectively', type: 'Video' },
    ];

    const renderItem = ({ item }: { item: { title: string, type: string } }) => (
        <TouchableOpacity style={styles.item}>
            <Text style={styles.itemText}>{item.title}</Text>
            <Text style={styles.itemType}>{item.type}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Educational Resources</Text>

            <Text style={styles.sectionTitle}>Articles and Videos</Text>
            <FlatList
                data={articles}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />

            <Text style={styles.sectionTitle}>Courses</Text>
            <FlatList
                data={courses}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item}>
                        <Text style={styles.itemText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id}
            />

            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <FlatList
                data={recommendedContent}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#4A0887',
        textAlign: 'center',        
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 12,
        color: '#4A0887',
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemText: {
        fontSize: 16,
        color: '#333',
    },
    itemType: {
        fontSize: 14,
        color: '#999',
    },
});

export default EducationalResources;
