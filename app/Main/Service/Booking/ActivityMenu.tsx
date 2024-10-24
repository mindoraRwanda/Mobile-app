import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';

interface ActivityMenuItem {
  id: string;
  title: string;
  icon: string;
  count: number;
  color: string;
  route: string;
}

const ActivityMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = new Animated.Value(0);
  const router = useRouter();

  const activities: ActivityMenuItem[] = [
    {
      id: '1',
      title: 'Upcoming Sessions',
      icon: 'calendar',
      count: 3,
      color: '#6B46C1',
      route: '/UpcomingAppointments',
    },
    {
      id: '2',
      title: 'Messages',
      icon: 'comments',
      count: 5,
      color: '#3B82F6',
      route: '/Chat',
    },
    {
      id: '3',
      title: 'Exercises',
      icon: 'heartbeat',
      count: 2,
      color: '#10B981',
      route: '/Exercises',
    },
    {
      id: '4',
      title: 'Progress',
      icon: 'line-chart',
      count: 0,
      color: '#F59E0B',
      route: '/Progress',
    },
    {
      id: '5',
      title: 'Video Call',
      icon: 'video-camera',
      count: 0,
      color: '#E53E3E',
      route: '/VideoCall',
    },
  ];

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
    setIsOpen(!isOpen);
  };

  const handlePress = (route: string) => {
    router.push(route);
  };

  return (
    <View style={styles.container}>
      {/* Menu Items */}
      {activities.map((item, index) => (
        <Animated.View
          key={item.id}
          style={[
            styles.menuItem,
            {
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -60 * (activities.length - index)],
                  }),
                },
              ],
              opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ]}
        >
          <TouchableOpacity
            style={[styles.menuItemButton, { backgroundColor: item.color }]}
            onPress={() => handlePress(item.route)}
          >
            <Icon name={item.icon} size={20} color="#FFF" />
            <Text style={styles.menuItemText}>{item.title}</Text>
            {item.count > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.count}</Text>
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>
      ))}

      {/* Main Action Button */}
      <TouchableOpacity
        style={[styles.fabButton, isOpen && styles.fabButtonActive]}
        onPress={toggleMenu}
      >
        <Animated.View
          style={[
            styles.fabIcon,
            {
              transform: [
                {
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '45deg'],
                  }),
                },
              ],
            },
          ]}
        >
          <Icon name="plus" size={24} color="#FFF" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'flex-end',
  },
  fabButton: {
    backgroundColor: '#4A0887',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  fabButtonActive: {
    backgroundColor: '#E53E3E',
  },
  fabIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 0,
  },
  menuItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 25,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  menuItemText: {
    color: '#FFF',
    marginLeft: 8,
    fontWeight: '600',
    fontSize: 14,
  },
  badge: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  badgeText: {
    color: '#333',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ActivityMenu;