// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FFA500',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 60,
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
      <Tabs.Screen name="Servicios" options={{ title: 'Servicios' }} />
      <Tabs.Screen name="casas" options={{ title: 'Casas' }} />
      <Tabs.Screen name="nosotros" options={{ title: 'Nosotros' }} />
      <Tabs.Screen name="contacto" options={{ title: 'Contacto' }} />
    </Tabs>
  );
}