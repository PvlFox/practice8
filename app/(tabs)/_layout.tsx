import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs initialRouteName="index">
      <Tabs.Screen name="index" options={{ title: 'Characters' }} />
      <Tabs.Screen name="locations" options={{ title: 'Locations' }} />
      <Tabs.Screen name="episodes" options={{ title: 'Episodes' }} />
    </Tabs>
  );
}