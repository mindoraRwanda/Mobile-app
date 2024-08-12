import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const TermsAndConditions: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        router.push("../../Main");
                    }}
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mindora - Terms and Conditions</Text>
            </View>
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.sectionTitle}>1. Introduction</Text>
                <Text style={styles.paragraph}>
                    Welcome to Mindora. This app is designed to provide a comprehensive mental health support platform. By accessing or using our app, you agree to be bound by these terms and conditions. Please read them carefully.
                </Text>

                <Text style={styles.sectionTitle}>2. User Responsibilities</Text>
                <Text style={styles.paragraph}>
                    Users must provide accurate and up-to-date information. You are responsible for safeguarding your account and must notify us immediately if there is any unauthorized use of your account.
                </Text>

                <Text style={styles.sectionTitle}>3. Privacy</Text>
                <Text style={styles.paragraph}>
                    Your privacy is important to us. Our app follows strict confidentiality standards. Please refer to our Privacy Policy for detailed information on how we collect, use, and protect your personal information.
                </Text>

                <Text style={styles.sectionTitle}>4. Use of the App</Text>
                <Text style={styles.paragraph}>
                    Mindora is intended for personal, non-commercial use. Any misuse, including unauthorized copying or distribution of content, is prohibited.
                </Text>

                <Text style={styles.sectionTitle}>5. Limitation of Liability</Text>
                <Text style={styles.paragraph}>
                    Mindora provides support but does not replace professional medical advice. We are not liable for any damages arising from the use of this app.
                </Text>

                <Text style={styles.sectionTitle}>6. Modifications to the Terms</Text>
                <Text style={styles.paragraph}>
                    We may modify these terms at any time. Changes will be communicated through the app. Continued use of the app implies acceptance of the modified terms.
                </Text>

                <Text style={styles.sectionTitle}>7. Contact Us</Text>
                <Text style={styles.paragraph}>
                    If you have any questions or concerns about these terms, please contact us through the app's support feature.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        marginTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 18,
        backgroundColor: '#4A0887',
    },
    headerTitle: {
        fontSize: 19,
        fontWeight: '600',
        color: '#fff',
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        textAlign: 'center',
    },
    content: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4A0887',
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 15,
        fontWeight: '400',
        color: '#333',
        marginBottom: 16,
        lineHeight: 22,
    },
});

export default TermsAndConditions;
