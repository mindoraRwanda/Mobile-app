import { Tabs } from 'expo-router';
import { MaterialCommunityIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons';

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          color = focused ? 'purple' : 'rgba(74, 8, 135, 0.557)';

          if (route.name === 'Home') {
            iconName = 'robot';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          }
          if (route.name === 'Chat') {
            iconName = 'wechat';
            return <AntDesign name={iconName} size={size} color={color} />;
          }
          if (route.name === 'Service') {
            iconName = 'laptop-medical';
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          }
          if (route.name === 'Progress') {
            iconName = 'dashboard';
            return <AntDesign name={iconName} size={size} color={color} />;
          }
          if (route.name === 'Account') {
            iconName = 'account-cog-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: 'AI Chat',
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Service"
        options={{
          headerShown: false,
          title: 'Services',
        }}
      />
      <Tabs.Screen
       name="Chat" 
       options={{
        headerShown: false,
      }}
       />
      <Tabs.Screen
        name="Progress"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Account"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
