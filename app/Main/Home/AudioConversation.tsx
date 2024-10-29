import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  Alert,
} from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

interface PulseCircleProps {
  delay: number;
  scale: number;
}

const { width, height } = Dimensions.get('window');
const RECORDING_DURATION = 10000; // 10 seconds

const PulseCircle: React.FC<PulseCircleProps> = ({ delay, scale }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const pulse = Animated.sequence([
      Animated.delay(delay),
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: scale,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]);
    pulse.start();
    return () => pulse.stop();
  }, []);

  return (
    <Animated.View
      style={[
        styles.pulseCircle,
        {
          transform: [{ scale: pulseAnim }],
        },
      ]}
    />
  );
};

const VoiceInterface: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(true);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [countdown, setCountdown] = useState(10);
  const [isPlaying, setIsPlaying] = useState(false);
  const floatingAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const countdownInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    Audio.requestPermissionsAsync();
    setupAudioMode();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const setupAudioMode = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });
  };

  const startRecording = async () => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(newRecording);
      setIsListening(true);
      setCountdown(10);
      
      // Start countdown
      countdownInterval.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            stopRecording();
            clearInterval(countdownInterval.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Auto-stop after 10 seconds
      setTimeout(() => {
        stopRecording();
      }, RECORDING_DURATION);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setIsListening(false);
      if (countdownInterval.current) {
        clearInterval(countdownInterval.current);
      }
      
      if (uri) {
        playDemoResponse(uri);
      }
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  const playDemoResponse = async (recordingUri: string) => {
    try {
      // First play the user's recording
      const { sound: recordingSound } = await Audio.Sound.createAsync({ uri: recordingUri });
      setSound(recordingSound);
      await recordingSound.playAsync();
      
      // Wait for the recording to finish
      recordingSound.setOnPlaybackStatusUpdate(async (status) => {
        if ((status as AVPlaybackStatusSuccess).didJustFinish) {
          // After recording playback, play the demo response
          await recordingSound.unloadAsync();
          Alert.alert(
            "Mindora AI Demo",
            "Thank you for trying our demo! Mindora Voice AI is still under development. Soon, you'll be able to have natural conversations with our AI assistant. Stay tuned for updates!",
            [{ text: "OK" }]
          );
        }
      });
    } catch (error) {
      console.error('Failed to play demo response', error);
    }
  };

  const toggleListening = () => {
    if (!isListening) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4A0887', '#2D0052', '#1A0033']}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.mainContent}>
        <View style={styles.circleContainer}>
          {isListening && (
            <>
              <PulseCircle delay={0} scale={1.3} />
              <PulseCircle delay={333} scale={1.5} />
              <PulseCircle delay={666} scale={1.7} />
            </>
          )}
          <TouchableOpacity
            onPress={toggleListening}
            style={[
              styles.micButton,
              isListening && styles.micButtonActive
            ]}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isListening ? 'mic' : 'mic-off'}
              size={40}
              color="#FFF"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.statusText}>
          {isListening 
            ? `Recording... ${countdown}s` 
            : 'Tap to speak'}
        </Text>
      </View>

      {showComingSoon && (
        <BlurView intensity={60} style={StyleSheet.absoluteFill}>
          <TouchableOpacity
            style={styles.comingSoonContainer}
            onPress={() => setShowComingSoon(false)}
            activeOpacity={0.9}
          >
            <View style={styles.comingSoonContent}>
              <Text style={styles.comingSoonTitle}>Coming Soon!</Text>
              <Text style={styles.comingSoonText}>
                Try our demo version!{'\n'}
                Record for 10 seconds and hear how{'\n'}
                Mindora AI will work.{'\n\n'}
                Tap anywhere to start the demo.
              </Text>
              <Ionicons name="rocket" size={40} color="#FFF" />
            </View>
          </TouchableOpacity>
        </BlurView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleContainer: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseCircle: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: 'rgba(74, 8, 135, 0.3)',
  },
  micButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(74, 8, 135, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  micButtonActive: {
    backgroundColor: 'rgba(74, 8, 135, 1)',
    borderColor: '#fff',
  },
  statusText: {
    marginTop: 20,
    fontSize: 18,
    color: '#FFF',
    fontWeight: '600',
  },
  comingSoonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(74, 8, 135, 0.3)',
  },
  comingSoonContent: {
    padding: 30,
    alignItems: 'center',
    backgroundColor: 'rgba(74, 8, 135, 0.8)',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  comingSoonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  comingSoonText: {
    fontSize: 16,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.9,
    lineHeight: 24,
  },
});

export default VoiceInterface;