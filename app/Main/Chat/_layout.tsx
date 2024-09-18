import { Text, View, StyleSheet } from "react-native";
import { TopTabs } from "@bacons/expo-router-top-tabs";


export default function CustomLayout() {
  return (
    <TopTabs  screenOptions={{
        tabBarIndicatorStyle: { backgroundColor: 'purple' },
        tabBarItemStyle: { paddingVertical: 10, marginHorizontal: 5 },
        tabBarStyle: { paddingHorizontal: 10 },
      }}>
      <TopTabs.Header>
        <View pointerEvents="none" style={{ padding: 10, backgroundColor: 'white' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>Service</Text>
        </View>
      </TopTabs.Header>
      <TopTabs.Screen name="Messages" />
      <TopTabs.Screen name="Community" />
    </TopTabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
});