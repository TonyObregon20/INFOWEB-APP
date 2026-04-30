import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../constants/api';

interface Extra {
  _id: string;
  name: string;
  description: string;
  price: number;
  images?: Array<{
    url: string;
    isCover: boolean;
  }>;
  coverImage?: {
    url: string;
    isCover: boolean;
  };
}

export default function ExtrasScreen() {
  const [extras, setExtras] = useState<Extra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExtras();
  }, []);

  const fetchExtras = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/extras`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: No se pudieron cargar los extras`);
      }
      
      const data = await response.json();
      console.log('Respuesta de extras:', data);
      
      // Los datos vienen como array directo
      const extrasArray = Array.isArray(data) ? data : [];
      
      setExtras(extrasArray);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Error fetching extras:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCoverImageUrl = (extra: Extra): string | null => {
    // Primero intenta usar coverImage virtual
    let url = extra.coverImage?.url;
    
    // Luego intenta la primera imagen marcada como cover
    if (!url) {
      const coverImg = extra.images?.find(img => img.isCover);
      url = coverImg?.url;
    }
    
    // Finalmente la primera imagen disponible
    if (!url && extra.images?.[0]?.url) {
      url = extra.images[0].url;
    }
    
    if (!url) return null;
    
    // Si ya es una URL completa, retornarla tal cual
    if (url.startsWith('http')) {
      return url;
    }
    
    // Si es una ruta relativa (/api/images/:id), construir URL completa
    return `${API_BASE_URL}${url}`;
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#e67e22" />
        <Text style={styles.loadingText}>Cargando extras...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>⚠️ {error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchExtras}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EXTRAS</Text>
        <Text style={styles.headerSubtitle}>Servicios complementarios para tu evento</Text>
      </View>

      {/* Grid de extras */}
      {extras.length > 0 ? (
        <View style={styles.extrasGrid}>
          {extras.map((extra) => {
            const coverImageUrl = getCoverImageUrl(extra);
            return (
              <TouchableOpacity key={extra._id} style={styles.extraItem}>
                {/* Imagen de portada si existe */}
                {coverImageUrl ? (
                  <Image
                    source={{ uri: coverImageUrl }}
                    style={styles.extraImage}
                    resizeMode="cover"
                    onError={(error) => console.warn(`Error cargando imagen: ${coverImageUrl}`, error)}
                  />
                ) : (
                  <View style={styles.extraPlaceholder}>
                    <Text style={styles.placeholderIcon}>✨</Text>
                  </View>
                )}

                {/* Contenido */}
                <View style={styles.extraContent}>
                  <Text style={styles.extraName} numberOfLines={2}>{extra.name}</Text>
                  
                  {extra.description && (
                    <Text style={styles.extraDescription} numberOfLines={2}>
                      {extra.description}
                    </Text>
                  )}
                  
                  <Text style={styles.extraPrice}>
                    ${extra.price?.toLocaleString('es-CO') || '0'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay extras disponibles</Text>
        </View>
      )}

      {/* CTA */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>¿Necesitas más información?</Text>
        <TouchableOpacity 
          style={styles.ctaButton}
          onPress={() => router.push('/contacto')}
        >
          <Text style={styles.ctaButtonText}>CONTACTAR</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#999',
  },
  header: {
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#999',
  },
  extrasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  extraItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  extraImage: {
    width: '100%',
    height: 120,
  },
  extraPlaceholder: {
    width: '100%',
    height: 120,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 32,
  },
  extraContent: {
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  extraName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  extraDescription: {
    fontSize: 11,
    color: '#999',
    marginBottom: 6,
  },
  extraPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#e67e22',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
  ctaSection: {
    backgroundColor: '#1a1a1a',
    marginHorizontal: 16,
    marginVertical: 24,
    paddingVertical: 32,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 16,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#e67e22',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
  },
  ctaButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  errorText: {
    fontSize: 16,
    color: '#e67e22',
    marginBottom: 16,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#e67e22',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  retryButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
});