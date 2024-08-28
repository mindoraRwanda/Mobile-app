import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

interface MoodEntry {
    id: string;
    mood: string;
    notes: string;
    date: string;
}

interface Props {
    navigation: NavigationProp<any>;
}

const MoodTracking: React.FC<Props> = ({ navigation }) => {
    const [mood, setMood] = useState<string>('');
    const [notes, setNotes] = useState<string>('');
    const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);

    const handleSaveMood = () => {
        if (mood) {
            const newEntry: MoodEntry = {
                id: Math.random().toString(), // Unique ID
                mood,
                notes,
                date: new Date().toLocaleDateString(),
            };
            setMoodEntries([newEntry, ...moodEntries]);
            setMood('');
            setNotes('');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Track Your Mood</Text>
            <View style={styles.moodSelection}>
                <TouchableOpacity
                    style={[styles.moodButton, mood === 'Happy' && styles.selectedMood]}
                    onPress={() => setMood('Happy')}
                >
                    <FontAwesome name="smile-o" size={50} color={mood === 'Happy' ? '#FFD700' : '#888'} />
                    <Text style={styles.moodText}>Happy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.moodButton, mood === 'Sad' && styles.selectedMood]}
                    onPress={() => setMood('Sad')}
                >
                    <FontAwesome name="frown-o" size={50} color={mood === 'Sad' ? '#FFD700' : '#888'} />
                    <Text style={styles.moodText}>Sad</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.moodButton, mood === 'Neutral' && styles.selectedMood]}
                    onPress={() => setMood('Neutral')}
                >
                    <FontAwesome name="meh-o" size={50} color={mood === 'Neutral' ? '#FFD700' : '#888'} />
                    <Text style={styles.moodText}>Neutral</Text>
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Add notes..."
                value={notes}
                onChangeText={setNotes}
                multiline
            />
            <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveMood}
            >
                <Text style={styles.saveButtonText}>Save Mood</Text>
            </TouchableOpacity>
            <Text style={styles.subtitle}>Mood History</Text>
            <FlatList
                data={moodEntries}
                renderItem={({ item }) => (
                    <View style={styles.entry}>
                        <Text style={styles.entryDate}>{item.date}</Text>
                        <Text style={styles.entryMood}>Mood: {item.mood}</Text>
                        <Text style={styles.entryNotes}>Notes: {item.notes}</Text>
                    </View>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9',
        marginTop: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#4A0887',
    },
    moodSelection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    moodButton: {
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 3, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    selectedMood: {
        borderColor: '#4A0887',
        borderWidth: 4,
    },
    moodText: {
        fontSize: 16,
        color: '#333',
        marginTop: 5,
    },
    input: {
        height: 100,
        borderColor: '#bbb',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        textAlignVertical: 'top',
    },
    saveButton: {
        backgroundColor: '#4A0887',
        paddingVertical: 10,
        borderRadius: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4A0887',
    },
    entry: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    entryDate: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    entryMood: {
        fontSize: 16,
        marginVertical: 5,
        color: '#666',
    },
    entryNotes: {
        fontSize: 14,
        color: '#888',
    },
});

export default MoodTracking;
