import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index(): React.ReactElement {
  const router = useRouter();
  
  const onPressHandler = (): void => {
    router.push('/Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Image
          source={require('../assets/ImgForScreen/welcome.jpg') as ImageSourcePropType}
          style={styles.heroImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <View style={styles.contentHeader}>
          <Text style={styles.title}>
            Improve your Mental{'\n'}{' '}
            <View style={styles.appName}>
              <Text style={styles.appNameText}>With Mindora</Text>
            </View>
          </Text>
          <Text style={styles.text}>
           - This AI assistant will help you to find the best solution for your problem.{'\n'}
            - You can book your appointment with the doctor.{'\n'}
            - You can join the community of people who are facing the same problem as you.
          </Text>
        </View>

        <TouchableOpacity onPress={onPressHandler}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Let's go</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    color: '#281b52',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 40,
  },
  text: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: '400',
    color: '#9992a7',
    textAlign: 'center',
  },
  hero: {
    backgroundColor: '#d8dffe',
    margin: 12,
    borderRadius: 16,
    padding: 16,
  },
  heroImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  contentHeader: {
    paddingHorizontal: 24,
  },
  appName: {
    backgroundColor: '#fff2dd',
    transform: [
      {
        rotate: '-5deg',
      },
    ],
    paddingHorizontal: 6,
  },
  appNameText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#281b52',
  },
  button: {
    backgroundColor: '#800080',
    paddingVertical: 12,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#fff',
  },
});