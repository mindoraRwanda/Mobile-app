import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
}

export default function SignUp(): React.ReactElement {
  const router = useRouter();

  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phoneNumber: '',
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onPressSingIn = (): void => {
    if (!form.email || !form.phoneNumber || !form.password || !form.name || !form.username) {
      Alert.alert('Please fill in all fields');
      return;
    }
    setIsLoading(true);

    // delay for user feedback
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Sign up successfull');
      router.push('./Main/Account/Profile')
    }, 1000)

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
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                autoCapitalize="words"
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={(name) => setForm({ ...form, name })}
                placeholder="Enter your name"
                placeholderTextColor="#6b7280"
                style={styles.inputControl}
                value={form.name}
              />
            </View>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>User Name</Text>
              <TextInput
                autoCapitalize="words"
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={(username) => setForm({ ...form, username })}
                placeholder="Enter your user name"
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
              <TouchableOpacity onPress={onPressSingIn}>
                <View style={{ ...styles.btn, backgroundColor: 'purple' }}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.btnText}>Sign Up</Text>
                  )}
                </View>
              </TouchableOpacity>
            </View>
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
});