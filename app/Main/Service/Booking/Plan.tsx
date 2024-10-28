import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

// Sample data for upcoming appointments
const upcomingAppointments = [
  {
    id: 1,
    doctorName: "Dr. Sarah Wilson",
    specialty: "Psychologist",
    date: "Today",
    time: "2:30 PM",
    type: "video",
  },
  {
    id: 2,
    doctorName: "Dr. Michael Chen",
    specialty: "Psychiatrist",
    date: "Tomorrow",
    time: "10:00 AM",
    type: "chat",
  },
  {
    id: 3,
    doctorName: "Dr. Emily Brooks",
    specialty: "Therapist",
    date: "Oct 30",
    time: "3:45 PM",
    type: "video",
  },
];

const Plan: React.FC = () => {
  const router = useRouter();

  const navigateToPage = (page: string) => {
    router.push(page);
  };

  const getAppointmentIcon = (type: string) => {
    return type === 'video' ? 
      <MaterialIcons name="videocam" size={24} color="#4CAF50" /> :
      <MaterialIcons name="chat" size={24} color="#2196F3" />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Care Portal</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.upcomingSection}>
          <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          
          {upcomingAppointments.map((appointment) => (
            <TouchableOpacity
              key={appointment.id}
              style={styles.appointmentCard}
              onPress={() => navigateToPage(appointment.type === 'video' ? '/VideoCall' : '/Chat')}
            >
              <View style={styles.appointmentInfo}>
                <View style={styles.appointmentHeader}>
                  <Text style={styles.doctorName}>{appointment.doctorName}</Text>
                  {getAppointmentIcon(appointment.type)}
                </View>
                <Text style={styles.specialty}>{appointment.specialty}</Text>
                <View style={styles.timeContainer}>
                  <MaterialIcons name="access-time" size={16} color="#666" />
                  <Text style={styles.timeText}>{appointment.date} at {appointment.time}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: '#E3F2FD' }]}
              onPress={() => navigateToPage('./Chat')}
            >
              <FontAwesome5 name="comments" size={24} color="#2196F3" />
              <Text style={[styles.actionButtonText, { color: '#2196F3' }]}>Messages</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, { backgroundColor: '#E8F5E9' }]}
              onPress={() => navigateToPage('./VideoCallScreen')}
            >
              <MaterialIcons name="video-call" size={24} color="#4CAF50" />
              <Text style={[styles.actionButtonText, { color: '#4CAF50' }]}>Start Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  upcomingSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  appointmentInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  specialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  quickActions: {
    marginBottom: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Plan;