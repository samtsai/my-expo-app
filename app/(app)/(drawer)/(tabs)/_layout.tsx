import { Tabs } from 'expo-router';

import { TabBarIcon } from '~/components/TabBarIcon';
import { ThemeToggle } from '~/components/ThemeToggle';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          // headerRight: () => <ThemeToggle />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          // headerRight: () => <ThemeToggle />,
        }}
      />
    </Tabs>
  );
}
