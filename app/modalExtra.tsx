import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';

import { ThemedView } from '@/components/themed-view';
import { API_BASE_URL } from '@/constants/api';
import { getSelectedExtra } from '@/utils/selectedExtra';

interface ExtraImage {
  url?: string;
  imageId?: string;
  isCover?: boolean;
}

interface Extra {
  _id: string;
  name: string;
  description?: string;
  price?: number;
  images?: ExtraImage[];
  coverImage?: ExtraImage;
}

const toAbsoluteUrl = (url?: string | null): string | null => {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  if (url.startsWith('/')) return `${API_BASE_URL}${url}`;
  return `${API_BASE_URL}/${url}`;
};

const resolveImage = (image?: ExtraImage | null): string | null => {
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

  add(resolveImage(extra.coverImage) ?? extra.coverImage?.url ?? null);
  extra.images?.forEach((img) => {
    add(resolveImage(img) ?? img.url ?? null);
  });

  return urls;
};

export default function ModalExtraScreen() {
  const [extra, setExtra] = useState<Extra | null>(null);
  const [active, setActive] = useState(0);
  const { width } = useWindowDimensions();
  const carouselWidth = Math.max(0, width - 32);

  useEffect(() => {
    const selected = getSelectedExtra();
    setExtra(selected);
    setActive(0);
  }, []);

  if (!extra) {
    return (
      <ThemedView style={styles.container}>
        <Text style={styles.loadingText}>No hay datos del extra seleccionado.</Text>
      </ThemedView>
    );
  }

  const imageUrls = buildImageUrls(extra);
  const displayImages = imageUrls.length === 1 ? [imageUrls[0], imageUrls[0]] : imageUrls;
  const hasImages = displayImages.length > 0;
  const priceLabel = typeof extra.price === 'number' && extra.price > 0
    ? `$${extra.price.toLocaleString('es-CO')}`
    : 'Precio a consultar';

  const syncActiveIndex = (event: any) => {
    if (!carouselWidth) return;
    const x = event.nativeEvent.contentOffset.x;
    const idx = Math.round(x / carouselWidth);
    const clamped = Math.max(0, Math.min(idx, displayImages.length - 1));
    if (clamped !== active) setActive(clamped);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {hasImages ? (
          <>
            <ScrollView
              horizontal
              pagingEnabled
              style={{ width: carouselWidth }}
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={syncActiveIndex}
              onScroll={syncActiveIndex}
              scrollEventThrottle={16}
            >
              {displayImages.map((uri, i) => (
                <Image key={`${uri}-${i}`} source={{ uri }} style={[styles.hero, { width: carouselWidth }]} />
              ))}
            </ScrollView>
            {displayImages.length > 1 ? (
              <View style={styles.dots}>
                {displayImages.map((_, i) => (
                  <View key={`dot-${i}`} style={[styles.dot, i === active && styles.dotActive]} />
                ))}
              </View>
            ) : null}
          </>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>SIN IMAGEN</Text>
          </View>
        )}

        <View style={styles.formCard}>
          <Text style={styles.panelTitle}>Detalle del extra</Text>

          <Text style={styles.label}>Extra</Text>
          <TextInput style={[styles.input, styles.disabled]} value={extra.name} editable={false} />

          {extra.description ? (
            <>
              <Text style={styles.label}>Descripcion</Text>
              <TextInput
                style={[styles.input, styles.textarea, styles.disabled]}
                value={extra.description}
                editable={false}
                multiline
              />
            </>
          ) : null}

          <Text style={styles.label}>Precio</Text>
          <TextInput style={[styles.input, styles.disabled]} value={priceLabel} editable={false} />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scroll: { padding: 16 },
  loadingText: { textAlign: 'center', marginTop: 40, color: '#666' },
  hero: { height: 180, borderRadius: 12, marginBottom: 8 },
  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: 8, marginBottom: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#ddd', marginHorizontal: 4 },
  dotActive: { backgroundColor: '#e67e22' },
  placeholder: {
    height: 220,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  placeholderText: { fontSize: 12, color: '#999', letterSpacing: 1 },
  formCard: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    elevation: 2,
  },
  panelTitle: { fontWeight: '700', fontSize: 16, marginBottom: 8 },
  label: { marginTop: 8, marginBottom: 4, color: '#333' },
  input: { borderWidth: 1, borderColor: '#e6e6e6', borderRadius: 6, padding: 8, backgroundColor: '#fff' },
  disabled: { backgroundColor: '#f7f7f7' },
  textarea: { height: 90, textAlignVertical: 'top' },
});
