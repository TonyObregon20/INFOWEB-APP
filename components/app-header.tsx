import { DancingScript_400Regular, useFonts } from '@expo-google-fonts/dancing-script';
import { Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AppHeader() {
  const [fontsLoaded] = useFonts({
    DancingScript_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoMain}>Del Castillo</Text>
          <Text style={styles.logoSub}>EVENTOS</Text>
        </View>

        {/* Botón Cotizar */}
        <TouchableOpacity
          style={styles.cotizarButton}
          onPress={() => router.push('/(tabs)/contacto')}
          activeOpacity={0.8}
        >
          <Text style={styles.cotizarText}>COTIZAR AHORA</Text>
        </TouchableOpacity>
      </View>

      {/* Línea separadora */}
      <View style={styles.divider} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    paddingTop: 12,
    paddingBottom: 0,
    zIndex: 1000,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  logoMain: {
    fontSize: 20,
    fontWeight: '400',
    color: '#1a1a1a',
    fontFamily: 'DancingScript_400Regular',
    letterSpacing: 0.5,
  },
  logoSub: {
    fontSize: 8,
    fontWeight: '800',
    color: '#1a1a1a',
    letterSpacing: 2,
    marginTop: -2,
    fontFamily: 'Montserrat_700Bold',
  },
  cotizarButton: {
    backgroundColor: '#E67E22',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 24,
    minWidth: 140,
    alignItems: 'center',
  },
  cotizarText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontFamily: 'Montserrat_700Bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
});
