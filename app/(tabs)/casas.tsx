// app/(tabs)/casas.tsx
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

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
  imagenes: Array<{
    url: string;
    thumb?: string;
    publicId?: string;
    isCover?: boolean;
    _id?: string;
  }>;
  activa: boolean;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// ⚠️ Reemplaza esta URL con la tuya real (usa tu IP local en desarrollo)
const API_BASE_URL = 'http://192.168.18.29:5001'; // ← CAMBIA ESTO

export default function CasasScreen() {
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
      // Manejo seguro del error
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Error desconocido al cargar las casas');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando casas...</Text>
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
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Catálogo de Casas</Text>
        <Text style={styles.subtitle}>Espacios exclusivos para tu evento</Text>
      </View>

      {/* Lista de casas */}
      {casas.map((casa) => (
        <TouchableOpacity key={casa._id} style={styles.card}>
          {/* Imagen principal */}
          <Image
            source={{
              uri: casa.imagenes[0]?.url?.trim() || 'https://via.placeholder.com/300',
            }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Información de la casa */}
          <View style={styles.info}>
            <Text style={styles.name}>{casa.nombre}</Text>
            <View style={styles.details}>
              <Text style={styles.detailIcon}>📍</Text>
              <Text style={styles.detailText}>{casa.direccion}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailIcon}>📏</Text>
              <Text style={styles.detailText}>{casa.areaM2} m²</Text>
              <Text style={styles.detailIcon}>👥</Text>
              <Text style={styles.detailText}>{casa.capacidad} pers.</Text>
              <Text style={styles.detailIcon}>⏰</Text>
              <Text style={styles.detailText}>Hasta {casa.horaFinEvento}</Text>
            </View>
            <Text style={styles.price}>Desde: S/ {casa.precioDesde.toLocaleString()}</Text>
            <TouchableOpacity style={styles.button}>
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
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 5,
    color: '#666',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginRight: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFA500',
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