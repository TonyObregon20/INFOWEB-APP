// app/(tabs)/casas.tsx
import AppHeader from '@/components/app-header';
import { API_BASE_URL } from '@/constants/api';
import { setSelectedCasa } from '@/utils/selectedCasa';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

// Define el tipo de una casa
interface Casa {
  _id: string;
  nombre: string;
  direccion: string;
  areaM2: number;
  capacidad: number;
  horaFinEvento: string;
  detalles: string;
  precioDesde: number;
  imagenes: {
    url: string;
    thumb?: string;
    publicId?: string;
    isCover?: boolean;
    _id?: string;
  }[];
  activa: boolean;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// Reemplaza esta URL con la tuya real (usa tu IP local en desarrollo)
// const API_BASE_URL = 'http://192.168.18.29:5001'; // ← CAMBIA ESTO

// Direccion IPv4:port_backend
// const API_BASE_URL = 'http://172.20.100.49:5000';

// const API_BASE_URL = 'http://192.168.0.181:5000';


export default function CasasScreen() {
  const { width } = useWindowDimensions();
  const isSmall = width < 700;
  const [casas, setCasas] = useState<Casa[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCasas();
  }, []);

  const fetchCasas = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/api/casas`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Casa[] = await response.json();
      setCasas(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido al cargar las casas');
      }
    } finally {
      setLoading(false);
    }
  };

  const getCoverImageUrl = (casa: Casa): string | null => {
    let url = casa.imagenes?.[0]?.url;
    if (!url) return null;
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#e67e22" style={{ marginTop: 100 }} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity onPress={fetchCasas} style={styles.retryButton}>
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
        <Text style={styles.title}>Nuestras Casas</Text>
      </View>

      {/* Grid de casas */}
      <View style={isSmall ? styles.gridSingle : styles.gridDouble}>
        {casas.map((casa) => {
          const coverImageUrl = getCoverImageUrl(casa);
          const ubicacion = casa.direccion.split(',')[0] || casa.direccion;

          return (
            <View 
              key={casa._id} 
              style={styles.card}
            >
              {/* Imagen con Badge de ubicación */}
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

                {/* Badge de ubicación flotante */}
                <View style={styles.locationBadge}>
                  <Text style={styles.locationIcon}>📍</Text>
                  <Text style={styles.locationText}>{ubicacion}</Text>
                </View>
              </View>

              {/* Información */}
              <View style={styles.info}>
                <Text style={styles.casaName}>{casa.nombre}</Text>

                {/* Capacidad */}
                <View style={styles.capacityRow}>
                  <Text style={styles.capacityIcon}>👥</Text>
                  <Text style={styles.capacityText}>{casa.capacidad} PERSONAS</Text>
                </View>

                {/* Botón principal */}
                <TouchableOpacity 
                  style={styles.exploreButton}
                  onPress={() => {
                    setSelectedCasa(casa);
                    router.push('/modalCasa');
                  }}
                  activeOpacity={0.85}
                >
                  <Text style={styles.exploreButtonText}>EXPLORAR LOCACIÓN</Text>
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
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
    fontFamily: 'Montserrat-Bold',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
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
  locationBadge: {
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
  locationIcon: {
    fontSize: 12,
  },
  locationText: {
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
  casaName: {
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
    backgroundColor: '#e67e22',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#e67e22',
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
    color: '#e67e22',
    fontWeight: '600',
  },
  retryButton: {
    backgroundColor: '#e67e22',
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