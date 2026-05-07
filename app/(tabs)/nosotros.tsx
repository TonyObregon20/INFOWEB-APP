// app/(tabs)/nosotros.tsx
import AppHeader from '@/components/app-header';
import { CormorantGaramond_700Bold, useFonts } from '@expo-google-fonts/cormorant-garamond';
import { Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

SplashScreen.preventAutoHideAsync();

export default function NosotrosScreen() {
  const [fontsLoaded, fontError] = useFonts({
    CormorantGaramond_700Bold,
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  SplashScreen.hideAsync();

  return (
    <View style={styles.container}>
      <AppHeader />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FDFBF7' },
  scroll: { flex: 1 },
  content: { paddingBottom: 40 },
  
  // Header Naranja
  headerWrap: { backgroundColor: '#E67E22', paddingBottom: 24, paddingTop: 0 },
  headerInner: { paddingHorizontal: 16, paddingTop: 24, paddingBottom: 32 },
  title: { fontSize: 36, fontWeight: '700', color: '#FFFFFF', marginBottom: 12, fontFamily: 'CormorantGaramond_700Bold' },
  lead: { fontSize: 16, color: '#FFFFFF', lineHeight: 24, marginBottom: 20, textAlign: 'left', opacity: 0.9, fontFamily: 'Montserrat_400Regular' },
  actionsRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  ctaPrimary: { backgroundColor: '#FFFFFF', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 28, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 8, elevation: 4 },
  ctaPrimaryTextDark: { color: '#1A1A1A', fontWeight: '700', fontSize: 14, fontFamily: 'Montserrat_700Bold', textTransform: 'uppercase', letterSpacing: 0.5 },
  ctaOutline: { borderWidth: 2, borderColor: 'rgba(255, 255, 255, 0.4)', paddingVertical: 12, paddingHorizontal: 22, borderRadius: 28, backgroundColor: 'transparent' },
  ctaOutlineText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14, fontFamily: 'Montserrat_700Bold', textTransform: 'uppercase', letterSpacing: 0.5 },

  // Tarjetas
  card: { backgroundColor: '#FFFFFF', marginHorizontal: 16, marginTop: 24, padding: 20, borderRadius: 32, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 },
  cardTitle: { fontSize: 28, fontWeight: '700', color: '#1A1A1A', marginBottom: 12, fontFamily: 'CormorantGaramond_700Bold' },
  cardText: { color: '#4B4B4B', lineHeight: 22, marginBottom: 14, textAlign: 'left', fontFamily: 'Montserrat_400Regular', fontSize: 15 },
  list: { marginTop: 12 },
  listItem: { color: '#4B4B4B', marginBottom: 8, fontSize: 15, fontFamily: 'Montserrat_400Regular' },

  // Stats Container
  valuesContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, gap: 8 },
  statCard: { flex: 1, backgroundColor: '#FDFBF7', padding: 16, borderRadius: 20, alignItems: 'center', borderWidth: 1, borderColor: '#F3F4F6' },
  statNumber: { fontSize: 28, fontWeight: '800', color: '#E67E22', fontFamily: 'Montserrat_700Bold' },
  statLabel: { fontSize: 11, color: '#6B6B6B', marginTop: 8, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5, fontFamily: 'Montserrat_400Regular' },

  // Pills/Tags
  sectionTitle: { fontSize: 24, fontWeight: '700', marginHorizontal: 16, marginTop: 28, color: '#1A1A1A', fontFamily: 'CormorantGaramond_700Bold' },
  pillsContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginHorizontal: 16, marginTop: 16, gap: 12 },
  pill: { backgroundColor: '#FDFBF7', paddingVertical: 12, paddingHorizontal: 20, borderRadius: 24, color: '#1A1A1A', textAlign: 'center', fontSize: 14, fontWeight: '600', borderWidth: 1, borderColor: '#F3F4F6', fontFamily: 'Montserrat_700Bold' },

  // Gallery
  gallery: { paddingHorizontal: 0, marginTop: 16 },
  galleryImage: { width: '100%', height: 200, borderRadius: 24, marginBottom: 16, backgroundColor: '#eee', marginHorizontal: 16 },
  galleryPlaceholder: { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f3f3' },
  placeholderText: { color: '#999' },

  // Footer CTA
  cardFooter: { backgroundColor: '#FFFFFF', margin: 16, borderRadius: 32, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 12, elevation: 3 },
  cardFooterTitle: { fontSize: 26, fontWeight: '700', marginBottom: 10, color: '#1A1A1A', fontFamily: 'CormorantGaramond_700Bold' },
  cardFooterText: { color: '#6B6B6B', marginBottom: 18, textAlign: 'center', fontSize: 15, fontFamily: 'Montserrat_400Regular', lineHeight: 20 },
  ctaPrimaryWide: { backgroundColor: '#1A1A1A', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 28, minWidth: 240 },
  ctaPrimaryText: { color: '#FFFFFF', fontWeight: '700', fontSize: 14, textAlign: 'center', textTransform: 'uppercase', letterSpacing: 0.5, fontFamily: 'Montserrat_700Bold' },

  // Carousel dots
  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: 12, marginBottom: 24 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#E0E0E0', marginHorizontal: 6 },
  dotActive: { backgroundColor: '#E67E22' },
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