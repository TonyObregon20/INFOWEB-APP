import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { API_BASE_URL } from '@/constants/api';
import { getSelectedService } from '@/utils/selectedService';

export const options = {
  headerShown: false,
};

export default function ModalServicioScreen() {
  const [servicio, setServicio] = useState<any | null>(null);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const selected = getSelectedService();
    setServicio(selected);
  }, []);

  if (!servicio) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>No hay datos disponibles</Text>
      </View>
    );
  }

  const getCoverImageUrl = (imageId: string | null | undefined): string | null => {
    if (!imageId) return null;
    return `${API_BASE_URL}/api/images/${imageId}`;
  };

  const mainImageUrl = getCoverImageUrl(servicio.images?.[imageIndex]?.imageId || servicio.images?.[0]?.imageId);
  const categoria = servicio.category || 'Servicio';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>← VOLVER A SERVICIOS</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Hero Image con Gradiente y Título */}
        <View style={styles.heroContainer}>
          {mainImageUrl && (
            <Image
              source={{ uri: mainImageUrl }}
              style={styles.heroImage}
              resizeMode="cover"
            />
          )}
          
          {/* Overlay Gradiente */}
          <View style={styles.heroOverlay} />
          
          {/* Categoría Badge */}
          <View style={styles.categoryBadgeHero}>
            <Text style={styles.categoryIconHero}>✦</Text>
            <Text style={styles.categoryTextHero}>{categoria}</Text>
          </View>

          {/* Título Superpuesto */}
          <View style={styles.heroTitle}>
            <Text style={styles.heroTitleText}>{servicio.name}</Text>
          </View>
        </View>

        {/* Galería de miniaturas */}
        {servicio.images && servicio.images.length > 1 && (
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.galeryContainer}
            contentContainerStyle={styles.galeryContent}
          >
            {servicio.images.map((img: any, idx: number) => (
              <TouchableOpacity 
                key={idx}
                onPress={() => setImageIndex(idx)}
                style={[styles.thumbnail, imageIndex === idx && styles.thumbnailActive]}
              >
                <Image
                  source={{ uri: getCoverImageUrl(img.imageId) }}
                  style={styles.thumbnailImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Contenido Principal */}
        <View style={styles.contentMain}>
          {/* Rango de capacidad y Categoría */}
          <View style={styles.quickInfo}>
            <View style={styles.quickInfoItem}>
              <Text style={styles.quickInfoLabel}>CAPACIDAD</Text>
              <Text style={styles.quickInfoValue}>
                {servicio.capacityMin || 0} - {servicio.capacityMax || 0} P.
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.quickInfoItem}>
              <Text style={styles.quickInfoLabel}>TIPO</Text>
              <Text style={styles.quickInfoValue}>{categoria}</Text>
            </View>
          </View>

          {/* Sobre el Servicio */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SOBRE EL SERVICIO</Text>
            <Text style={styles.sectionDescription}>{servicio.description || 'Descripción no disponible'}</Text>
          </View>

          {/* Características */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CARACTERÍSTICAS</Text>
            <View style={styles.badgesContainer}>
              {[
                'Diseño personalizado',
                'Coordinación profesional',
                'Atención a detalles',
                'Servicio premium'
              ].map((feature, idx) => (
                <View key={idx} style={styles.badge}>
                  <Text style={styles.badgeText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Detalles */}
          <View style={styles.historicalReview}>
            <Text style={styles.reviewTitle}>DETALLES DEL SERVICIO</Text>
            <Text style={styles.reviewText}>
              Servicio completo diseñado para crear momentos inolvidables en tu evento. Adaptamos cada detalle según tus necesidades específicas.
            </Text>
          </View>

          {/* Precio */}
          <View style={styles.priceSection}>
            <Text style={styles.priceLabel}>DESDE</Text>
            <Text style={styles.priceValue}>
              S/ {(servicio.basePrice || 0).toLocaleString()}
            </Text>
          </View>

          {/* Botón de Cotización */}
          <TouchableOpacity 
            style={styles.cotizarButton}
            onPress={() => router.push('/(tabs)/contacto')}
          >
            <Text style={styles.cotizarButtonText}>COTIZAR AHORA</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  backButton: {
    paddingVertical: 8,
  },
  backText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#bbb',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-Bold',
  },
  contentContainer: {
    paddingBottom: 40,
  },
  heroContainer: {
    position: 'relative',
    height: 400,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
  },
  categoryBadgeHero: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  categoryIconHero: {
    fontSize: 10,
    color: '#D4AF37',
  },
  categoryTextHero: {
    fontSize: 9,
    fontWeight: '700',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    fontFamily: 'Montserrat-Bold',
  },
  heroTitle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  heroTitleText: {
    fontSize: 36,
    fontWeight: '300',
    color: '#ffffff',
    fontFamily: 'CormorantGaramond-Light',
    letterSpacing: 0.5,
  },
  galeryContainer: {
    marginTop: 16,
  },
  galeryContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  thumbnailActive: {
    borderColor: '#D4AF37',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  contentMain: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  quickInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  quickInfoItem: {
    flex: 1,
    alignItems: 'center',
  },
  quickInfoLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
    fontFamily: 'Montserrat-Bold',
  },
  quickInfoValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    fontFamily: 'Montserrat-Bold',
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 12,
    fontFamily: 'Montserrat-Bold',
  },
  sectionDescription: {
    fontSize: 14,
    fontWeight: '300',
    color: '#666',
    lineHeight: 22,
    fontFamily: 'CormorantGaramond-Light',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badge: {
    backgroundColor: '#FDFBF7',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  badgeText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    fontFamily: 'Montserrat-Bold',
  },
  historicalReview: {
    backgroundColor: '#1a1a1a',
    borderRadius: 24,
    padding: 20,
    marginBottom: 28,
  },
  reviewTitle: {
    fontSize: 9,
    fontWeight: '700',
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 12,
    fontFamily: 'Montserrat-Bold',
  },
  reviewText: {
    fontSize: 13,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.6)',
    fontStyle: 'italic',
    lineHeight: 20,
    fontFamily: 'CormorantGaramond-Light',
  },
  priceSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  priceLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#bbb',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
    fontFamily: 'Montserrat-Bold',
  },
  priceValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    fontFamily: 'Montserrat-Bold',
  },
  cotizarButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center',
  },
  cotizarButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontFamily: 'Montserrat-Bold',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
    color: '#999',
  },
});
