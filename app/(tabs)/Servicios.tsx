// app/(tabs)/servicios.tsx
import AppHeader from '@/components/app-header';
import { API_BASE_URL } from '@/constants/api';
import { setSelectedService } from '@/utils/selectedService';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

// Define el tipo de un servicio
interface Service {
  _id: string;
  name: string;
  category: string;
  basePrice: number;
  description: string;
  capacityMin: number;
  capacityMax: number;
  images: {
    imageId: string;
    alt?: string;
    isCover?: boolean;
    order?: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

// ⚠️ Reemplaza esta URL con la tuya real (usa tu IP local en desarrollo)
// const API_BASE_URL = 'http://192.168.18.29:5001'; // ← CAMBIA ESTO
// const API_BASE_URL = 'http://172.20.100.49:5000';

// const API_BASE_URL = 'http://192.168.0.181:5000';


export default function ServiciosScreen() {
  const { width } = useWindowDimensions();
  const isSmall = width < 700;
  const [servicios, setServicios] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServicios();
  }, []);

  const fetchServicios = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/services`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setServicios(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido al cargar los servicios');
      }
    } finally {
      setLoading(false);
    }
  };

  const getCoverImageUrl = (servicio: Service): string | null => {
    let imageId = servicio.images?.[0]?.imageId;
    if (!imageId) return null;
    return `${API_BASE_URL}/api/images/${imageId}`;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#D4AF37" style={{ marginTop: 100 }} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity onPress={fetchServicios} style={styles.retryButton}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.contentContainer}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Nuestros Servicios</Text>
      </View>

      {/* Grid de servicios */}
      <View style={isSmall ? styles.gridSingle : styles.gridDouble}>
        {servicios.map((servicio) => {
          const coverImageUrl = getCoverImageUrl(servicio);
          const categoria = servicio.category || 'Servicio';

          return (
            <View 
              key={servicio._id} 
              style={styles.card}
            >
              {/* Imagen con Badge de categoría */}
              <View style={styles.imageContainer}>
                {coverImageUrl ? (
                  <Image
                    source={{ uri: coverImageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={[styles.image, { backgroundColor: '#e6e6e6', justifyContent: 'center', alignItems: 'center' }]}>
                    <Text style={{ color: '#999' }}>Sin imagen</Text>
                  </View>
                )}

                {/* Badge de categoría flotante */}
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryIcon}>✦</Text>
                  <Text style={styles.categoryText}>{categoria}</Text>
                </View>
              </View>

              {/* Información */}
              <View style={styles.info}>
                <Text style={styles.serviceName}>{servicio.name}</Text>

                {/* Rango de capacidad */}
                <View style={styles.capacityRow}>
                  <Text style={styles.capacityIcon}>👥</Text>
                  <Text style={styles.capacityText}>
                    {servicio.capacityMin || 0} - {servicio.capacityMax || 0} PERSONAS
                  </Text>
                </View>

                {/* Botón principal */}
                <TouchableOpacity 
                  style={styles.exploreButton}
                  onPress={() => {
                    setSelectedService(servicio);
                    router.push('/modalServicio');
                  }}
                  activeOpacity={0.85}
                >
                  <Text style={styles.exploreButtonText}>EXPLORAR SERVICIO</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFBF7',
  },
  scroll: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    color: '#1a1a1a',
    fontFamily: 'CormorantGaramond-Light',
    letterSpacing: 0.5,
  },
  gridSingle: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  gridDouble: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingTop: 24,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 40,
    overflow: 'hidden',
    marginBottom: 24,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 40,
  },
  image: {
    width: '100%',
    height: 280,
    backgroundColor: '#f0f0f0',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 10,
    color: '#D4AF37',
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1a1a1a',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'Montserrat-Bold',
  },
  info: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  serviceName: {
    fontSize: 22,
    fontWeight: '400',
    color: '#1a1a1a',
    marginBottom: 16,
    fontFamily: 'CormorantGaramond-Light',
    letterSpacing: 0.3,
  },
  capacityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  capacityIcon: {
    fontSize: 14,
  },
  capacityText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#bbb',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'Montserrat-Bold',
  },
  exploreButton: {
    backgroundColor: '#E67E22',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#E67E22',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  exploreButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    fontFamily: 'Montserrat-Bold',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#D4AF37',
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 24,
    marginTop: 20,
    marginHorizontal: 50,
    alignItems: 'center',
  },
  retryText: {
    color: '#fff',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 0.5,
  },
});