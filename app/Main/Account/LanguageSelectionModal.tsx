import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

export default function LanguageSelectionModal({ visible, setVisible, languageOpen, languageValue, languageItems, setLanguageOpen, setLanguageValue, setLanguageItems, setSelectedLanguage }) {
  const [animation] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: visible ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const slideAnimation = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0],
        }),
      },
    ],
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalBackdrop}>
        <Animated.View style={[styles.modalContainer, slideAnimation]}>
          <LinearGradient
            colors={['#8a2be2', '#4b0082']}
            style={styles.modalHeader}
          >
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={styles.closeButton}
              accessibilityLabel="Close Language Selection"
            >
              <Ionicons name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Choose Your Language</Text>
          </LinearGradient>
          <View style={styles.modalContent}>
            <DropDownPicker
              open={languageOpen}
              value={languageValue}
              items={languageItems}
              setOpen={setLanguageOpen}
              setValue={setLanguageValue}
              setItems={setLanguageItems}
              onChangeValue={(value) => setSelectedLanguage(value)}
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              textStyle={styles.dropdownText}
              labelStyle={styles.dropdownLabel}
              placeholderStyle={styles.dropdownPlaceholder}
              accessibilityLabel="Select a Language"
              dropDownDirection="BOTTOM" // Ensures the dropdown opens downwards
            />
            <Pressable
              style={styles.confirmButton}
              onPress={() => setVisible(false)}
              accessibilityLabel="Confirm Language Selection"
            >
              <LinearGradient
                colors={['#8a2be2', '#4b0082']}
                style={styles.confirmButtonGradient}
              >
                <Text style={styles.confirmButtonText}>Confirm Selection</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darkened backdrop for focus
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: '#4b0082',
  },
  closeButton: {
    marginLeft: 10,
    padding: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flex: 1, // Center the title
  },
  modalContent: {
    padding: 20,
  },
  dropdown: {
    borderColor: '#8a2be2',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  dropdownContainer: {
    borderColor: '#8a2be2',
    borderWidth: 1,
    borderRadius: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#4b0082',
  },
  dropdownLabel: {
    color: '#4b0082',
    fontWeight: 'bold',
  },
  dropdownPlaceholder: {
    color: '#8a2be2',
    fontWeight: 'bold',
  },
  confirmButton: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 2, // Shadow for button depth
  },
  confirmButtonGradient: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
