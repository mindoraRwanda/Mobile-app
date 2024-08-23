import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

interface Props {
    navigation: NavigationProp<any>;
}

const Help: React.FC<Props> = ({ navigation }) => {
    const handleContactSupport = () => {
        Linking.openURL('mailto:support@mindora.com');
    };

    const handlePrivacyPolicy = () => {
        navigation.navigate('PrivacyPolicy');
    };

    const handleTermsOfService = () => {
        navigation.navigate('TermsOfService');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Help & Support</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.subtitle}>Frequently Asked Questions</Text>
                <View style={styles.faq}>
                    <Text style={styles.faqQuestion}>Q1: How do I track my mood?</Text>
                    <Text style={styles.faqAnswer}>A1: Go to the "Track Mood" section from the dashboard and enter your mood details.</Text>
                </View>
                <View style={styles.faq}>
                    <Text style={styles.faqQuestion}>Q2: How do I book an appointment?</Text>
                    <Text style={styles.faqAnswer}>A2: Tap on "Book Appointments" from the dashboard and fill in the required details.</Text>
                </View>
                <View style={styles.faq}>
                    <Text style={styles.faqQuestion}>Q3: How can I change my profile settings?</Text>
                    <Text style={styles.faqAnswer}>A3: Navigate to "Settings" from the dashboard to update your profile information.</Text>
                </View>

                {/* Additional FAQs */}
                <View style={styles.faq}>
                    <Text style={styles.faqQuestion}>Q4: How do I join a support group?</Text>
                    <Text style={styles.faqAnswer}>A4: Go to the "Support Community" section and select a group that matches your interests.</Text>
                </View>
                <View style={styles.faq}>
                    <Text style={styles.faqQuestion}>Q5: What should I do if I forget my password?</Text>
                    <Text style={styles.faqAnswer}>A5: Use the "Forgot Password" option on the login screen and follow the instructions to reset your password.</Text>
                </View>
                <View style={styles.faq}>
                    <Text style={styles.faqQuestion}>Q6: How can I manage my notifications?</Text>
                    <Text style={styles.faqAnswer}>A6: Go to "Settings" and select "Notification Preferences" to manage your notification settings.</Text>
                </View>

                {/* Troubleshooting Section */}
                <Text style={styles.subtitle}>Troubleshooting</Text>
                <View style={styles.faq}>
                    <Text style={styles.faqQuestion}>Issue: App is not loading properly.</Text>
                    <Text style={styles.faqAnswer}>Solution: Try restarting your device and check your internet connection. If the issue persists, contact support.</Text>
                </View>
                <View style={styles.faq}>
                    <Text style={styles.faqQuestion}>Issue: Unable to book an appointment.</Text>
                    <Text style={styles.faqAnswer}>Solution: Ensure that your internet connection is stable and that you have filled out all required fields in the booking form.</Text>
                </View>

                {/* App Guides */}
                <Text style={styles.subtitle}>Guides & Tutorials</Text>
                <TouchableOpacity style={styles.linkButton}
                    onPress={() => {
                        // navigation.navigate('MoodTrackingGuide')
                    }}>
                    <Text style={styles.linkText}>How to Use Mood Tracking</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkButton}
                    onPress={() => {
                        navigation.navigate('AppointmentBookingGuide')
                    }}>
                    <Text style={styles.linkText}>How to Book Appointments</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkButton}
                    onPress={() => {
                        navigation.navigate('ProfileSettingsGuide')
                    }}>
                    <Text style={styles.linkText}>How to Update Profile Settings</Text>
                </TouchableOpacity>

                {/* Legal Information */}
                <Text style={styles.subtitle}>Legal Information</Text>
                <TouchableOpacity style={styles.linkButton} 
                onPress={handlePrivacyPolicy}>
                    <Text style={styles.linkText}>Privacy Policy</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.linkButton}
                 onPress={handleTermsOfService}>
                    <Text style={styles.linkText}>Terms of Service</Text>
                </TouchableOpacity>

                {/* Contact Support Button */}
                <TouchableOpacity style={styles.contactButton} 
                onPress={handleContactSupport}>
                    <FontAwesome name="envelope" size={24} color="white" />
                    <Text style={styles.contactText}>Contact Support</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
    },
    header: {
        padding: 20,
        backgroundColor: '#4A0887',
    },
    title: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    content: {
        padding: 20,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    faq: {
        marginBottom: 15,
    },
    faqQuestion: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    faqAnswer: {
        fontSize: 16,
        marginTop: 5,
    },
    linkButton: {
        marginBottom: 15,
    },
    linkText: {
        fontSize: 16,
        color: '#6D28D9',
        textDecorationLine: 'underline',
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6D28D9',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    contactText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
});

export default Help;
