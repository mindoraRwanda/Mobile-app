import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { signupUser } from '@/redux/Slices/authSlice';
import * as ImagePicker from 'expo-image-picker';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  profileImage: string;
}

export default function SignUp(): React.ReactElement {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    username: '',
    password: '',
    profileImage: '',
  });

  const { status, error } = useSelector((state: RootState) => state.auth);

  const validateEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const validatePhoneNumber = (phoneNumber: string): boolean => {
    const phonePattern = /^[0-9]{10,}$/;
    return phonePattern.test(phoneNumber);
  };

  const validateUsername = (username: string): boolean => {
    const usernamePattern = /^[a-zA-Z0-9_]+$/;
    return usernamePattern.test(username);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, profileImage: result.assets[0].uri });
    }
  };

  const onPressSignUp = async (): Promise<void> => {
    const errors: { [key: string]: string } = {};

    if (!form.firstName) errors.firstName = 'First name is required';
    if (!form.lastName) errors.lastName = 'Last name is required';
    if (!form.email || !validateEmail(form.email)) errors.email = 'Valid email is required';
    if (!form.phoneNumber || !validatePhoneNumber(form.phoneNumber)) errors.phoneNumber = 'Valid phone number is required';
    if (!form.username || !validateUsername(form.username)) errors.username = 'Username is required';
    if (!form.password) errors.password = 'Password is required';
    //if (!form.profileImage) errors.profileImage = 'Profile image is required';

    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).join('\n');
      Alert.alert('Validation Errors', errorMessages);
      return;
    }

    try {
      await dispatch(signupUser(form)).unwrap();
      Alert.alert('Sign up successful');
      router.push('./Main/Account/Account');
    } catch (err) {
      Alert.alert('Sign up failed', err.message || 'An error occurred');
    }
  };

  const onPressHaveAccount = (): void => {
    router.back();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Sign Up</Text>
            <Text style={styles.subtitle}>Create a new account</Text>
          </View>
          <View style={styles.form}>
            <TouchableOpacity onPress={pickImage} style={styles.imageUpload}>
              {form.profileImage ? (
                <Image source={{ uri: form.profileImage }} style={styles.profileImage} />
              ) : (
                <Text style={styles.uploadText}>Upload Profile Picture</Text>
              )}
            </TouchableOpacity>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>First Name</Text>
              <TextInput
                autoCapitalize="words"
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={(firstName) => setForm({ ...form, firstName })}
                placeholder="Enter your first name"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.firstName}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Last Name</Text>
              <TextInput
                autoCapitalize="words"
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={(lastName) => setForm({ ...form, lastName })}
                placeholder="Enter your last name"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.lastName}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={(username) => setForm({ ...form, username })}
                placeholder="Enter your username"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.username}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={(email) => setForm({ ...form, email })}
                placeholder="john@example.com"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.email}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Phone Number</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="phone-pad"
                onChangeText={(phoneNumber) => setForm({ ...form, phoneNumber })}
                placeholder="Enter your phone number"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.phoneNumber}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={(password) => setForm({ ...form, password })}
                placeholder="********"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                secureTextEntry={true}
                value={form.password}
              />
            </View>
            <View style={styles.formAction}>
              <TouchableOpacity onPress={onPressSignUp}>
                <View style={{ ...styles.btn, backgroundColor: 'purple' }}>
                  {status === 'loading' ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.btnText}>Sign Up</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
            {status === 'failed' && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
            <TouchableOpacity onPress={onPressHaveAccount}>
              <Text style={styles.formFooter}>
                Already Have an Account?{' '}
                <Text style={{ textDecorationLine: 'underline' }}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 24,
    flexGrow: 1,
  },
  container: {
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 36,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1d1d1d',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  formAction: {
    marginVertical: 24,
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },
  inputControl: {
    height: 44,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: '#222',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: 'rgba(74, 8, 135)',
    borderColor: 'rgba(74, 8, 135)',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
  imageUpload: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  uploadText: {
    color: '#6b7280',
    textAlign: 'center',
  },
});