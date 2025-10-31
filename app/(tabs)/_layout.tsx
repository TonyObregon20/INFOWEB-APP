// app/(tabs)/_layout.tsx
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ICON_MAP: Record<string, string> = {
  index: 'grid-outline',
  Servicios: 'star-outline',
  casas: 'home-outline',
  nosotros: 'people-outline',
  contacto: 'mail-outline',
};

function TabIcon({ name, color }: { name: string; color: string }) {
  const iconName = ICON_MAP[name] ?? 'ellipse-outline';
  return (
    <View style={styles.iconWrap}>
      <Ionicons name={iconName as any} size={22} color={color} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#DD8B3A',
        tabBarInactiveTintColor: '#8a8a8a',
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 68,
          borderTopWidth: 0,
          paddingTop: 6,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 6,
          elevation: 10,
        },
        headerShown: false,
        tabBarIcon: ({ color }) => <TabIcon name={route.name} color={color} />,
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Inicio' }} />
      <Tabs.Screen name="Servicios" options={{ title: 'Servicios' }} />
      <Tabs.Screen name="casas" options={{ title: 'Casas' }} />
      <Tabs.Screen name="nosotros" options={{ title: 'Nosotros' }} />
      <Tabs.Screen name="contacto" options={{ title: 'Contacto' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrap: { alignItems: 'center', justifyContent: 'center' },
  icon: { fontSize: 20 },
});