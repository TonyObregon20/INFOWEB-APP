import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const ICON_MAP: Record<string, string> = {
  index: 'star',
  Servicios: 'restaurant',
  casas: 'home',
  nosotros: 'people',
  contacto: 'call',
  extras: 'gift',
};

function TabIcon({ 
  name, 
  color,
  isActive
}: { 
  name: string; 
  color: string;
  isActive: boolean;
}) {
  const iconName = ICON_MAP[name] ?? 'ellipse-outline';
  return (
    <View style={styles.iconContainer}>
      {isActive && <View style={styles.navIndicator} />}
      <Ionicons 
        name={iconName as any} 
        size={24} 
        color={color}
        style={styles.icon}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#e67e22',
        tabBarInactiveTintColor: '#999999',
        tabBarShowLabel: true,
        tabBarLabelStyle: { 
          fontSize: 9,
          fontWeight: '700',
          marginTop: 6,
          letterSpacing: 0.8,
          textTransform: 'uppercase',
        },
        tabBarStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          height: 85,
          borderTopWidth: 0,
          paddingTop: 12,
          paddingBottom: 16,
          paddingHorizontal: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 20,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <TabIcon 
            name={route.name} 
            color={color}
            isActive={color === '#e67e22'}
          />
        ),
      })}
    >
      <Tabs.Screen 
        name="index" 
        options={{ title: 'Inicio' }} 
      />
      <Tabs.Screen 
        name="Servicios" 
        options={{ title: 'Servicios' }} 
      />
      <Tabs.Screen 
        name="casas" 
        options={{ title: 'Casas' }} 
      />
      <Tabs.Screen 
        name="nosotros" 
        options={{ title: 'Nosotros' }} 
      />
      <Tabs.Screen 
        name="contacto" 
        options={{ title: 'Contacto' }} 
      />
      <Tabs.Screen 
        name="extras" 
        options={{ title: 'Extras' }} 
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  icon: {
    marginVertical: 2,
  },
  navIndicator: {
    position: 'absolute',
    top: -12,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#e67e22',
    zIndex: 10,
  },
});