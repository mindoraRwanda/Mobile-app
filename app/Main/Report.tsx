import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Modal,
  ScrollView
} from 'react-native';
import { LineChart, PieChart, ProgressChart } from 'react-native-chart-kit';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Report() {
  const [symptom, setSymptom] = useState('');
  const [symptomsList, setSymptomsList] = useState<string[]>([]);
  const [mood, setMood] = useState('');
  const [moodLog, setMoodLog] = useState<string[]>([]);
  const [medicalHistoryVisible, setMedicalHistoryVisible] = useState(false);

  const handleAddSymptom = () => {
    if (symptom.trim()) {
      setSymptomsList([...symptomsList, symptom.trim()]);
      setSymptom('');
      Alert.alert("Symptom Added", "Your symptom has been logged.");
    } else {
      Alert.alert("Input Error", "Please enter a symptom.");
    }
  };

  const handleAddMood = (selectedMood: string) => {
    setMood(selectedMood);
    setMoodLog([...moodLog, selectedMood]);
    Alert.alert("Mood Logged", `You logged your mood as: ${selectedMood}`);
  };

  const generateReport = () => {
    const moodFrequency = moodLog.reduce(
      (acc: { [key: string]: number }, currentMood) => {
        acc[currentMood] = (acc[currentMood] || 0) + 1;
        return acc;
      },
      {}
    );

    const mostFrequentMood = Object.keys(moodFrequency).reduce((a, b) =>
      moodFrequency[a] > moodFrequency[b] ? a : b,
    );

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
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push(`../Main`)}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Report</Text>
          <TouchableOpacity
            onPress={() => {
              setMedicalHistoryVisible(true);
            }}
          >
            <MaterialCommunityIcons color="#fff" name="medical-bag" size={24} />
          </TouchableOpacity>
        </View>

        {/* Body */}
        <View style={styles.body}>
          {/* Progress Charts */}
          <Text style={styles.sectionTitle}>Your Daily Progress</Text>
          <ProgressChart
            data={progressData}
            width={Dimensions.get('window').width - 30}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={chartConfig}
            hideLegend={false}
          />

          <Text style={styles.sectionTitle}>Daily Activity</Text>
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

          <Text style={styles.sectionTitle}>Your Weekly Progress</Text>
          <LineChart
            data={lineData}
            width={Dimensions.get('window').width - 30}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={styles.chartStyle}
          />

          {/* Mood Logging */}
          <Text style={styles.sectionTitle}>Log Your Daily Mood</Text>
          <View style={styles.moodButtonsContainer}>
            {['Happy', 'Sad', 'Anxious', 'Angry', 'Neutral'].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.moodButton,
                  mood === item && styles.selectedMoodButton,
                ]}
                onPress={() => handleAddMood(item)}
              >
                <Text style={styles.moodButtonText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Logged Moods */}
          <Text style={styles.sectionTitle}>Logged Moods</Text>
          {moodLog.length > 0 ? (
            moodLog.map((loggedMood, index) => (
              <Text key={index} style={styles.loggedItem}>
                {index + 1}. {loggedMood}
              </Text>
            ))
          ) : (
            <Text style={styles.noItemText}>No moods logged yet.</Text>
          )}

          {/* Symptom Logging */}
          <Text style={styles.sectionTitle}>Log Your Symptoms</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter a symptom..."
            value={symptom}
            onChangeText={setSymptom}
          />
          <Button title="Add Symptom" onPress={handleAddSymptom} color="#4b0889" />

          {/* Logged Symptoms */}
          <Text style={styles.sectionTitle}>Logged Symptoms</Text>
          {symptomsList.length > 0 ? (
            symptomsList.map((symptom, index) => (
              <Text key={index} style={styles.loggedItem}>
                {index + 1}. {symptom}
              </Text>
            ))
          ) : (
            <Text style={styles.noItemText}>No symptoms logged yet.</Text>
          )}

          {/* Generate Report */}
          <Text style={styles.sectionTitle}>Progress Report</Text>
          <Button title="Generate Report" onPress={generateReport} color="#4b0889" />
        </View>
      </ScrollView>

      {/* Medical History Modal */}
      <Modal
        visible={medicalHistoryVisible}
        animationType="slide"
        onRequestClose={() => setMedicalHistoryVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Medical History</Text>
          <ScrollView style={styles.modalBody}>
            <Text style={styles.historySectionTitle}>Mental Health Diagnoses</Text>
            <Text style={styles.historyItem}>
              - Generalized Anxiety Disorder (January 15, 2023)
            </Text>
            <Text style={styles.historyItem}>
              - Major Depressive Disorder (April 10, 2022)
            </Text>

            <Text style={styles.historySectionTitle}>Therapy Sessions</Text>
            <Text style={styles.historyItem}>
              - March 20, 2023: Session with Dr. Jane Smith - Coping mechanisms for anxiety
            </Text>
            <Text style={styles.historyItem}>
              - February 15, 2023: Session with Dr. John Doe - Progress with medication
            </Text>

            <Text style={styles.historySectionTitle}>Medications</Text>
            <Text style={styles.historyItem}>
              - Sertraline 50mg/day (Started: April 12, 2022)
            </Text>
            <Text style={styles.historyItem}>
              - Alprazolam 0.5mg as needed (Started: January 18, 2023)
            </Text>

            <Text style={styles.historySectionTitle}>Personal Notes</Text>
            <Text style={styles.historyItem}>
              - May 1, 2023: Feeling more in control of anxiety, but still struggling with sleep.
            </Text>
            <Text style={styles.historyItem}>
              - April 25, 2023: Rough week, felt very down and isolated.
            </Text>
          </ScrollView>
          <Button title="Close" onPress={() => setMedicalHistoryVisible(false)} color="#4b0889" />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#4b0889',
      marginTop: 50,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingTop: 15,
      paddingBottom: 10,
      backgroundColor: '#4b0889',
    },
    headerTitle: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    body: {
      paddingHorizontal: 15,
      paddingVertical: 20,
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginVertical: 10,
      color: '#333',
    },
    moodButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },
    moodButton: {
      backgroundColor: '#ddd',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
    },
    selectedMoodButton: {
      backgroundColor: '#4b0889',
    },
    moodButtonText: {
      color: '#333',
      fontWeight: 'bold',
    },
    loggedItem: {
      color: '#555',
      marginBottom: 5,
    },
    noItemText: {
      color: '#aaa',
      fontStyle: 'italic',
    },
    input: {
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
    },
    modalContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f4f4f4',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#4b0889',
    },
    modalBody: {
      flex: 1,
      paddingHorizontal: 10,
    },
    historySectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#4b0889',
    },
    historyItem: {
      fontSize: 14,
      color: '#555',
      marginBottom: 15,
      padding: 10,
      borderRadius: 10,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
    },
    chartStyle: {
      borderRadius: 16,
    },
  });
  

const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(75, 8, 137, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(75, 8, 137, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const progressData = {
  labels: ['Mood Tracking', 'Symptom Log', 'Therapy Sessions'], // optional
  data: [0.8, 0.6, 0.9],
};

const pieData = [
  {
    name: 'Happy',
    population: 40,
    color: '#4b0889',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Sad',
    population: 30,
    color: '#ffd700',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Anxious',
    population: 15,
    color: '#ff6347',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Angry',
    population: 10,
    color: '#20b2aa',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Neutral',
    population: 5,
    color: '#9370db',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

const lineData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43, 50],
      strokeWidth: 2, // optional
    },
  ],
};
