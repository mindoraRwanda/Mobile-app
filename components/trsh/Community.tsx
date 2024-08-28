import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const Community: React.FC = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Support Community</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Welcome to the Community</Text>
                <Text style={styles.sectionText}>
                    Connect with others, share experiences, and find support through our community forums and groups.
                </Text>
            </View>
            <View style={styles.section}>
                <TouchableOpacity style={styles.card}>
                    <FontAwesome name="group" size={24} color="white" />
                    <Text style={styles.cardText}>Join Support Groups</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.card}>
                    <MaterialIcons name="forum" size={24} color="white" />
                    <Text style={styles.cardText}>Browse Discussions</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 30,
    },
    header: {
        backgroundColor: '#4A0887',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sectionText: {
        fontSize: 16,
        color: '#333',
    },
    card: {
        backgroundColor: '#6D28D9',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    cardText: {
        color: 'white',
        fontSize: 16,
        marginTop: 5,
    },
});

export default Community;
