import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ImageBackground,
  Linking, 
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';

const ContactUs: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = () => {
    Alert.alert('Contact Us', 'Your message has been sent.');
    setForm({ name: '', email: '', message: '' });
  };

  const openTwitter = () => {
    Linking.openURL('https://twitter.com/MentalHealthRw');
  };
  const openLinkedIn = () => {
    Linking.openURL('https://www.linkedin.com/company/mentalhealthjourney/?originalSubdomain=rw');
  };
  const openInstagram = () => {
    Linking.openURL('https://www.instagram.com/lifeline_rw/');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              router.push('../Main/Account')
            }}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text numberOfLines={1} style={styles.headerTitle}>
            Contact Us
          </Text>
          <View style={[styles.headerAction, { alignItems: 'flex-end' }]}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <FeatherIcon
                color="#000"
                name="more-vertical"
                size={24}
              />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Get in Touch</Text>
            <ImageBackground
              source={require('./../assets/contact.jpeg')}
              style={styles.backgroundImage}
              imageStyle={styles.backgroundImageStyle}
            >
              <View style={styles.sectionBody}>
                <Text style={styles.description}>
                  We Love to hear from you. Contact us now and get a quick reply
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  value={form.name}
                  onChangeText={(text) => setForm({ ...form, name: text })}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  keyboardType="email-address"
                  value={form.email}
                  onChangeText={(text) => setForm({ ...form, email: text })}
                />
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Your Message"
                  multiline
                  numberOfLines={4}
                  value={form.message}
                  onChangeText={(text) => setForm({ ...form, message: text })}
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Send Message</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Our Location</Text>
            <View style={styles.sectionBody}>
              <Text style={styles.description}>
                You can also visit us at our headquarters for direct inquiries or to get to know us better. We are located at:
              </Text>
              <Text style={styles.address}>
                <Ionicons name='location'> </Ionicons>
                Gikondo, Kigali-Rwanda
              </Text>
              <Text style={styles.description}>
                Our office hours are Monday to Friday, 9:00 AM to 5:00 PM.
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Follow Us</Text>
            <View style={styles.sectionBody}>
              <Text style={styles.description}>
                Stay connected with us through our social media channels for updates, news, and more. Follow us on:
              </Text>
              <View style={styles.social}>
                <TouchableOpacity onPress={openLinkedIn} style={styles.socials}>
                  <Text style={styles.socialMedia} >
                    <Ionicons name={'logo-linkedin'} style={{ fontSize: 20 }}></Ionicons>
                    LinkedIn
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openTwitter} style={styles.socials}>
                  <Text style={styles.socialMedia}>
                    <Ionicons name={'logo-twitter'} style={{ fontSize: 20 }}></Ionicons>
                    Twitter
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openInstagram} style={styles.socials}>
                  <Text style={styles.socialMedia}>
                    <Ionicons name={'logo-instagram'} style={{ fontSize: 20 }}></Ionicons>
                    Instagram
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  headerAction: {
    width: 40,
    height: 40,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '600',
    color: '#000',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: 'center',
  },
  content: {
    paddingHorizontal: 16,
  },
  section: {
    paddingVertical: 12,
  },
  sectionTitle: {
    margin: 8,
    marginLeft: 12,
    fontSize: 13,
    letterSpacing: 0.33,
    fontWeight: '500',
    color: '#a69f9f',
    textTransform: 'uppercase',
  },
  sectionBody: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    backgroundColor: '#fff',
    padding: 16,
  },
  backgroundImage: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  backgroundImageStyle: {
    opacity: 0.3,
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 8,
  },
  address: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  social: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  socials: {
    display: 'flex',
    gap: 10,
  },
  socialMedia: {
    fontSize: 16,
    color: '#007BFF',
    marginBottom: 10,
  },
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4A0887',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ContactUs;
