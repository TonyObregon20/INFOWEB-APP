// app/(tabs)/servicios.tsx
import { setSelectedService } from '@/utils/selectedService';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '@/constants/api';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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
      // Manejo seguro del error
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido al cargar los servicios');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando servicios...</Text>
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
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Catálogo de Servicios</Text>
        <Text style={styles.subtitle}>Precios referenciales según requerimientos.</Text>
      </View>

      {/* Lista de servicios */}
      {servicios.map((servicio) => (
        <TouchableOpacity key={servicio._id} style={styles.card}>
          {/* Imagen principal (usamos la primera imagen con isCover=true, o la primera si no hay) */}
          <Image
            source={{
              uri: `${API_BASE_URL}/api/images/${servicio.images[0]?.imageId || 'default'}`,
            }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Información del servicio */}
          <View style={styles.info}>
            <Text style={styles.name}>{servicio.name}</Text>
            <Text style={styles.category}>{servicio.category}</Text>
            <Text style={styles.description}>{servicio.description}</Text>
            <View style={styles.details}>
              <Text style={styles.detailIcon}>👥</Text>
              <Text style={styles.detailText}>
                {servicio.capacityMin} - {servicio.capacityMax} pers.
              </Text>
            </View>
            <Text style={styles.price}>
              {servicio.basePrice > 0 ? `Desde: S/ ${servicio.basePrice.toLocaleString()}` : 'Precio a consultar'}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setSelectedService(servicio);
                // Open the modal for service details
                router.push('/modalServicio' as any);
              }}
            >
              <Text style={styles.buttonText}>Ver detalle</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: 'red',
  },
  retryButton: {
    backgroundColor: '#1a1a2e',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    marginHorizontal: 50,
    alignItems: 'center',
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  card: {
    margin: 10,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
  },
  info: {
    padding: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 5,
    color: '#666',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFA500', // Naranja como en tu prototipo
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FFA500',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});