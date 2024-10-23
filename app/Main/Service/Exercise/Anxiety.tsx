import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const anxietyTools = [
  {
    id: '1',
    title: '5-4-3-2-1 Grounding',
    icon: 'center-focus-strong',
    color: '#4CAF50',
    description: 'Use your senses to ground yourself',
    steps: [
      { sense: 'See', count: 5, description: 'Name 5 things you can see around you' },
      { sense: 'Touch', count: 4, description: 'Name 4 things you can touch or feel' },
      { sense: 'Hear', count: 3, description: 'Name 3 things you can hear right now' },
      { sense: 'Smell', count: 2, description: 'Name 2 things you can smell' },
      { sense: 'Taste', count: 1, description: 'Name 1 thing you can taste' },
    ],
  },
  {
    id: '2',
    title: 'Thought Record',
    icon: 'edit-note',
    color: '#2196F3',
    description: 'Challenge anxious thoughts',
    prompts: [
      'What\'s making you anxious?',
      'What are you thinking?',
      'What evidence supports this thought?',
      'What evidence doesn\'t support it?',
      'What\'s a more balanced thought?',
    ],
  },
  {
    id: '3',
    title: 'Quick Calm',
    icon: 'spa',
    color: '#9C27B0',
    description: 'Rapid anxiety relief techniques',
    techniques: [
      { title: 'Deep Breath', duration: 5, icon: 'air' },
      { title: 'Shoulder Roll', duration: 5, icon: 'fitness-center' },
      { title: 'Hand Clench', duration: 5, icon: 'front-hand' },
      { title: 'Mindful Moment', duration: 5, icon: 'self-improvement' },
    ],
  },
  {
    id: '4',
    title: 'Anxiety Scale',
    icon: 'show-chart',
    color: '#FF9800',
    description: 'Track your anxiety level',
    levels: [
      { level: 1, description: 'Calm and relaxed' },
      { level: 2, description: 'Slightly uneasy' },
      { level: 3, description: 'Mild anxiety' },
      { level: 4, description: 'Moderate anxiety' },
      { level: 5, description: 'High anxiety' },
    ],
  },
];

export default function AnxietyPage() {
  const router = useRouter();
  const [selectedTool, setSelectedTool] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [anxietyLevel, setAnxietyLevel] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [isExerciseComplete, setIsExerciseComplete] = useState(false);

  const fadeTransition = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const startTool = (tool) => {
    setSelectedTool(tool);
    setCurrentStep(0);
    setResponses({});
    setIsExerciseComplete(false);
  };

  const handleNext = () => {
    fadeTransition();
    if (selectedTool.steps && currentStep < selectedTool.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (selectedTool.prompts && currentStep < selectedTool.prompts.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsExerciseComplete(true);
    }
  };

  const renderGroundingExercise = () => (
    <View style={styles.exerciseContainer}>
      <Text style={styles.stepCounter}>
        Step {currentStep + 1} of {selectedTool.steps.length}
      </Text>
      <View style={styles.senseContainer}>
        <Text style={[styles.senseTitle, { color: selectedTool.color }]}>
          {selectedTool.steps[currentStep].sense}
        </Text>
        <Text style={styles.senseCount}>
          Find {selectedTool.steps[currentStep].count} things
        </Text>
        <Text style={styles.senseDescription}>
          {selectedTool.steps[currentStep].description}
        </Text>
      </View>
    </View>
  );

  const renderThoughtRecord = () => (
    <View style={styles.exerciseContainer}>
      <Text style={styles.stepCounter}>
        Step {currentStep + 1} of {selectedTool.prompts.length}
      </Text>
      <Text style={styles.promptText}>{selectedTool.prompts[currentStep]}</Text>
      <TextInput
        style={styles.thoughtInput}
        multiline
        placeholder="Type your response here..."
        value={responses[currentStep]}
        onChangeText={(text) => setResponses({ ...responses, [currentStep]: text })}
      />
    </View>
  );

  const renderQuickCalm = () => (
    <View style={styles.quickCalmContainer}>
      {selectedTool.techniques.map((technique, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.techniqueCard, { borderColor: selectedTool.color }]}
          onPress={() => {/* Implement technique timer */}}
        >
          <MaterialIcons name={technique.icon} size={32} color={selectedTool.color} />
          <Text style={styles.techniqueTitle}>{technique.title}</Text>
          <Text style={styles.techniqueDuration}>{technique.duration}s</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderAnxietyScale = () => (
    <View style={styles.scaleContainer}>
      {selectedTool.levels.map((level, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.levelButton,
            anxietyLevel === level.level && { backgroundColor: selectedTool.color },
          ]}
          onPress={() => setAnxietyLevel(level.level)}
        >
          <Text style={[
            styles.levelText,
            anxietyLevel === level.level && { color: 'white' },
          ]}>
            {level.level}: {level.description}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Anxiety Management</Text>
      </View>

      {!selectedTool ? (
        <ScrollView style={styles.toolList}>
          {anxietyTools.map((tool) => (
            <TouchableOpacity
              key={tool.id}
              style={[styles.toolCard, { borderLeftColor: tool.color }]}
              onPress={() => startTool(tool)}
            >
              <View style={[styles.iconContainer, { backgroundColor: tool.color }]}>
                <MaterialIcons name={tool.icon} size={32} color="white" />
              </View>
              <View style={styles.toolInfo}>
                <Text style={styles.toolTitle}>{tool.title}</Text>
                <Text style={styles.toolDescription}>{tool.description}</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <Animated.View style={[styles.exerciseWrapper, { opacity: fadeAnim }]}>
          <Text style={[styles.exerciseTitle, { color: selectedTool.color }]}>
            {selectedTool.title}
          </Text>

          {selectedTool.id === '1' && renderGroundingExercise()}
          {selectedTool.id === '2' && renderThoughtRecord()}
          {selectedTool.id === '3' && renderQuickCalm()}
          {selectedTool.id === '4' && renderAnxietyScale()}

          <View style={styles.buttonContainer}>
            {!isExerciseComplete ? (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: selectedTool.color }]}
                onPress={handleNext}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: selectedTool.color }]}
                onPress={() => setSelectedTool(null)}
              >
                <Text style={styles.buttonText}>Complete</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() => setSelectedTool(null)}
            >
              <Text style={[styles.buttonText, { color: '#666' }]}>Exit</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    color: '#333',
  },
  toolList: {
    flex: 1,
    padding: 16,
  },
  toolCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  toolInfo: {
    flex: 1,
  },
  toolTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  toolDescription: {
    fontSize: 14,
    color: '#666',
  },
  exerciseWrapper: {
    flex: 1,
    padding: 16,
  },
  exerciseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  exerciseContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCounter: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  senseContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 12,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  senseTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  senseCount: {
    fontSize: 20,
    color: '#333',
    marginBottom: 8,
  },
  senseDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  promptText: {
    fontSize: 20,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  thoughtInput: {
    width: '100%',
    height: 120,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    textAlignVertical: 'top',
    marginBottom: 24,
  },
  quickCalmContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  techniqueCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
  },
  techniqueTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  techniqueDuration: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  scaleContainer: {
    width: '100%',
  },
  levelButton: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'white',
    marginBottom: 8,
  },
  levelText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    padding: 16,
  },
  button: {
    width: '100%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  secondaryButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});