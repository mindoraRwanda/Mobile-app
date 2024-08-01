import React from 'react';
import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="Login" />
        <Stack.Screen name="Main" />
        <Stack.Screen name="Profile" />
        <Stack.Screen name="Signup" />
      </Stack>
      </GestureHandlerRootView>
    </Provider>
  );
}
