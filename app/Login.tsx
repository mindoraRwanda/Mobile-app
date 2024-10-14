import React, { FC, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loginUser } from '../redux/Slices/authSlice';
import { ScrollView } from 'react-native-gesture-handler';

const Login: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { status, error } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);

  // const validateEmail = (email: string): boolean => {
  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailPattern.test(email);
  // };

  

  const onPressSignIn = () => {
    router.push('/Main');
    // if (!validateEmail(email)) {
    //   Alert.alert('Invalid Email', 'Please enter a valid email address.');
    //   return;
    // }
    

    setIsLoading(true);
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        setIsLoading(false);
        router.push('/Main');
      })
      .catch((err) => {
        setIsLoading(false);
        Alert.alert('Login Failed', 'Invalid email or password');
      });
  };

  const onPressCreateAccount = () => {
    router.push('/Signup');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={require('../assets/ImgForScreen/user.jpg')} />
          <Text style={styles.title}>MINDORA</Text>
          <Text style={styles.subtitle}>Welcome, please sign in to your Account</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.input}>
            <Text style={[styles.inputLabel, { color: 'black' }]}>Email address</Text>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={setEmail}
              placeholder="Enter your Email"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              value={email}
            />
          </View>
          <View style={styles.input}>
            <Text style={[styles.inputLabel, { color: 'black' }]}>Password</Text>
            <TextInput
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={setPassword}
              placeholder="Enter your Password"
              placeholderTextColor="#6b7280"
              style={styles.inputControl}
              secureTextEntry={true}
              value={password}
            />
          </View>
          <View style={styles.formAction}>
            <TouchableOpacity onPress={onPressSignIn}>
              <View style={[styles.btn, { backgroundColor: 'purple' }]}>
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.btnText}>Log in</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={onPressCreateAccount}>
            <Text style={styles.formFooter}>
              Don't have an account?{' '}
              <Text style={{ textDecorationLine: 'underline' }}>Sign up</Text>
            </Text>
          </TouchableOpacity>
          {status === 'failed' && <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  header: {
    marginVertical: 70,
    alignItems: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'purple',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
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
    borderColor: 'purple',
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Login;
