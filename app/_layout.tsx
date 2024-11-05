import React, { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { loadToken } from '../redux/Slices/authSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  const router = useRouter();

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="Login" />
          <Stack.Screen name="Main" />
          <Stack.Screen name="Signup" />
          <Stack.Screen name="Profile" />
        </Stack>
      </GestureHandlerRootView>
    </Provider>
  );
}
