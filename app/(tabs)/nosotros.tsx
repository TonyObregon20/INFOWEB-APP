// app/(tabs)/nosotros.tsx
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function NosotrosScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Text style={styles.title}>Nosotros</Text>
      </View>

      {/* Descripción general */}
      <View style={styles.section}>
        <Text style={styles.description}>
          Somos un equipo especializado en la organización de bodas, eventos corporativos y celebraciones. Cuidamos cada detalle para que tu evento sea impecable.
        </Text>
      </View>

      {/* Botones de acción */}
      <View style={styles.buttonContainer}>
        <Text style={[styles.button, styles.primaryButton]}>Quiero cotizar</Text>
        <Text style={[styles.button, styles.secondaryButton]}>Escríbenos por WhatsApp</Text>
      </View>

      {/* Nuestra historia */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Nuestra historia</Text>
        <Text style={styles.text}>
          Nacimos con el propósito de crear experiencias memorables. Combinamos creatividad, planificación y una red de proveedores confiables para diseñar eventos únicos a la medida.
        </Text>
        <View style={styles.list}>
          <Text style={styles.listItem}>• Asesoría integral y personalizada.</Text>
          <Text style={styles.listItem}>• Gestión de proveedores y logística completa.</Text>
          <Text style={styles.listItem}>• Montaje y coordinación el día del evento.</Text>
        </View>
      </View>

      {/* Lo que nos define */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Lo que nos define</Text>
        <View style={styles.valuesContainer}>
          <Text style={styles.value}>Compromiso</Text>
          <Text style={styles.value}>Creatividad</Text>
          <Text style={styles.value}>Puntualidad</Text>
          <Text style={styles.value}>Transparencia</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#FFA500',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 10,
  },
  list: {
    marginTop: 10,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  primaryButton: {
    backgroundColor: '#1a1a2e',
    color: '#fff',
    flex: 1,
    marginRight: 8,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    color: '#1a1a2e',
    borderWidth: 1,
    borderColor: '#1a1a2e',
    flex: 1,
    marginLeft: 8,
  },
  valuesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  value: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});