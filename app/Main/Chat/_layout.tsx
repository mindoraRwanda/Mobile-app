import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';

const { Navigator, Screen } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  return (
    <View style={styles.container}>
      <MaterialTopTabs
        screenOptions={{
          tabBarLabelStyle: { textTransform: 'none' },
          tabBarIndicatorStyle: { backgroundColor: 'purple' },
        }}
      >
        <MaterialTopTabs.Screen
          name="Chat" />
        <MaterialTopTabs.Screen
          name="Community" />
      </MaterialTopTabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
});
