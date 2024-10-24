import { Text, View, StyleSheet, Dimensions, Platform, PixelRatio } from "react-native";
import { TopTabs } from "@bacons/expo-router-top-tabs";

const { width, height } = Dimensions.get('window');

const scaleFontSize = (size: number) => size * PixelRatio.getFontScale();

export default function CustomLayout() {
  return (
    <TopTabs
      screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: 'purple' },
        tabBarItemStyle: { paddingVertical: 10, marginHorizontal: 5 },
        tabBarStyle: { paddingHorizontal: 10 },
      }}
    >
      <TopTabs.Header>
        <View style={styles.header}>
          <Text style={styles.headerText}>Service</Text>
        </View>
      </TopTabs.Header>

      <TopTabs.Screen name="Booking" />
      <TopTabs.Screen name="Feeds" />
    </TopTabs>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: width * 0.05,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: scaleFontSize(20), // Scales the font size
    fontWeight: 'bold',
    color: 'purple',
    textAlign: 'center',
  },
});