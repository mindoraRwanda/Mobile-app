// app/home/_layout.js
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="Home" 
        options={{ 
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} /> 
        }} 
      />
      {/* <Tabs.Screen 
        name="budget" 
        options={{ 
          title: 'Budget', 
          tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="expense" 
        options={{ 
          title: 'Expense', 
          tabBarIcon: ({ color, size }) => <Ionicons name="settings" size={size} color={color} /> 
        }} 
      /> */}
      
    </Tabs>
  );
}
