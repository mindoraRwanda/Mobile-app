import {
  MaterialTopTabNavigationEventMap,
  MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarLabelStyle: { textTransform: 'none' },
        tabBarIndicatorStyle: { backgroundColor: 'purple' },
      }}
    >
      <MaterialTopTabs.Screen 
        name="Booking" 
      />
      <MaterialTopTabs.Screen 
        name="feeds" 
      />
      <MaterialTopTabs.Screen 
        name="exercise"
      />
    </MaterialTopTabs>
  );
}
