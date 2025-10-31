import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

        <View style={styles.infoCard}>
          <ThemedText type="title">{casa.nombre}</ThemedText>
          <Text style={styles.address}>{casa.direccion}</Text>

          <View style={styles.bullets}>
            <Text style={styles.bullet}>• Área: {casa.areaM2} m²</Text>
            <Text style={styles.bullet}>• Capacidad: {casa.capacidad} personas</Text>
            <Text style={styles.bullet}>• Horario máx.: {casa.horaFinEvento}</Text>
          </View>

          <Text style={styles.description}>{casa.detalles}</Text>

          <Text style={styles.price}>Desde: S/ {Number(casa.precioDesde).toLocaleString()}</Text>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 16 },
  loadingText: { textAlign: 'center', marginTop: 40, color: '#666' },
  hero: { width: '100%', height: 260, borderRadius: 12, marginBottom: 12 },
  thumbsRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
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
});
