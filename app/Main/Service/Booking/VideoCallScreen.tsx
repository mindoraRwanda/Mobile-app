import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const VideoCallScreen: React.FC = () => {
  const router = useRouter();
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isBackCamera, setIsBackCamera] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  // Handle call duration timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format duration to MM:SS
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    router.back();
  };

  const doctorInfo = {
    name: 'Dr. Sarah Wilson',
    specialty: 'Psychologist',
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Main video area (doctor's video) */}
      <View style={styles.mainVideoContainer}>
        <View style={styles.doctorNameContainer}>
          <Text style={styles.doctorName}>{doctorInfo.name}</Text>
          <Text style={styles.specialty}>{doctorInfo.specialty}</Text>
        </View>

        {/* Call duration */}
        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>{formatDuration(callDuration)}</Text>
        </View>

        {/* Quality indicator */}
        <View style={styles.qualityIndicator}>
          <MaterialIcons name="wifi" size={20} color="#fff" />
          <Text style={styles.qualityText}>HD</Text>
        </View>
      </View>

      {/* Self video preview */}
      <View style={styles.selfVideoContainer}>
        {!isCameraOff && (
          <View style={styles.selfVideo}>
            {/* Camera off indicator */}
            {isCameraOff && (
              <View style={styles.cameraOffIndicator}>
                <MaterialIcons name="videocam-off" size={24} color="#fff" />
              </View>
            )}
          </View>
        )}
      </View>

      {/* Controls container */}
      <View style={styles.controlsContainer}>
        {/* Top row controls */}
        <View style={styles.topControls}>
          <TouchableOpacity
            style={[styles.controlButton, isMuted && styles.controlButtonActive]}
            onPress={() => setIsMuted(!isMuted)}
          >
            <MaterialIcons
              name={isMuted ? 'mic-off' : 'mic'}
              size={24}
              color="#fff"
            />
            <Text style={styles.controlText}>
              {isMuted ? 'Unmute' : 'Mute'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, isCameraOff && styles.controlButtonActive]}
            onPress={() => setIsCameraOff(!isCameraOff)}
          >
            <MaterialIcons
              name={isCameraOff ? 'videocam-off' : 'videocam'}
              size={24}
              color="#fff"
            />
            <Text style={styles.controlText}>
              {isCameraOff ? 'Start Video' : 'Stop Video'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => setIsBackCamera(!isBackCamera)}
          >
            <MaterialIcons name="flip-camera-ios" size={24} color="#fff" />
            <Text style={styles.controlText}>Flip</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom row controls */}
        <View style={styles.bottomControls}>
          <TouchableOpacity
            style={[styles.controlButton, styles.audioSelectButton]}
          >
            <MaterialIcons name="headset" size={24} color="#fff" />
            <Text style={styles.controlText}>Audio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.controlButton, styles.endCallButton]}
            onPress={handleEndCall}
          >
            <MaterialIcons name="call-end" size={28} color="#fff" />
            <Text style={[styles.controlText, styles.endCallText]}>End</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.controlButton, styles.moreButton]}>
            <MaterialIcons name="more-horiz" size={24} color="#fff" />
            <Text style={styles.controlText}>More</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Connection status banner - show when needed */}
      {false && (
        <View style={styles.connectionBanner}>
          <MaterialIcons name="wifi-off" size={20} color="#fff" />
          <Text style={styles.connectionText}>
            Your connection is unstable...
          </Text>
        </View>
      )}

      {/* Picture-in-Picture button */}
      <TouchableOpacity style={styles.pipButton}>
        <MaterialIcons name="picture-in-picture-alt" size={24} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  mainVideoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
  },
  doctorNameContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    left: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  doctorName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  specialty: {
    color: '#ccc',
    fontSize: 14,
  },
  durationContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  durationText: {
    color: '#fff',
    fontSize: 16,
  },
  qualityIndicator: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 110 : 90,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    borderRadius: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  qualityText: {
    color: '#fff',
    marginLeft: 4,
    fontSize: 12,
  },
  selfVideoContainer: {
    position: 'absolute',
    top: 120,
    right: 16,
    width: 120,
    height: 160,
    borderRadius: 8,
    overflow: 'hidden',
  },
  selfVideo: {
    flex: 1,
    backgroundColor: '#2a2a2a',
  },
  cameraOffIndicator: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlButton: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  controlButtonActive: {
    backgroundColor: '#f44336',
  },
  audioSelectButton: {
    backgroundColor: 'transparent',
  },
  endCallButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 32,
    borderRadius: 32,
  },
  moreButton: {
    backgroundColor: 'transparent',
  },
  controlText: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  endCallText: {
    fontWeight: '600',
  },
  connectionBanner: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 30,
    left: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 8,
  },
  connectionText: {
    color: '#fff',
    marginLeft: 8,
  },
  pipButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 16,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 8,
  },
});

export default VideoCallScreen;