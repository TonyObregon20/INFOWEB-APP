// app/(tabs)/nosotros.tsx
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NosotrosScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Encabezado grande con background color similar a la referencia */}
      <View style={styles.headerWrap}>
        <View style={styles.headerInner}>
          <Text style={styles.title}>Nosotros</Text>
          <Text style={styles.lead}>Somos un equipo especializado en la organización de bodas, eventos corporativos y celebraciones. Cuidamos cada detalle para que tu evento sea impecable.</Text>

          <View style={styles.actionsRow}>
              <TouchableOpacity style={styles.ctaPrimary} onPress={() => router.push('/contacto')}>
                <Text style={styles.ctaPrimaryTextDark}>Quiero cotizar</Text>
              </TouchableOpacity>
            <TouchableOpacity style={styles.ctaOutline} onPress={() => Linking.openURL('https://wa.me/51961212121')}>
              <Text style={styles.ctaOutlineText}>Escríbenos por WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Card: Nuestra historia */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Nuestra historia</Text>
        <Text style={styles.cardText}>Nacimos con el propósito de crear experiencias memorables. Combinamos creatividad, planificación y una red de proveedores confiables para diseñar eventos únicos a la medida.</Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Asesoría integral y personalizada</Text>
          <Text style={styles.listItem}>• Gestión de proveedores y logística completa</Text>
          <Text style={styles.listItem}>• Montaje y coordinación el día del evento</Text>
        </View>
      </View>

      {/* Stats cards */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Lo que nos define</Text>
        <View style={styles.pillsContainer}>
          <Text style={styles.pill}>Compromiso</Text>
          <Text style={styles.pill}>Creatividad</Text>
          <Text style={styles.pill}>Puntualidad</Text>
          <Text style={styles.pill}>Transparencia</Text>
        </View>
        <View style={styles.valuesContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>+120</Text>
            <Text style={styles.statLabel}>Eventos realizados</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>+60</Text>
            <Text style={styles.statLabel}>Bodas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>+50</Text>
            <Text style={styles.statLabel}>Corporativos</Text>
          </View>
        </View>
      </View>

      {/* Gallery (carousel) */}
      <Text style={styles.sectionTitle}>Algunos de nuestros momentos</Text>
      <View style={styles.gallery}>
        {/* Carousel */}
        <Carousel />
      </View>

      {/* CTA footer card */}
      <View style={styles.cardFooter}>
        <Text style={styles.cardFooterTitle}>¿Listo para tu evento?</Text>
        <Text style={styles.cardFooterText}>Cuéntanos tu idea y armamos una propuesta a medida.</Text>
        <TouchableOpacity style={styles.ctaPrimaryWide} onPress={() => Linking.openURL('https://wa.me/51961212121')}>
          <Text style={styles.ctaPrimaryText}>Contactar por WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 30 },
  content: { paddingBottom: 40 },
  headerWrap: { backgroundColor: '#F4B36A', paddingBottom: 18 },
  headerInner: { paddingHorizontal: 16, paddingTop: 28, paddingBottom: 20 },
  title: { fontSize: 28, fontWeight: '700', color: '#3a2b1f', marginBottom: 8 },
  lead: { fontSize: 15, color: '#4b3a2d', lineHeight: 22, marginBottom: 14, textAlign: 'justify' },
  actionsRow: { flexDirection: 'row', gap: 10 },
  ctaPrimary: { backgroundColor: '#fff', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 999, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, elevation: 3, marginRight: 10 },
  ctaPrimaryTextDark: { color: '#3a2b1f', fontWeight: '700' },
  ctaOutline: { borderWidth: 1, borderColor: '#fff', paddingVertical: 12, paddingHorizontal: 18, borderRadius: 999, backgroundColor: 'transparent' },
  ctaOutlineText: { color: '#fff', fontWeight: '700' },

  card: { backgroundColor: '#fff', marginHorizontal: 16, marginTop: 16, padding: 16, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#2b2b2b', marginBottom: 8 },
  cardText: { color: '#555', lineHeight: 20, marginBottom: 10, textAlign: 'justify' },
  list: { marginTop: 6 },
  listItem: { color: '#555', marginBottom: 6 },

  valuesContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  statCard: { flex: 1, backgroundColor: '#faf6f2', padding: 14, borderRadius: 10, alignItems: 'center', marginHorizontal: 6 },
  statNumber: { fontSize: 20, fontWeight: '800', color: '#dd8b3a' },
  statLabel: { fontSize: 12, color: '#6b6b6b', marginTop: 6, textAlign: 'center' },

  sectionTitle: { fontSize: 16, fontWeight: '700', marginHorizontal: 16, marginTop: 18, color: '#2b2b2b' },
  gallery: { paddingHorizontal: 16, marginTop: 10 },
  galleryImage: { width: '100%', height: 160, borderRadius: 12, marginBottom: 12, backgroundColor: '#eee' },
  galleryPlaceholder: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f3f3' },
  placeholderText: { color: '#999' },
  cardFooter: { backgroundColor: '#fff', margin: 16, borderRadius: 12, padding: 16, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, elevation: 2 },
  cardFooterTitle: { fontSize: 18, fontWeight: '700', marginBottom: 6 },
  cardFooterText: { color: '#666', marginBottom: 12, textAlign: 'center' },
  ctaPrimaryWide: { backgroundColor: '#3a2b1f', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8 },
  ctaPrimaryText: { color: '#fff', fontWeight: '700' },
  /* carousel dots */
  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ddd', marginHorizontal: 4 },
  dotActive: { backgroundColor: '#dd8b3a' },
  pillsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 8 },
  pill: { backgroundColor: '#faf6f2', paddingVertical: 8, borderRadius: 16, color: '#3a2b1f', textAlign: 'center', width: '48%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6, marginBottom: 8 },
});
// Simple Carousel component (local, no extra deps)
function Carousel() {
  const images = [
    require('../../assets/images/boda1.jpeg'),
    require('../../assets/images/corporativo1.jpg'),
  ];
  const [active, setActive] = useState(0);
  const ref = useRef<ScrollView | null>(null);
  const width = Dimensions.get('window').width - 32; // account for horizontal padding
  const activeRef = useRef(0);

  useEffect(() => {
    const id = setInterval(() => {
      const next = (activeRef.current + 1) % images.length;
      ref.current?.scrollTo({ x: next * width, animated: true });
      activeRef.current = next;
      setActive(next);
    }, 4000);
    return () => clearInterval(id);
  }, [width, images.length]);

  const onMomentum = (e: any) => {
    const x = e.nativeEvent.contentOffset.x;
    const idx = Math.round(x / width);
    activeRef.current = idx;
    setActive(idx);
  };

  return (
    <>
      <ScrollView
        ref={ref}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentum}
      >
        {images.map((src, i) => (
          <Image key={i} source={src} style={[styles.galleryImage, { width }]} />
        ))}
      </ScrollView>
      <View style={styles.dots}>
        {images.map((_, i) => (
          <View key={i} style={[styles.dot, i === active && styles.dotActive]} />
        ))}
      </View>
    </>
  );
}