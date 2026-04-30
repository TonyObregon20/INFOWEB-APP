import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { API_BASE_URL } from '../../constants/api';
import { setSelectedExtra } from '@/utils/selectedExtra';

interface ExtraImage {
  url?: string;
  imageId?: string;
  isCover?: boolean;
}

interface Extra {
  _id: string;
  name: string;
  description: string;
  price: number;
  images?: ExtraImage[];
  coverImage?: ExtraImage;
}

const toAbsoluteUrl = (url?: string | null): string | null => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) return `${API_BASE_URL}${url}`;
  return `${API_BASE_URL}/${url}`;
};

const resolveImageUrl = (image?: ExtraImage | null): string | null => {
  if (!image) return null;
  if (image.imageId) return `${API_BASE_URL}/api/images/${image.imageId}`;
  return toAbsoluteUrl(image.url);
};

const buildImageUrls = (extra: Extra): string[] => {
  const urls: string[] = [];
  const add = (url?: string | null) => {
    const normalized = toAbsoluteUrl(url);
    if (normalized && !urls.includes(normalized)) {
      urls.push(normalized);
    }
  };

  add(resolveImageUrl(extra.coverImage) ?? extra.coverImage?.url ?? null);
  extra.images?.forEach((img) => {
    add(resolveImageUrl(img) ?? img.url ?? null);
  });

  return urls;
};

function ExtraCarousel({ imageUrls, imageHeight }: { imageUrls: string[]; imageHeight: number }) {
  const [active, setActive] = useState(0);
  const [width, setWidth] = useState(0);
  const displayImages = imageUrls.length === 1 ? [imageUrls[0], imageUrls[0]] : imageUrls;

  if (displayImages.length === 0) {
    return (
      <View style={[styles.extraPlaceholder, { height: imageHeight }]}>
        <Text style={styles.placeholderIcon}>✨</Text>
      </View>
    );
  }

  const handleLayout = (event: any) => {
    const nextWidth = Math.round(event.nativeEvent.layout.width);
    if (nextWidth && nextWidth !== width) {
      setWidth(nextWidth);
    }
  };

  const syncActiveIndex = (event: any) => {
    if (!width) return;
    const x = event.nativeEvent.contentOffset.x;
    const idx = Math.round(x / width);
    const clamped = Math.max(0, Math.min(idx, displayImages.length - 1));
    if (clamped !== active) setActive(clamped);
  };

  return (
    <View onLayout={handleLayout}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={syncActiveIndex}
        onScroll={syncActiveIndex}
        scrollEventThrottle={16}
        style={[styles.carousel, width ? { width } : null]}
      >
        {displayImages.map((uri, i) => (
          <Image
            key={`${uri}-${i}`}
            source={{ uri }}
            style={[styles.extraImage, { height: imageHeight }, width ? { width } : null]}
            resizeMode="cover"
            onError={(error) => console.warn(`Error cargando imagen: ${uri}`, error)}
          />
        ))}
      </ScrollView>
      {displayImages.length > 1 ? (
        <View style={styles.carouselDots}>
          {displayImages.map((_, i) => (
            <View key={`dot-${i}`} style={[styles.carouselDot, i === active && styles.carouselDotActive]} />
          ))}
        </View>
      ) : null}
    </View>
  );
}

export default function ExtrasScreen() {
  const [extras, setExtras] = useState<Extra[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { width } = useWindowDimensions();
  const isSingleColumn = width < 700;
  const imageHeight = isSingleColumn ? 160 : 120;

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
        <View style={[styles.extrasGrid, isSingleColumn && styles.extrasGridSingle]}>
          {extras.map((extra) => {
            const imageUrls = buildImageUrls(extra);
            const descriptionText = extra.description?.trim() ? extra.description : ' ';
            return (
              <View key={extra._id} style={[styles.extraItem, isSingleColumn && styles.extraItemSingle]}>
                <ExtraCarousel imageUrls={imageUrls} imageHeight={imageHeight} />

                {/* Contenido */}
                <View style={styles.extraBody}>
                  <View style={styles.extraContent}>
                    <Text style={styles.extraName} numberOfLines={2}>{extra.name}</Text>
                    <Text style={styles.extraDescription} numberOfLines={2}>
                      {descriptionText}
                    </Text>
                    <Text style={styles.extraPrice}>
                      ${extra.price?.toLocaleString('es-CO') || '0'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.detailButton}
                    onPress={() => {
                      setSelectedExtra(extra);
                      router.push('/modalExtra');
                    }}
                  >
                    <Text style={styles.detailButtonText}>VER DETALLE</Text>
                  </TouchableOpacity>
                </View>
              </View>
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
  extrasGridSingle: {
    paddingHorizontal: 16,
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
  extraItemSingle: {
    width: '100%',
    marginBottom: 16,
  },
  carousel: {
    width: '100%',
  },
  extraImage: {
    width: '100%',
    height: 120,
  },
  carouselDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 6,
    marginBottom: 2,
  },
  carouselDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ddd',
    marginHorizontal: 3,
  },
  carouselDotActive: {
    backgroundColor: '#e67e22',
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
  extraBody: {
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  extraContent: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexGrow: 1,
  },
  extraName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
    lineHeight: 16,
    minHeight: 32,
  },
  extraDescription: {
    fontSize: 11,
    color: '#999',
    marginBottom: 6,
    lineHeight: 14,
    minHeight: 28,
  },
  extraPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#e67e22',
  },
  detailButton: {
    backgroundColor: '#e67e22',
    paddingVertical: 10,
    alignItems: 'center',
  },
  detailButtonText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.8,
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