import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import NotificationModal from './NotificationModal'; // Import the modal component
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';
import { router } from 'expo-router';

interface Props {
    navigation: NavigationProp<any>;
}

const Dashboard: React.FC<Props> = ({ navigation }) => {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [provider, setProvider] = useState('');
    const [isBooking, setIsBooking] = useState(false);
    const [notificationVisible, setNotificationVisible] = useState(false);
    const [notificationTitle, setNotificationTitle] = useState('');
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            setNotificationTitle(notification.request.content.title);
            setNotificationMessage(notification.request.content.body);
            setNotificationVisible(true);
        });

        return () => subscription.remove();
    }, []);

    const handleBookAppointment = async () => {
        Alert.alert('Appointment booked!', 'Your appointment has been successfully booked.');
        await scheduleNotification();
        setIsBooking(false);
    };

    const scheduleNotification = async () => {
        // Calculate notification time (e.g., 1 hour before the appointment)
        const notificationTime = new Date();
        notificationTime.setHours(notificationTime.getHours() + 1);

        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Appointment Reminder",
                body: `You have an appointment with ${provider} on ${date} at ${time}.`,
                data: {
                    appointmentDate: date,
                    appointmentTime: time,
                    providerName: provider
                }
            },
            trigger: {
                date: notificationTime, // Schedule notification for a specific date
                repeats: false
            },
        });
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    {isBooking ? (
                        <View style={styles.bookingContainer}>
                            <Text style={styles.title}>Book Appointment</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Provider Name"
                                value={provider}
                                onChangeText={setProvider}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Date (YYYY-MM-DD)"
                                value={date}
                                onChangeText={setDate}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Time (HH:MM)"
                                value={time}
                                onChangeText={setTime}
                            />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={handleBookAppointment}
                            >
                                <Text style={styles.buttonText}>Book Appointment</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => setIsBooking(false)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <>
                            <View style={styles.header}>
                                <Text style={styles.title}>Welcome to Mindora</Text>
                                <Ionicons name="notifications-outline" size={24} color="white" />
                            </View>

                            <View style={styles.featureSection}>
                                <View style={styles.cardRow}>
                                    <TouchableOpacity
                                        style={styles.card}
                                        onPress={() =>
                                            router.push('./MoodTracking')}
                                    >
                                        <FontAwesome name="smile-o" size={24} color="black" />
                                        <Text style={styles.cardText}>Track Mood</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.card}
                                        onPress={() => setIsBooking(true)}
                                    >
                                        <FontAwesome name="calendar" size={24} color="black" />
                                        <Text style={styles.cardText}>Book Appointments</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.cardRow}>
                                    <TouchableOpacity
                                        style={styles.card}
                                        onPress={() => router.push('./Community')}
                                    >
                                        <FontAwesome name="users" size={24} color="black" />
                                        <Text style={styles.cardText}>Support Community</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.card}
                                        onPress={() => router.push('./Report')}
                                    >
                                        <MaterialIcons name="assessment" size={24} color="black" />
                                        <Text style={styles.cardText}>View Reports</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.cardRow}>
                                    <TouchableOpacity
                                        style={styles.card}
                                        onPress={() => {
                                            router.push('./Dashboard/Report');
                                        }}
                                    >
                                        <MaterialIcons name="library-books" size={24} color="black" />
                                        <Text style={styles.cardText}>Resources</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.statisticsSection}>
                                <Text style={styles.statisticsTitle}>Your Progress</Text>
                                <View style={styles.statisticsCard}>
                                    <Text style={styles.statisticsText}>Recent Mood Trend: Positive</Text>
                                </View>
                                <View style={styles.statisticsCard}>
                                    <Text style={styles.statisticsText}>Achievements: 3 Milestones Reached</Text>
                                </View>
                            </View>
                        </>
                    )}
                    <NotificationModal
                        visible={notificationVisible}
                        title={notificationTitle}
                        message={notificationMessage}
                        onClose={() => setNotificationVisible(false)}
                    />
                </View>
            </ScrollView>

            {/* Footer is now outside of the ScrollView */}
            <View style={styles.footer}>
                <TouchableOpacity
                    onPress={() => router.push('../Account/Account')}
                >
                    <Text style={styles.footerText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        router.push('./Dashboard/Help')}
                >
                    <Text style={styles.footerText}>Help</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        marginTop: 40,
    },
    scrollView: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        paddingBottom: 100, 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#4A0887',
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    featureSection: {
        padding: 20,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    card: {
        flex: 1,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cardText: {
        color: 'black',
        fontSize: 16,
        marginTop: 5,
        fontWeight: 'bold',
    },
    statisticsSection: {
        padding: 20,
        marginBottom: 75,
    },
    statisticsTitle: {
        fontSize: 18,
        color: '#4A0887',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    statisticsCard: {
        backgroundColor: '#6D28D9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    statisticsText: {
        color: 'black',
        fontSize: 16,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
        backgroundColor: '#4A0887',
    },
    footerText: {
        color: 'white',
        fontSize: 16,
    },
    bookingContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#4A0887',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: 'gray',
    },
});

export default Dashboard;
