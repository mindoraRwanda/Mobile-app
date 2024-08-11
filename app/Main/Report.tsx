import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { LineChart, PieChart, ProgressChart } from 'react-native-chart-kit';
import { ScrollView } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';

export default function Report() {
    const [symptom, setSymptom] = useState('');
    const [symptomsList, setSymptomsList] = useState<string[]>([]);
    const [mood, setMood] = useState('');
    const [moodLog, setMoodLog] = useState<string[]>([]);

    // Function to log a new symptom
    const handleAddSymptom = () => {
        if (symptom.trim()) {
            setSymptomsList([...symptomsList, symptom.trim()]);
            setSymptom('');
            Alert.alert("Symptom Added", "Your symptom has been logged.");
        } else {
            Alert.alert("Input Error", "Please enter a symptom.");
        }
    };

    // Function to log a new mood
    const handleAddMood = (selectedMood: string) => {
        setMood(selectedMood);
        setMoodLog([...moodLog, selectedMood]);
        Alert.alert("Mood Logged", `You logged your mood as: ${selectedMood}`);
    };

    // Sample data for charts
    const line = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43, 50],
                strokeWidth: 2,
            },
        ],
    };

    const pieData = [
        { name: 'hrs Job', population: 12, color: '#27ae60', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'hrs Sport', population: 2, color: '#2980b9', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'hrs Study', population: 5, color: '#f39c12', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'hrs Sleep', population: 8, color: '#8e44ad', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'hrs Other', population: 3, color: 'rgb(0, 0, 255)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
    ];

    const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: '#08130D',
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false,
    };

    const progressData = {
        labels: ['Sport', 'Reading', 'Run'],
        data: [0.4, 0.6, 0.8],
    };

    // Function to generate summary report
    const generateReport = () => {
        const moodFrequency = moodLog.reduce((acc: { [key: string]: number }, currentMood) => {
            acc[currentMood] = (acc[currentMood] || 0) + 1;
            return acc;
        }, {});

        const mostFrequentMood = Object.keys(moodFrequency).reduce((a, b) => moodFrequency[a] > moodFrequency[b] ? a : b, '');

        const reportSummary = `
        Total Moods Logged: ${moodLog.length}
        Most Frequent Mood: ${mostFrequentMood}
        Total Symptoms Logged: ${symptomsList.length}
        `;

        Alert.alert("Progress Report", reportSummary);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.push(`../Main`)}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={styles.headerTitle}>
                        Report
                    </Text>
                    <TouchableOpacity onPress={() => {}}>
                        <FeatherIcon color="#fff" name="more-vertical" size={24} />
                    </TouchableOpacity>
                </View>

                <View style={styles.body}>
                    <Text style={styles.textHeader}>Your Daily Progress</Text>
                    <ProgressChart
                        data={progressData}
                        width={Dimensions.get('window').width - 30}
                        height={220}
                        strokeWidth={16}
                        radius={32}
                        chartConfig={chartConfig}
                        hideLegend={false}
                    />

                    <Text style={styles.textHeader}>Daily Activity</Text>
                    <PieChart
                        data={pieData}
                        width={Dimensions.get('window').width}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        absolute
                    />

                    <Text style={styles.textHeader}>Your Weekly Progress</Text>
                    <LineChart
                        data={line}
                        width={Dimensions.get('window').width - 30}
                        height={220}
                        chartConfig={chartConfig}
                        bezier
                        style={{ marginVertical: 8, borderRadius: 16 }}
                    />

                    {/* Mood Tracking Section */}
                    <Text style={styles.textHeader}>Log Your Daily Mood</Text>
                    <View style={styles.moodButtonsContainer}>
                        {['Happy', 'Sad', 'Anxious', 'Angry', 'Neutral'].map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.moodButton, mood === item && styles.selectedMoodButton]}
                                onPress={() => handleAddMood(item)}
                            >
                                <Text style={styles.moodButtonText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.textHeader}>Logged Moods</Text>
                    {moodLog.length > 0 ? (
                        moodLog.map((loggedMood, index) => (
                            <Text key={index} style={styles.moodItem}>
                                {index + 1}. {loggedMood}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.noMoodText}>No moods logged yet.</Text>
                    )}

                    {/* Symptom Logging Section */}
                    <Text style={styles.textHeader}>Log Your Symptoms</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter a symptom..."
                        value={symptom}
                        onChangeText={setSymptom}
                    />
                    <Button title="Add Symptom" onPress={handleAddSymptom} color="#4b0889" />

                    <Text style={styles.textHeader}>Logged Symptoms</Text>
                    {symptomsList.length > 0 ? (
                        symptomsList.map((sym, index) => (
                            <Text key={index} style={styles.symptomItem}>
                                {index + 1}. {sym}
                            </Text>
                        ))
                    ) : (
                        <Text style={styles.noSymptomText}>No symptoms logged yet.</Text>
                    )}

                    {/* Progress Report Section */}
                    <Text style={styles.textHeader}>Progress Report</Text>
                    <Button title="Generate Report" onPress={generateReport} color="#4b0889" />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    header: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: '#4b0889',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 4,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        flex: 1,
    },
    body: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        margin: 10,
        borderRadius: 10,
    },
    textHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4b0889',
        textAlign: 'center',
        marginVertical: 10,
    },
    moodButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    moodButton: {
        backgroundColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    selectedMoodButton: {
        backgroundColor: '#4b0889',
    },
    moodButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    moodItem: {
        fontSize: 16,
        color: '#333',
        marginVertical: 5,
    },
    noMoodText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginVertical: 10,
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        fontSize: 16,
    },
    symptomItem: {
        fontSize: 16,
        color: '#333',
        marginVertical: 5,
    },
    noSymptomText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginVertical: 10,
    },
});

