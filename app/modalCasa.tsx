import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getSelectedCasa } from '@/utils/selectedCasa';

export default function ModalScreen() {
  const [casa, setCasa] = useState<any | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const selected = getSelectedCasa();
    setCasa(selected);
    setIndex(0);
  }, []);

  if (!casa) {
    return (
      <ThemedView style={styles.container}>
        <Text style={styles.loadingText}>No hay datos de la casa seleccionada.</Text>
      </ThemedView>
    );
  }

  const mainImage = casa.imagenes?.[index]?.url || casa.imagenes?.[0]?.url || undefined;

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
  
        <Image source={{ uri: mainImage }} style={styles.hero} />

        {/* Thumbnails */}
        <View style={styles.thumbsRow}>
          {casa.imagenes?.map((img: any, i: number) => (
            <TouchableOpacity key={i} onPress={() => setIndex(i)} style={styles.thumbWrap}>
              <Image source={{ uri: img.url }} style={[styles.thumb, i === index ? styles.thumbActive : null]} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoCardTop}>
            <ThemedText type="title">{casa.nombre}</ThemedText>
            <Text style={styles.address}>{casa.direccion}</Text>
          </View>

          <View style={styles.aboutSection}>
            <Text style={styles.sectionTitleSmall}>Acerca de este espacio</Text>
            <Text style={styles.description}>{casa.detalles}</Text>
          </View>

          <View style={styles.featuresRow}>
            <View style={styles.featureBox}>
              <MaterialIcons name="people" size={20} color="#dd8b3a" />
              <Text style={styles.featureLabel}>Capacidad</Text>
              <Text style={styles.featureValue}>{casa.capacidad ?? '—'} personas</Text>
            </View>
            <View style={styles.featureBox}>
              <FontAwesome5 name="bed" size={18} color="#dd8b3a" />
              <Text style={styles.featureLabel}>Habitaciones</Text>
              <Text style={styles.featureValue}>{casa.habitaciones ?? '—'}</Text>
            </View>
            <View style={styles.featureBox}>
              <MaterialIcons name="bathtub" size={20} color="#dd8b3a" />
              <Text style={styles.featureLabel}>Baños</Text>
              <Text style={styles.featureValue}>{casa.banos ?? casa.banios ?? '—'}</Text>
            </View>
            <View style={styles.featureBox}>
              <Ionicons name="car" size={20} color="#dd8b3a" />
              <Text style={styles.featureLabel}>Parking</Text>
              <Text style={styles.featureValue}>{casa.parking ?? '—'}</Text>
            </View>
          </View>

          <View style={styles.priceRowSimple}>
            <Text style={styles.priceLarge}>S/ {Number(casa.precioDesde ?? 0).toLocaleString()}</Text>
            <Text style={styles.priceNote}>por noche</Text>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 16 },
  loadingText: { textAlign: 'center', marginTop: 40, color: '#666' },
  hero: { width: '100%', height: 180, borderRadius: 12, marginBottom: 8 },
  thumbsRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  thumbWrap: { padding: 2 },
  thumb: { width: 60, height: 44, borderRadius: 6, opacity: 0.9 },
  thumbActive: { borderWidth: 2, borderColor: '#FFA500', opacity: 1 },
  infoCard: { backgroundColor: '#fff', padding: 12, borderRadius: 8 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 6, color: '#111' },
  address: { color: '#666', marginBottom: 10 },
  bullets: { marginBottom: 10 },
  bullet: { color: '#444', marginBottom: 4 },
  description: { color: '#333', marginBottom: 12 },
  price: { fontSize: 16, fontWeight: '700', color: '#FFA500' },
  /* new improved layout styles */
  infoContainer: { backgroundColor: '#fff', borderRadius: 16, marginTop: -12, paddingTop: 18, paddingHorizontal: 14, paddingBottom: 18, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 6, elevation: 2 },
  infoCardTop: { marginBottom: 8 },
  aboutSection: { marginTop: 6, marginBottom: 12 },
  sectionTitleSmall: { fontWeight: '700', marginBottom: 6, color: '#333' },
  featuresRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 8, marginBottom: 12 },
  featureBox: { backgroundColor: '#FFF4E6', width: '48%', borderRadius: 10, padding: 10, marginBottom: 8, alignItems: 'center' },
  featureIcon: { fontSize: 20, marginBottom: 6 },
  featureLabel: { fontSize: 12, color: '#6b6b6b' },
  featureValue: { fontWeight: '700', marginTop: 4, color: '#3a2b1f' },
  priceRowSimple: { marginTop: 12, alignItems: 'flex-start' },
  priceLarge: { fontSize: 20, fontWeight: '800', color: '#dd8b3a' },
  priceNote: { color: '#666' },
});
